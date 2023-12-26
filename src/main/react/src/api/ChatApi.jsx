import axios from "axios";
import Common from "../util/Common";

const ChatApi = {
  // 채팅방 생성
  createNewChat: async (roomName) => {
    return await axios.post(
      Common.MV_DOMAIN + "/chat/new",
      { roomName: roomName },
      Common.tokenHeader()
    );
  },
  // 채팅방 목록
  getChatList: async () => {
    return await axios.get(
      Common.MV_DOMAIN + "/chat/list",
      Common.tokenHeader()
    );
  },
  // 채팅방 정보 가져오기
  getChatName: async (roomId) => {
    return await axios.get(
      Common.MV_DOMAIN + `/chat/chatroom/${roomId}`,
      Common.tokenHeader()
    );
  },
};
export default ChatApi;
