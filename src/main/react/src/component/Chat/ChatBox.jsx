import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Button from "../../util/Button";
import Common from "../../util/Common";
import ChatApi from "../../api/ChatApi";
import { Message } from "../../component/Chat/ChatElement";

const ChatBoxComp = styled.section`
  width: 100%;

  .container {
    align-items: center;
    padding: 100px 0;
    .chatBg {
      width: 400px;
      margin: 0 auto;
      background-color: var(--VIOLET);
      border-radius: 5px;
      padding: 40px 30px;
      .chatTitle {
        font-size: 1.4em;
        font-weight: 600;
        margin-bottom: 30px;
        text-align: center;
      }
      .chatPrint {
        height: 360px;
        overflow-y: auto;
        background-color: white;
        border-radius: 5px;
        margin-bottom: 30px;
        padding: 15px 20px;
        padding-top: 30px;
      }
      .chatInput {
        background-color: white;
        border-radius: 5px;
        padding: 15px 20px;
        margin-bottom: 30px;
        input {
          display: block;
          outline: none;
          width: 100%;
          height: 40px;
          margin: 0 auto;
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid var(--GREY);
        }
        .sendBox {
          display: flex;
          justify-content: end;
          Button {
          }
        }
      }
    }
  }
`;

const ChatBox = ({ memberInfo, roomId }) => {
  const navigate = useNavigate();
  const ws = useRef(null);
  const SOCKET_URL = Common.MV_SOCKET_URL;

  const [socketConnected, setSocketConnected] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [chatList, setChatList] = useState([]);

  const [chatName, setChatName] = useState("");
  const [user, setUser] = useState(memberInfo ? memberInfo : "");

  // 채팅방 제목 받아오기
  const fetchChatName = async () => {
    try {
      const res = await ChatApi.getChatName(roomId);
      console.log("결과결과:" + res.data.roomName);
      if (res.data !== null) {
        setChatName(res.data.roomName);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeMsg = (e) => {
    setInputMsg(e.target.value);
  };
  const onEnterKey = (e) => {
    if (e.key === "Enter") sendMsg(e);
  };

  // 채팅 전송
  const sendMsg = (e) => {
    ws.current.send(
      JSON.stringify({
        type: "TALK",
        roomId: roomId,
        profile: user.image,
        sender: user.email,
        senderAlias: user.alias,
        msg: inputMsg,
      })
    );
    setInputMsg("");
  };
  // 채팅 종료
  const closeMsg = () => {
    ws.current.send(
      JSON.stringify({
        type: "CLOSE",
        roomId: roomId,
        profile: user.image,
        sender: user.email,
        senderAlias: user.alias,
        msg: "종료 합니다.",
      })
    );
    ws.current.close();
    navigate("/kikilist");
  };

  useEffect(() => {
    console.log("방번호 : " + roomId);
    if (!ws.current) {
      ws.current = new WebSocket(SOCKET_URL);
      ws.current.onopen = () => {
        console.log("connected to " + SOCKET_URL);
        setSocketConnected(true);
      };
    }
    if (socketConnected) {
      ws.current.send(
        JSON.stringify({
          type: "ENTER",
          roomId: roomId,
          profile: user.image,
          sender: user.email,
          senderAlias: user.alias,
          msg: "처음으로 접속 합니다.",
        })
      );
    }
    ws.current.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      console.log(data.message);
      setChatList((prevItems) => [...prevItems, data]);
    };

    return () => {
      if (socketConnected) {
        ws.current.send(
          JSON.stringify({
            type: "CLOSE",
            roomId: roomId,
            profile: user.image,
            sender: user.email,
            senderAlias: user.alias,
            msg: "종료 합니다.",
          })
        );
        ws.current.close();
      }
    };
  }, [socketConnected]);

  // 채팅 하단으로 자동 스크롤
  const chatPrintRef = useRef(null);

  useEffect(() => {
    if (chatPrintRef.current) {
      chatPrintRef.current.scrollTop = chatPrintRef.current.scrollHeight;
    }
  }, [chatList]);

  useEffect(() => {
    fetchChatName();
    console.log("chatName : " + chatName);
  }, []);

  return (
    <ChatBoxComp>
      <div className="container">
        <div className="chatBg">
          <div className="chatTitle">
            <p>{chatName}</p>
          </div>
          <div className="chatPrint" ref={chatPrintRef}>
            {chatList.map((chat, index) => (
              <Message
                isSender={chat.sender === user.email}
                msg={chat.msg}
                profile={chat.profile}
                alias={chat.senderAlias}
              />
            ))}
            {/* <Sender
              profile={basicProfile}
              alias={"햄스터"}
              msg={"안녕하세요!"}
            />
            <User msg={"안녕하세요!"} /> */}
          </div>
          <div className="chatInput">
            <input
              type="text"
              placeholder="메시지를 입력하세요!"
              value={inputMsg}
              onChange={onChangeMsg}
              onKeyUp={onEnterKey}
            />
            <div className="sendBox">
              <Button
                children="전송"
                active={true}
                width="60px"
                height="34px"
                fontSize="14px"
                back="var(--BLUE)"
                clickEvt={sendMsg}
              />
            </div>
          </div>
          <Button
            children="키키 나가기"
            active={true}
            clickEvt={closeMsg}
            width="100%"
            front="var(--BLUE)"
            back="var(--MIDBLUE)"
          />
        </div>
      </div>
    </ChatBoxComp>
  );
};
export default ChatBox;
