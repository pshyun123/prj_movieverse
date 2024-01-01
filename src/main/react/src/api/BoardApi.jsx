import axios from "axios";
import Common from "../util/Common";

const BoardApi = {
  // 새 포스트 저장
  saveNewPost: async (categoryName, gatherType, title, image, boardContent) => {
    // console.log("저장 진입");
    // console.log("저장중 이미지 : " + image);
    const data = {
      categoryName: categoryName,
      gatherType: gatherType,
      title: title,
      image: image,
      boardContent: boardContent,
    };
    return await axios.post(
      Common.MV_DOMAIN + "/board/new",
      data,
      Common.tokenHeader()
    );
  },
  boardList: async () => {
    // console.log("게시판목록 불러오는 중");
    return await axios.get(
      Common.MV_DOMAIN + `/board/list`,
      Common.tokenHeader()
    );
  },
  // 상세 게시글 정보
  boardDetail: async (postId) => {
    // console.log("상세 게시글 진입");
    return await axios.get(
      Common.MV_DOMAIN + `/board/post/${postId}`,
      Common.tokenHeader()
    );
  },

  boardCounter: async (postId) => {
    return await axios.put(
      Common.MV_DOMAIN + `/board/post/counter/`,
      postId,
      Common.tokenHeader()
    );
  },

  // 게시글 수정
  updateBoard: async (
    id,
    categoryName,
    gatherType,
    title,
    image,
    boardContent
  ) => {
    // console.log("보더수정 저장 !");
    const data = {
      id: id,
      categoryName: categoryName,
      gatherType: gatherType,
      title: title,
      image: image,
      boardContent: boardContent,
    };
    return await axios.post(
      Common.MV_DOMAIN + "/board/update",
      data,
      Common.tokenHeader()
    );
  },
  // 게시글 삭제
  deleteBoard: async (id) => {
    return await axios.delete(
      Common.MV_DOMAIN + `/board/delete/${id}`,
      Common.tokenHeader()
    );
  },

  // 총 페이지 수
  getTotalPage: async (keyword, categoryName, gatherType) => {
    // console.log("게시글 총 페이지 진입/ 해당 카테고리 : " + categoryName);
    if (categoryName === "무비추천") gatherType = "";
    const page = 0;
    const size = 6;
    return await axios.get(
      Common.MV_DOMAIN +
        `/board/totalpages?page=${page}&size=${size}&keyword=${keyword}&categoryName=${categoryName}&gatherType=${gatherType}`,
      Common.tokenHeader()
    );
  },
  // 페이지에 해당 하는 보드 리스트
  getBoardList: async (page, sort, keyword, categoryName, gatherType) => {
    // console.log("게시글 리스트 진입/ 해당 페이지 : " + page);
    if (categoryName === "무비추천") gatherType = "";
    const size = 6;
    return await axios.get(
      Common.MV_DOMAIN +
        `/board/processedlist?page=${
          page - 1
        }&size=${size}&sort=${sort}&keyword=${keyword}&categoryName=${categoryName}&gatherType=${gatherType}`,
      Common.tokenHeader()
    );
  },

  // 멤버 내 게시글 관련
  getMemTotalPage: async (type) => {
    // console.log("내 게시글 총 페이지 진입");
    const page = 0;
    const size = 6;
    return await axios.get(
      Common.MV_DOMAIN +
        `/board/memboard/page?page=${page}&size=${size}&type=${type}`,
      Common.tokenHeader()
    );
  },
  getMemBoardList: async (page, type) => {
    // console.log("회원 게시글 불러오는중 페이지 : " + page);
    const size = 6;
    return await axios.get(
      Common.MV_DOMAIN +
        `/board/memboard/list?page=${page - 1}&size=${size}&type=${type}`,
      Common.tokenHeader()
    );
  },

  // admin
  // 페이지 수 조회
  getAdminPages: async () => {
    // console.log("관리자 게시글 총 페이지 진입");
    const page = 0;
    const size = 10;
    return await axios.get(
      Common.MV_DOMAIN + `/board/admin/totalpage?page=${page}&size=${size}`,
      Common.tokenHeader()
    );
  },
  // 게시글 리스트 조회 (페이지네이션)
  getAdminBoardList: async (page) => {
    // console.log("관리자 게시글 불러오는 중 페이지 : " + page);
    return await axios.get(
      Common.MV_DOMAIN + `/board/admin/boardlist?page=${page - 1}&size=10`,
      Common.tokenHeader()
    );
  },
};
export default BoardApi;
