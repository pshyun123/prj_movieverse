import Button from "../../../util/Button";
import faceIcon from "../../../images/faceIcon/faceIcon1.png";
import Modal from "../../../util/Modal";
import EditModal from "./EditCommentModal";
import { useState } from "react";
import CommnetApi from "../../../api/CommentApi";
import useTokenAxios from "../../../hooks/useTokenAxios";

const Comment = ({ comment, fetchCommentList, userAlias }) => {
  const dateTimeString = comment.commentRegDate;
  const toDate = new Date(dateTimeString);
  const regDate = toDate.toISOString().split("T")[0];

  // 댓글 삭제
  const [openModal, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState(null);

  // 모달 닫기
  const closeModal = (num) => {
    setModalOpen(false);
  };
  const handleModal = (header, msg, type) => {
    setModalOpen(true);
    setModalHeader(header);
    setModalMsg(msg);
    setModalType(type);
  };

  // 댓글 삭제
  const deleteComment = async () => {
    const deleteRes = await CommnetApi.commentDelete(comment.commentId);
    if (deleteRes.data) {
      console.log("Comment 삭제 성공");
      closeModal();
      fetchCommentList();
    }
  };

  const delComment = useTokenAxios(deleteComment);

  //   댓글 수정

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editModalContent, setEditModalContent] = useState(
    comment.commentContent
  );

  const editModalOpen = () => {
    setOpenEditModal(true);
    setEditModalContent(comment.commentContent);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
    setEditModalContent(comment.commentContent);
  };

  // 댓글 수정

  const commentModify = async () => {
    console.log("댓글 수정 전");
    const res = await CommnetApi.commentModify(
      comment.commentId,
      editModalContent
    );
    console.log("commentId : " + comment.commentId);
    if (res.data !== null) {
      console.log("댓글 수정 성공");
      fetchCommentList(); // 수정 후 댓글 목록 다시 불러오기
      closeEditModal(); // 모달 닫기
    }
  };
  const modiComment = useTokenAxios(commentModify);

  return (
    <>
      <div key={comment.commentId} className="commentBox">
        <div className="iconArea">
          <div className="imgBox">
            <img src={comment.memberImage || faceIcon} alt="memberIcon" />
          </div>
        </div>
        <div className="textArea">
          <div className="comment">
            <p className="nickName">{comment.memberAlias}</p>
            <p className="commentText">{comment.commentContent}</p>
          </div>
        </div>
        <div className="rightArea">
          <div className="writeDate">{regDate}</div>
          {userAlias === comment.memberAlias && (
            <div className="editBtnBox">
              <Button
                className="editBtn"
                children="수정"
                active={true}
                width="44%"
                height="30px"
                fontSize="1em"
                front="var(--BLUE)"
                clickEvt={editModalOpen}
              />
              <Button
                className="deleteBtn"
                children="삭제"
                active={true}
                width="44%"
                height="30px"
                fontSize="1em"
                front="var(--GREY)"
                clickEvt={() => {
                  handleModal("삭제", "삭제하시겠습니까 ?", true);
                }}
              />
            </div>
          )}
          <Modal
            open={openModal}
            close={closeModal}
            header={modalHeader}
            children={modalMsg}
            type={modalType}
            confirm={() => delComment()}
          />
          <EditModal
            open={openEditModal}
            close={closeEditModal}
            header={"수정"}
            contentVal={editModalContent}
            onChangeContent={setEditModalContent}
            type={true}
            confirm={() => modiComment()}
          />
        </div>
      </div>
    </>
  );
};
export default Comment;
