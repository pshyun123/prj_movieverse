import MempostSort from "../component/MemberPost/MempostSort";
import BoardCardList from "../component/Board/BoardCardList";
import { useState, useEffect } from "react";

const MemberPost = () => {
  const [selType, setSelType] = useState("written");
  const onChange = () => {
    selType === "written" ? setSelType("comment") : setSelType("written");
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
