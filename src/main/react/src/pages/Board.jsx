import BoardHeaderList from "../component/Board/BoardHeader";
import BoardCardList from "../component/Board/BoardCardList";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserStore";

const Board = () => {
  const navigate = useNavigate();

  const context = useContext(UserContext);
  const { loginStatus } = context;

  const { category } = useParams();
  const [categorySel, setCategorySel] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isKeyword, setIsKeyword] = useState(false);

  useEffect(() => {
    if (!loginStatus) {
      //로그인 하지 않았다면 로그인 페이지로 이동
      navigate("/login");
    }
  }, []); // []<-화면 마운트시 최초 한번 실행

  useEffect(() => {
    switch (category) {
      case "gather":
        setCategorySel("무비모임");
        break;
      case "recap":
        setCategorySel("모임후기");
        break;
      case "recs":
        setCategorySel("무비추천");
        break;
      default:
        navigate("/notfound");
        break;
    }
    console.log("category" + category);
  }, [category]);

  useEffect(() => {
    console.log("검색키워드 : " + keyword);
  }, [keyword]);

  return (
    <div>
      <BoardHeaderList
        id={category}
        keyword={keyword}
        setKeyword={setKeyword}
        setIsKeyword={setIsKeyword}
      />
      <BoardCardList
        category={categorySel}
        keyword={keyword}
        isKeyword={isKeyword}
        setKeyword={setKeyword}
        setIsKeyword={setIsKeyword}
      />
    </div>
  );
};

export default Board;
