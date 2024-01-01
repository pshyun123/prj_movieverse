import { useContext } from "react";
import { UserContext } from "../context/UserStore";
import { useNavigate } from "react-router-dom";
import Common from "../util/Common";

const useTokenAxios = (axiosEvt) => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { loginStatus, setLoginStatus } = context;

  //액세스 토큰 만료시 재발행 후 API 재 실행
  const handleTokenAxios = async () => {
    const accessToken = Common.getAccessToken();
    try {
      await axiosEvt();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log("AccessToken 만료");
        await Common.handleUnathorized();
        const newToken = Common.getAccessToken();
        if (newToken !== accessToken) {
          try {
            await axiosEvt();
          } catch (err) {
            console.log(err);
          }
        } else {
          // 토큰 만료 시 재 로그인
          console.log(err);
          if (loginStatus !== "") {
            navigate("/");
            if (loginStatus !== "RELOGIN") {
              setLoginStatus("RELOGIN");
            }
          }
        }
      }
    }
  };
  return handleTokenAxios;
};
export default useTokenAxios;
