import axios from "axios";
import Common from "../util/Common";

const OttBoxApi = {
  //박스오피스 조회
  getBoxOfficeMovies: async () => {
    console.log("getBoxOfficeMovies 진입");
    return await axios.get(Common.MV_DOMAIN + `/ottbox/boxoffice`);
  },

  //티빙
  getTivingMovies: async () => {
    try {
      console.log("getTivingMovies 진입");
      return await axios.get(Common.MV_DOMAIN + `/ottbox/otttiving`);
    } catch (e) {
      console.log(e);
    }
  },

  //넷플릭스
  getNetflixMovies: async () => {
    try {
      console.log("getNetflixMovies 진입");
      return await axios.get(Common.MV_DOMAIN + `/ottbox/ottnetflix`);
    } catch (e) {
      console.log(e);
    }
  },

  //왓챠
  getWatchaMovies: async () => {
    try {
      console.log("getWatchaMovies 진입");
      return await axios.get(Common.MV_DOMAIN + `/ottbox/ottwatcha`);
    } catch (e) {
      console.log(e);
    }
  },
};

export default OttBoxApi;
