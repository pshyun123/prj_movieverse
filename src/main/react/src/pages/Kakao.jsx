import KakaoApi from "../api/KakaoApi";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Join from "./Join";
import MemberApi from "../api/MemberApi";
import Common from "../util/Common";
import { UserContext } from "../context/UserStore";
import Loading from "../component/Kakao/Loading";

const Kakao = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { setLoginStatus } = context;

  //카카오 엑세스 토큰 요청을 위한 코드
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [kakaoId, setKakaoId] = useState("");
  const [isMember, setIsMember] = useState(false);

  const kakaoToken = async () => {
    try {
      const res = await KakaoApi.getToken(code);
      if (res.data) {
        console.log(res.data.access_token);
        kakaoUser(res.data.access_token);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const kakaoUser = async (token) => {
    const res = await KakaoApi.getInfo(token);
    console.log("kakaoUser", res.data);
    if (res.data) {
      setIsMember(!res.data.isMember);
      if (!res.data.isMember) {
        setEmail(res.data.userInfo.kakao_account.email);
        setProfile(res.data.userInfo.kakao_account.profile.profile_image_url);
        setKakaoId(res.data.userInfo.id);
      }
    }
    if (res.data.isMember) {
      login(res.data.userInfo.kakao_account.email, res.data.userInfo.id);
    }
  };
  const login = async (email, password) => {
    console.log("카카오 로그인!");
    try {
      const res = await MemberApi.login(email, password);
      console.log(res.data);
      if (res.data.grantType === "Bearer") {
        console.log("KL accessToken : " + res.data.accessToken);
        console.log("KL refreshToken : " + res.data.refreshToken);
        Common.setAccessToken(res.data.accessToken);
        Common.setRefreshToken(res.data.refreshToken);
        setLoginStatus(true);
        navigate("/");
      }
    } catch (err) {
      console.log("로그인 에러 : " + err);
    }
  };

  useEffect(() => {
    kakaoToken();
  }, []);
  // 카카오 정보 확인
  useEffect(() => {
    console.log("isMember : " + isMember);
    console.log("email : " + email);
    console.log("profile : " + profile);
    console.log("id : " + kakaoId);
  }, [isMember, email, profile, kakaoId]);

  return (
    <>
      {isMember && <Join email={email} kakaoId={kakaoId} profile={profile} />}
      {!isMember && <Loading />}
    </>
  );
};
export default Kakao;
