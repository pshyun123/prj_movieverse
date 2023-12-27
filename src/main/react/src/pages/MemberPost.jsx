import MempostSort from "../component/MemberPost/MempostSort";
import BoardCardList from "../component/Board/BoardCardList";
import { useState, useEffect } from "react";

const MemberPost = () => {
  const [selType, setSelType] = useState("written");

  // 백 여러번 호출 방지
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (num) => {
    switch (num) {
      case 0:
        setSelType("written");
        break;
      case 1:
        setSelType("comment");
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    console.log("선택값 : " + selType);
    setIsLoading(true);
  }, [selType]);

  return (
    <>
      <MempostSort selType={selType} setSelType={onChange} />
      <BoardCardList
        category="member"
        type={selType}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </>
  );
};
export default MemberPost;
