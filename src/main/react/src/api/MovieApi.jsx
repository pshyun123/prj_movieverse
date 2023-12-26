import axios from "axios";
import Common from "../util/Common";

const MovieApi = {
  // 무비서치 영화정보 가져오기
  getallmovies: async () => {
    return await axios.get(Common.MV_DOMAIN + `/movies/movielist`);
  },
  // 무비인포 영화상세정보 가져오기
  getMoviesDetail: async (id) => {
    return await axios.get(Common.MV_DOMAIN + `/movies/movielist/${id}`);
  },

  // 최신 영화 가져오기 및 페이지네이션
  getRecentMovies: async (page, size) => {
    return await axios.get(
      Common.MV_DOMAIN + `/movies/movielist/recent?page=${page}&size=${size}`
    );
  },

  // 오래된 영화 가져오기 및 페이지네이션
  getFormerMovies: async (page, size) => {
    return await axios.get(
      Common.MV_DOMAIN + `/movies/movielist/former?page=${page}&size=${size}`
    );
  },

  // 영화 페이지 수 조회
  moviePage: async (page, size) => {
    return await axios.get(
      Common.MV_DOMAIN + `/movies/movielist/count?page=${page}&size=${size}`
    );
  },
  // 영화 제목으로 검색
  searchMoviesByTitle: (title) => {
    axios.get(Common.MV_DOMAIN + `/movies/movielist/search?title=${title}`);
  },

  // 영화리스트 (테스트)
  getMovieList: async (page, size, sort, keyword) => {
    return await axios.get(Common.MV_DOMAIN + `/movies/movielist/paged`, {
      params: {
        page: page,
        size: size,
        sort: sort,
        keyword: keyword,
      },
    });
  },
};

export default MovieApi;
