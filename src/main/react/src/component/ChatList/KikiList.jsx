import Button from "../../util/Button";
import { styled } from "styled-components";
import Kiki from "./Kiki";
import { useEffect, useState } from "react";
import ChatApi from "../../api/ChatApi";
import Common from "../../util/Common";
import { useNavigate } from "react-router-dom";
import NewChatModal from "./NewChatModal";

const KikiListComp = styled.section`
  width: 100%;
  /* outline: 1px solid red; */
  .buttonBox {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: end;
    margin-bottom: 50px;
    /* outline: 1px solid yellow; */
  }
  .container {
    padding: 100px 0;
    /* outline: 1px solid red; */
    .chatListBox {
      width: 80%;
      margin: 0 auto;
      /* outline: 1px solid blue; */

      .chatBox {
        width: 100%;
        background-color: var(--LIGHTVIO);
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        padding: 45px;
        margin-bottom: 30px;
        cursor: pointer;
        transition: 0.3s ease-out;
        &:hover {
          background-color: var(--MIDBLUE);
          .title,
          .createdAt {
            color: white;
          }
        }
        /* outline: 1px solid red; */
        .title {
          color: #000;
          font-weight: 600;
          font-size: 1.5em;
        }
        .createdAt {
          color: #000;
          font-weight: 600;
          font-size: 1.3em;
          text-align: right;
        }
      }
      .txtBox {
        padding-top: 40px;
        text-align: center;
        p {
          font-size: 1.6em;
          line-height: 2.3;
        }
      }
    }
  }
  /* 모바일은 가장 밑에 두고 해야함! */
  @media only screen and (max-width: 768px) {
    .buttonBox {
      width: 100%;
    }
    .container {
      .chatListBox {
        width: 100%;
        .chatBox {
          padding: 45px 10px;
        }
      }
    }
  }
`;

const KikiList = () => {
  const navigate = useNavigate();
  const [kikiList, setKikiList] = useState([]);

  // 새 채팅 생성 관련
  const [openModal, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const [inputVal, setInputVal] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isActive, setIsActive] = useState(false);
  const onChangeInput = (e) => {
    const currVal = e.target.value;
    setInputVal(currVal);
    if (currVal.length < 5 || currVal.length > 15) {
      setErrMsg("5자 이상 15자 이하로 입력하세요.");
      setIsActive(false);
    } else {
      setErrMsg("키키를 만들 수 있어요!");
      setIsActive(true);
    }
  };

  const createChatRoom = async () => {
    const accessToken = Common.getAccessToken();
    console.log("새 채팅방 생성 진입");
    try {
      const res = await ChatApi.createNewChat(inputVal);
      if (res.data !== null) {
        console.log("roomId : ", res.data);
        navigate(`/kikilist/${res.data}`);
      }
    } catch (err) {
      if (err.response.status === 401) {
        await Common.handleUnathorized();
        const newToken = Common.getAccessToken();
        if (newToken !== accessToken) {
          try {
            const res = await ChatApi.createNewChat(inputVal);
            if (res.data !== null) {
              console.log("토큰 재발행 회원정보 : " + res.data);
              navigate(`/kikilist/${res.data}`);
            }
          } catch (err) {
            console.log(err);
            setErrMsg("채팅방 생성에 실패했습니다.");
          }
        }
      }
    }
  };

  const fetchKikiList = async () => {
    try {
      console.log("kikilist 부르는중");
      const res = await ChatApi.getChatList();
      if (res.data !== null) {
        console.log("채팅방 목록 : " + res.data);
        setKikiList(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const enterKiki = (roomId) => {
    console.log("kiki 진입 중 : " + roomId);
    navigate(`/kikilist/${roomId}`);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      Common.handleTokenAxios(fetchKikiList);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {}, [kikiList]);

  return (
    <>
      <KikiListComp>
        <div className="container">
          <div className="buttonBox">
            <Button
              children="키키 추가하기"
              active={true}
              front="var(--VIOLET)"
              back="var(--LIGHTVIO)"
              clickEvt={() => {
                setModalOpen(true);
              }}
            />
          </div>
          <div className="chatListBox">
            {kikiList &&
              kikiList !== null &&
              kikiList.map((room) => (
                <Kiki
                  key={room.roomId}
                  data={room}
                  onClick={() => enterKiki(room.roomId)}
                />
              ))}
            {kikiList.length === 0 && (
              <div className="txtBox">
                <p>진행중인 키키가 없습니다</p>
                <p>키키를 오픈하고 새로운 영화친구를 기다려보세요!</p>
              </div>
            )}
          </div>
        </div>
        <NewChatModal
          open={openModal}
          close={closeModal}
          active={isActive}
          inputVal={inputVal}
          errMsg={errMsg}
          onChangeInput={onChangeInput}
          confirm={() => {
            createChatRoom();
          }}
        />
      </KikiListComp>
    </>
  );
};
export default KikiList;
