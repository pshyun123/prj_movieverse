import axios from "axios";
import Common from "../util/Common";

const CommnetApi = {
  saveNewComment: async (boardId, content) => {
    console.log("리액트 댓글 저장 진입 내용 : " + content);
    const data = {
      boardId: boardId,
      commentContent: content,
    };
    return await axios.post(
      Common.MV_DOMAIN + "/comment/new",
      data,
      Common.tokenHeader()
    );
  },

  // 댓글 전체 조회
  commentList: async (id) => {
    console.log("댓글 포스트 id : " + id);
    return await axios.get(
      Common.MV_DOMAIN + `/comment/${id}`,
      Common.tokenHeader()
    );
  },

  // 댓글 수정
  commentModify: async (commentId, content) => {
    console.log("댓글 수정 : " + commentId);
    const data = {
      id: commentId,
      commentContent: content,
    };
    return await axios.post(
      Common.MV_DOMAIN + "/comment/modify",
      data,
      Common.tokenHeader()
    );
  },

  // 댓글 삭제
  commentDelete: async (id) => {
    console.log("댓글 삭제 : " + id);
    return await axios.delete(
      Common.MV_DOMAIN + `/comment/delete/${id}`,
      Common.tokenHeader()
    );
  },

  // 댓글 총 페이지 수
  commentPageCount: async (boardId) => {
    console.log("댓글 총 페이지수 : " + boardId);
    const page = 0;
    const size = 5;
    return await axios.get(
      Common.MV_DOMAIN + `/comment/page/${boardId}?page=${page}&size=${size}`,
      Common.tokenHeader()
    );
  },
  // 댓글 페이지네이션
  commentPageList: async (boardId, page) => {
    return await axios.get(
      Common.MV_DOMAIN +
        `/comment/page/list/${boardId}?page=${page - 1}&size=5`,
      Common.tokenHeader()
    );
  },
};
export default CommnetApi;
