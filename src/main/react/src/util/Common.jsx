import axios from "axios";

const Common = {
  MV_DOMAIN: "",
  MV_SOCKET_URL: "wss://movieverse2024.site/ws/chat",

  // 발행된 토큰을 로컬에 저장
  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
  },

  // 로컬에 저장된 토큰 정보 가져옴
  getAccessToken: () => {
    return localStorage.getItem("accessToken");
  },

  // 발행된 리프래시 토큰을 로컬에 저장
  setRefreshToken: (token) => {
    localStorage.setItem("refreshToken", token);
  },

  // 로컬에 저장된 리프레시 토큰 정보 가져옴
  getRefreshToken: () => {
    return localStorage.getItem("refreshToken");
  },
  // 헤더
  tokenHeader: () => {
    const accessToken = Common.getAccessToken();
    // console.log("헤더 토큰 : " + accessToken);
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
  },
  convertToHttps: (url) => {
    return url.replace(/^http:/, "https:");
  },

  // 토큰 재발행(만료시)
  handleUnathorized: async () => {
    const accessToken = Common.getAccessToken();
    const refreshToken = Common.getRefreshToken();
    // console.log("refreshToken : " + refreshToken);
    // console.log("재발행 전 : " + accessToken);
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const res = await axios.post(
        `${Common.MV_DOMAIN}/auth/refresh`,
        refreshToken,
        config
      );
      // console.log(res.data);
      Common.setAccessToken(res.data.accessToken);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

export default Common;
