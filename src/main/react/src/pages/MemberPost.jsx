import MempostSort from "../component/MemberPost/MempostSort";
import BoardCardList from "../component/Board/BoardCardList";
import { useState, useEffect } from "react";

const MemberPost = () => {
  const [selType, setSelType] = useState("written");
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
  }, [selType]);

  return (
    <>
      <MempostSort selType={selType} setSelType={onChange} />
      <BoardCardList category="member" type={selType} />
    </>
  );
};
export default MemberPost;
