import BoardCard from "./BoardCard";
import BoardCardStyle from "../Board/BoardCardStyle";
import { useEffect, useState } from "react";
import ToggleButton from "../Board/BoardToggleBtn";
import Button from "../../util/Button";
import { useNavigate } from "react-router-dom";
import BoardApi from "../../api/BoardApi";
import Common from "../../util/Common";
import PaginationUtil from "../../util/Pagination/Pagination";

const BoardCardList = ({
  category,
  keyword,
  type,
  setKeyword,
  isLoading,
  setIsLoading,
}) => {
  // 페이지 네이션 관련
  const [totalPage, setTotalPage] = useState(5);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("recent");
  const [boardData, setBoardData] = useState([]);
  const [gatherType, setGatherType] = useState("온라인");

  // 페이지 수
  const fetchTotalPage = async () => {
    const res = await BoardApi.getTotalPage(keyword, category, gatherType);
    if (res.data !== null) {
      setTotalPage(res.data);
      setPage(1);
      setKeyword("");
      if (category === "무비추천") {
        setGatherType("");
      }
      await Common.handleTokenAxios(() => fetchBoardList(1));
    }
  };

  // 게시글 리스트
  const fetchBoardList = async (page) => {
    const res = await BoardApi.getBoardList(
      page,
      sortBy,
      keyword,
      category,
      gatherType
    );
    if (res.data !== null) {
      setBoardData(res.data);
    }
    // 리스트 불러오기를 시도 후 로딩 false
    setIsLoading(false);
  };

  // 회원 게시글 페이지 수
  const fetchMemTotalPage = async () => {
    const res = await BoardApi.getMemTotalPage(type);
    if (res.data !== null) {
      setTotalPage(res.data);
      await Common.handleTokenAxios(() => fetchMemBoardList(1));
    }
  };

  // 회원 게시글 리스트
  const fetchMemBoardList = async (page) => {
    const res = await BoardApi.getMemBoardList(page, type);
    if (res.data !== null) {
      setBoardData(res.data);
    }
  };

  // 새로운 조건의 리스트를 불러와야 하는 경우
  useEffect(() => {
    if (isLoading) {
      category === "member"
        ? Common.handleTokenAxios(fetchMemTotalPage)
        : Common.handleTokenAxios(fetchTotalPage);
      console.log("타입 : " + gatherType);
    }
  }, [isLoading]);

  // 페이지만 변경하는 경우
  useEffect(() => {
    category === "member"
      ? Common.handleTokenAxios(() => fetchMemBoardList(page))
      : Common.handleTokenAxios(() => fetchBoardList(page));
  }, [page]);

  // 카테고리를 새로 선택하는 경우 모임종류는 기본 온라인으로
  useEffect(() => {
    if (category === "무비추천") {
      setGatherType("");
    } else if (category !== "무비추천") {
      setGatherType("온라인");
    }
    setIsLoading(true);
  }, [category]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  const navigate = useNavigate();

  return (
    <BoardCardStyle>
      <div className="container">
        <div className="boardCardBox">
          {category !== "무비추천" && category !== "member" && (
            <div className="gatherTypeList">
              <ToggleButton
                onChange={setGatherType}
                category={category}
                gatherType={gatherType}
                setIsLoading={setIsLoading}
              />
            </div>
          )}

          {category !== "member" && (
            <ul className="sortArea">
              <li
                className={sortBy === "recent" ? "active" : ""}
                onClick={() => {
                  setSortBy("recent");
                  setIsLoading(true);
                }}
              >
                최신순
              </li>
              <li
                className={sortBy === "former" ? "active" : ""}
                onClick={() => {
                  setSortBy("former");
                  setIsLoading(true);
                }}
              >
                과거순
              </li>
            </ul>
          )}
          <div className="boardMap">
            {boardData &&
              boardData.map((board) => (
                <BoardCard key={board.title} board={board} />
              ))}
            {/* 페이지네이션 */}
            <PaginationUtil
              totalPage={totalPage}
              limit={10}
              page={page}
              setPage={setPage}
            />
          </div>
          <div className="newPostBtn">
            <Button
              children="새 글 작성"
              active={true}
              clickEvt={() => {
                navigate("/board/new");
              }}
            />
          </div>
        </div>
      </div>
    </BoardCardStyle>
  );
};

export default BoardCardList;
