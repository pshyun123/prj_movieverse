import { styled } from "styled-components";
import MovieCard from "./MovieCard";
import React, { useEffect, useState, useRef } from "react";
import MovieApi from "../../api/MovieApi";
import Modal from "../../util/Modal";
import { useNavigate } from "react-router-dom";
import BookmarkApi from "../../api/BookmarkApi";
import Common from "../../util/Common";

const SearchMapBoxStyle = styled.section`
  .noBookmark {
    text-align: center;
    font-size: 1.6em;
    line-height: 2.3;
  }
  .container {
    padding-bottom: 150px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  }
  @media only screen and (max-width: 768px) {
    .container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const SearchMapBox = ({ sortType, keyword }) => {
  const [movieSearchData, setMovieSearchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(false);

  const [hideState, setHideState] = useState({});

  const end = useRef(null);

  const fetchMovieData = async () => {
    try {
      setLoading(true);

      const apiCall =
        sortType === "member"
          ? () => BookmarkApi.getMemberMovie(currentPage, 8)
          : () => MovieApi.getMovieList(currentPage, 8, sortType, keyword);
      const res = await apiCall();

      if (res.data.length === 0) {
        //값이 없으면 마지막 페이지
        setLastPage(true);
      } else {
        setMovieSearchData((prevData) => [...prevData, ...res.data]);

        // 현재 타입에 따라 currentPage 갱신
        setCurrentPage((prevPage) => prevPage + 1);
      }

      setLoading(false);
    } catch (error) {
      console.error("영화 데이터를 불러오는 중 에러 발생:", error);
      setLoading(false);
    }
  };

  const fetchFirstMovieData = async () => {
    try {
      setCurrentPage(0);
      setMovieSearchData([]);
      setLastPage(false);
      setLoading(true);

      const apiCall =
        sortType === "member"
          ? () => BookmarkApi.getMemberMovie(0, 8)
          : () => MovieApi.getMovieList(0, 8, sortType, keyword);
      const res = await apiCall();

      if (res.data !== null) {
        setMovieSearchData(res.data);
        setLoading(false);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("영화 데이터를 불러오는 중 에러 발생:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sortType === "member") {
      Common.handleTokenAxios(fetchFirstMovieData);
    } else {
      fetchFirstMovieData();
    }

    console.log("sortType" + sortType);
  }, [sortType, keyword]);

  useEffect(() => {
    console.log("currentPage" + currentPage);
  }, [currentPage]);

  useEffect(() => {
    console.log(keyword);
    if (!loading && !lastPage) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (sortType === "member") {
              Common.handleTokenAxios(fetchMovieData);
            } else {
              fetchMovieData();
            }
          }
        },
        { threshold: 1 }
      );
      observer.observe(end.current);

      // Cleanup function
      return () => {
        observer.disconnect();
      };
    }
  }, [loading, lastPage, currentPage, keyword, hideState]);

  // 북마크 해제시 목록에서 사라짐
  useEffect(() => {
    const hiddenMovieIds = Object.keys(hideState).filter(
      (movieId) => hideState[movieId]
    );
    console.log(`Number of hidden movies: ${hiddenMovieIds.length}`);
    console.log("무비길이 : " + movieSearchData.length);
    if (hiddenMovieIds.length === movieSearchData.length) {
      setMovieSearchData([]);
    }
  }, [hideState]);

  const hideMovieCard = (movieId) => {
    setHideState((prevHideState) => ({
      ...prevHideState,
      [movieId]: true,
    }));
  };

  //Modal (북마크)
  const navigate = useNavigate();
  // 여기서부터
  const [openModal, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState(null);

  // 모달 닫기
  const closeModal = (num) => {
    setModalOpen(false);
  };
  const handleModal = (header, msg, type, num) => {
    setModalOpen(true);
    setModalHeader(header);
    setModalMsg(msg);
    setModalType(type);
  };

  return (
    <>
      <SearchMapBoxStyle>
        {sortType === "member" && movieSearchData.length === 0 && (
          <div className="noBookmark">
            <p>북마크 된 영화가 없습니다</p>
            <p>
              무비버스에서 마주친 간직하고 싶은 영화 정보에 하트를 눌러주세요
            </p>
          </div>
        )}
        <div className="container">
          {movieSearchData &&
            movieSearchData.map(
              (movie) =>
                !hideState[movie.id] && (
                  <MovieCard
                    movie={movie}
                    key={movie.title}
                    handleModal={handleModal}
                    sortType={sortType}
                    hideState={hideState}
                    setHideState={setHideState}
                    hideMovie={hideMovieCard}
                  />
                )
            )}
        </div>
        {!loading && <div ref={end}></div>}
        <Modal
          open={openModal}
          close={closeModal}
          header={modalHeader}
          children={modalMsg}
          type={modalType}
          confirm={() => {
            navigate("/login");
          }}
        />
      </SearchMapBoxStyle>
    </>
  );
};

export default SearchMapBox;
