import MyInfo from "../component/MyPage/MyInfo";
import MembershipJoin from "../component/MyPage/MembershipJoin";
import BookMarkList from "../component/MyPage/BookMarkList";
import { useState, useEffect, useContext } from "react";
import MemberApi from "../api/MemberApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import useTokenAxios from "../hooks/useTokenAxios";

const MyPage = () => {
  const navigate = useNavigate();
  const [memberInfo, setMemberInfo] = useState([]);
  const context = useContext(UserContext);
  const { loginStatus } = context;

  useEffect(() => {
    if (!loginStatus) {
      //로그인 하지 않았다면 로그인 페이지로 이동
      navigate("/login");
    }
  }, []); // []<-화면 마운트시 최초 한번 실행

  const memberDetail = async () => {
    const res = await MemberApi.getMemberDetail();
    console.log("상세회원정보 : " + res.data);
    if (res.data !== null) {
      setMemberInfo(res.data);
    }
  };
  const getMemberDetail = useTokenAxios(memberDetail);

  useEffect(() => {
    if (loginStatus) {
      getMemberDetail();
    }
  }, []);

  // 멤버십 여부 back 실행 시켜야 오류 안뜸!
  return (
    <>
      <MyInfo memberInfo={memberInfo && memberInfo} />
      {memberInfo && !memberInfo.isMembership && <MembershipJoin />}
      <BookMarkList />
    </>
  );
};
export default MyPage;
