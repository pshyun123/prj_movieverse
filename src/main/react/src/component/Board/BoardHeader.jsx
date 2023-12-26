import BoardComp from "./BoardHeaderStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const BoardHeaderList = ({ id, keyword, setKeyword, setIsKeyword }) => {
  const [inputSearch, setInputSearch] = useState("");

  const changeValue = (e) => {
    setInputSearch(e.target.value);
  };

  const { category, description } = (() => {
    switch (id) {
      case "gather":
        return {
          category: "무비모임",
          description: "무비모임, 새로운 친구와의 만남의 장소",
        };
      case "recap":
        return {
          category: "모임후기",
          description: "영화를 마주한 감동과 여운을 모임후기에서 공유해보세요.",
        };
      case "recs":
        return {
          category: "무비추천",
          description:
            "트렌드에 민감한 여러분을 위한 최고의 영화 소식과 추천작을 즐겨보세요.",
        };
      default:
        return { category: "", description: "" };
    }
  })();
  const navigate = useNavigate();

  const onClickMenu = (num) => {
    switch (num) {
      case 1:
        navigate("/board/gather");
        break;
      case 2:
        navigate("/board/recap");
        break;
      case 3:
        navigate("/board/recs");
        break;
      default:
        return;
    }
  };

  return (
    <BoardComp>
      <div className="wrapper">
        <div className="container">
          <ul className="boardCategory">
            <li
              className={category === "무비모임" ? "active" : ""}
              onClick={() => onClickMenu(1)}
            >
              무비모임
            </li>
            <li
              className={category === "모임후기" ? "active" : ""}
              onClick={() => onClickMenu(2)}
            >
              모임후기
            </li>
            <li
              className={category === "무비추천" ? "active" : ""}
              onClick={() => onClickMenu(3)}
            >
              무비추천
            </li>
          </ul>
          <div className="boardText">
            <h1>{category}</h1>
            <p>{description}</p>
          </div>
          <div className="boardSearch">
            <div className="inputBox">
              <input
                type="text"
                placeholder="검색어를 입력해 주세요."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <div className="searchBox">
                <FontAwesomeIcon
                  icon={faSearch}
                  onClick={() => {
                    setIsKeyword(true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BoardComp>
  );
};

export default BoardHeaderList;
