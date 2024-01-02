import { Outlet } from "react-router-dom";
import Header from "../component/Layout/Header/Header";
import Footer from "../component/Layout/Footer";
import Advertise from "../component/Layout/Ad";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/UserStore";
import Common from "../util/Common";
import ScrollToTop from "../component/Layout/ScrollToTop";
import MemberApi from "../api/MemberApi";
import Modal from "../util/Modal";
import { useNavigate } from "react-router-dom";
import useTokenAxios from "../hooks/useTokenAxios";

const Layout = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  // 로그인 / 멤버쉽 여부
  const { loginStatus, setLoginStatus, isKikiMember, setIsKikiMember } =
    context;

  //Modal
  // 여기서부터
  const [openModal, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState(null);

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleModal = (header, msg, type) => {
    setModalOpen(true);
    setModalHeader(header);
    setModalMsg(msg);
    setModalType(type);
  };

  // 멤버십 정보 호출
  const fetchIsKikiMember = async () => {
    const res = await MemberApi.getMembership();
    if (res.data) {
      setIsKikiMember(res.data);
      console.log("키키 멤버 : " + res.data);
    }
  };
  const getIsKikiMember = useTokenAxios(fetchIsKikiMember);

  useEffect(() => {
    // console.log("로그인 여부" + loginStatus);
    // console.log("kiki" + isKikiMember);
    if (loginStatus === "ADMIN") {
      setLoginStatus("");
      window.localStorage.clear();
    } else if (loginStatus === "RELOGIN") {
      setLoginStatus("");
      window.localStorage.clear();
      handleModal(
        "로그인 유효기간 만료",
        "보안을 위해 다시 로그인해주세요",
        true
      );
    } else if (loginStatus) {
      getIsKikiMember();
    }
  }, [loginStatus]);

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
        {/* 로그인 여부를 props로 전달 */}
        {!isKikiMember && <Advertise isLogin={loginStatus} />}
      </main>
      <Footer />
      <Modal
        open={openModal}
        close={closeModal}
        header={modalHeader}
        children={modalMsg}
        type={modalType}
        confirm={() => {
          navigate("/login");
          closeModal();
        }}
      />
    </>
  );
};
export default Layout;
