import React, { useEffect, useState } from "react";
import { PostComp } from "../component/Post/PostStyle";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../util/Button";
import BoardApi from "../api/BoardApi";
import Common from "../util/Common";
import CommentList from "../component/Board/Comment/CommentList";
import MemberApi from "../api/MemberApi";
import Modal from "../util/Modal";

const Post = () => {
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState("");
  const [userAlias, setUserAlias] = useState("");
  const { postId } = useParams();
  const [regDate, setRegDate] = useState("");

  // 모달
  const [openModal, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState(null);

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleModal = (header, msg, type) => {
    setModalOpen(true);
    setModalHeader(header);
    setModalMsg(msg);
    setModalType(type);
  };

  const onClickBoard = (num) => {
    switch (num) {
      case 1:
        navigate(`/board/revise/${postId}`);
        break;
      case 2:
        navigate(-1);
        break;
      default:
    }
  };

  const fetchPostCounter = async () => {
    const res = await BoardApi.boardCounter(postId);
    if (res.data) {
      Common.handleTokenAxios(fetchBoardData);
    }
  };

  const fetchBoardData = async () => {
    console.log("API 요청 전");
    const res = await BoardApi.boardDetail(postId);
    console.log("API 요청 후 : ", res);
    if (res.data !== null) {
      setBoardData(res.data);
      const toDate = new Date(res.data.regDate);
      setRegDate(toDate.toISOString().split("T")[0]);
    }
  };

  const fetchUserDetail = async () => {
    const res = await MemberApi.getMemberDetail();
    if (res.data !== null) {
      setUserAlias(res.data.alias);
    }
  };

  const deletePost = async () => {
    const res = await BoardApi.deleteBoard(postId);
    if (res.data) {
      navigate(-1);
    }
  };

  useEffect(() => {
    Common.handleTokenAxios(fetchPostCounter);
    Common.handleTokenAxios(fetchUserDetail);
  }, []);

  return (
    <>
      <PostComp>
        <div className="container">
          <div className="titleBox">
            <div className="memIconArea">
              <div className="imgBox">
                <img src={boardData.memberImage} alt="memberIcon" />
              </div>
              <p>{boardData.memberAlias}</p>
            </div>
            <div className="titleElements">
              <div className="topElements">
                <div className="selectedBox">
                  <div className="boardType">
                    <p>{boardData.categoryName}</p>
                  </div>
                  {boardData.categoryName !== "무비추천" && (
                    <div className="placeType">
                      <p>{boardData.gatherType}</p>
                    </div>
                  )}
                </div>
                <div className="uploadedDate">{regDate}</div>
              </div>
              <h3>{boardData.title}</h3>
            </div>
            <p className="count">조회수 {boardData.count}</p>
          </div>
          <div className="contentsBox">
            <div className="introduce">
              <img src={boardData.image} alt="selectedImg" />
              <div className="contentsText">{boardData.boardContent}</div>
            </div>
            {userAlias === boardData.memberAlias && (
              <div className="buttonBox">
                <Button
                  children="수정하기"
                  front="var(--BLUE)"
                  active={true}
                  clickEvt={() => onClickBoard(1)}
                />
                <Button
                  children="삭제하기"
                  front={"var(--GREY)"}
                  active={true}
                  clickEvt={() => {
                    handleModal("삭제", "삭제하시겠습니까?", true);
                  }}
                />
              </div>
            )}
          </div>
          {/* 댓글 영역 */}
          <CommentList id={postId} userAlias={userAlias} />
          <div className="listBtnBox">
            <Button
              className="listBtn"
              children="목록보기"
              active={true}
              front="var(--VIOLET)"
              back="var(--BLUE)"
              clickEvt={() => onClickBoard(2)}
            />
          </div>
        </div>
        <Modal
          open={openModal}
          close={closeModal}
          header={modalHeader}
          children={modalMsg}
          type={modalType}
          confirm={() => {
            Common.handleTokenAxios(deletePost);
          }}
        />
      </PostComp>
    </>
  );
};
export default Post;
