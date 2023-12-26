import axios from "axios";
import Common from "../util/Common";

const BookmarkApi = {
  //북마크 여부
  isBookmark: async (movieId) => {
    return await axios.get(
      Common.MV_DOMAIN + `/bookmark/isbookmark?movieId=${movieId}`,
      Common.tokenHeader()
    );
  },
  //북마크 등록
  saveBookmark: async (movieId) => {
    return await axios.post(
      Common.MV_DOMAIN + `/bookmark/save?movieId=${movieId}`,
      movieId,
      Common.tokenHeader()
    );
  },

  //북마크 해제
  removeBookmark: async (movieId) => {
    return await axios.delete(
      Common.MV_DOMAIN + `/bookmark/remove/${movieId}`,
      Common.tokenHeader()
    );
  },

  // 회원 북마크 리스트
  getMemberMovie: async (page, size) => {
    return await axios.get(
      Common.MV_DOMAIN + `/bookmark/member/movielist?page=${page}&size=${size}`,
      Common.tokenHeader()
    );
  },
};
export default BookmarkApi;
