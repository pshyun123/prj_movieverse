import ChatBanner from "../component/ChatList/ChatBanner";
import KikiList from "../component/ChatList/KikiList";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserStore";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { loginStatus } = context;

  useEffect(() => {
    if (!loginStatus) {
      //로그인 하지 않았다면 로그인 페이지로 이동
      navigate("/login");
    }
  }, []); // []<-화면 마운트시 최초 한번 실행

  return (
    <>
      <ChatBanner />
      <KikiList />
    </>
  );
};
export default ChatList;
