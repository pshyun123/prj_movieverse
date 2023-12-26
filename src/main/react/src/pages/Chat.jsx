import ChatBox from "../component/Chat/ChatBox";
import Common from "../util/Common";
import MemberApi from "../api/MemberApi";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const [memberInfo, setMemberInfo] = useState("");
  const { roomId } = useParams();

  const memberDetail = async () => {
    const accessToken = Common.getAccessToken();
    try {
      const res = await MemberApi.getMemberDetail();
      console.log("상세회원정보 : " + res.data);
      if (res.data !== null) {
        setMemberInfo(res.data);
      }
    } catch (err) {
      if (err.response.status === 401) {
        await Common.handleUnathorized();
        const newToken = Common.getAccessToken();
        if (newToken !== accessToken) {
          try {
            const res = await MemberApi.getMemberDetail();
            console.log("토큰 재발행 회원정보 : " + res.data);
            if (res.data !== null) {
              setMemberInfo(res.data);
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
      console.log(err);
    }
  };

  useEffect(() => {
    memberDetail();
    console.log("roomId chat : " + roomId);
  }, []);

  return (
    <>{memberInfo && <ChatBox memberInfo={memberInfo} roomId={roomId} />}</>
  );
};
export default Chat;
