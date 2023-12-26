import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useContext } from "react";
import { styled } from "styled-components";
import { UserContext } from "../../context/UserStore";
import BookmarkApi from "../../api/BookmarkApi";
import Common from "../../util/Common";
import { isRouteErrorResponse } from "react-router-dom";

const BookmarkComp = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 5px;
  z-index: 100;
  .BookmarkBox {
    width: 50px;
    height: 50px;
    &:hover {
      cursor: pointer;
    }
    .BookmarkAround {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      .heart {
        font-size: 1.3rem;
        color: var(--LIGHTVIO);
        opacity: 0.2;
        position: relative;
        z-index: 101;
        &.marked {
          opacity: 1;
        }
      }

      &:hover {
        .heart {
          opacity: 1;
          &.marked {
            opacity: 1;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
  }
`;

const Bookmark = ({
  movieId,
  handleModal,
  setHideState,
  sortType,
  hideMovie,
}) => {
  const context = useContext(UserContext);
  const { loginStatus } = context;

  const [marked, setMarked] = useState(false);
  const changeHeart = () => {
    if (loginStatus) {
      marked
        ? Common.handleTokenAxios(deleteBookMark)
        : Common.handleTokenAxios(saveBookMark);
    } else {
      handleModal(
        "로그인",
        "로그인이 필요한 기능입니다. \n 로그인 하시겠습니까?",
        true
      );
    }
  };

  useEffect(() => {
    console.log("marked : " + marked);
  }, [marked]);

  useEffect(() => {
    if (loginStatus) {
      setBookMark();
    } else {
      setMarked(false);
    }
  }, [loginStatus]);

  const setBookMark = () => {
    Common.handleTokenAxios(fetchBookMark);
  };

  const fetchBookMark = async () => {
    const res = await BookmarkApi.isBookmark(movieId);
    if (res.data) {
      setMarked(true);
    } else {
      setMarked(false);
    }
  };
  const saveBookMark = async () => {
    const res = await BookmarkApi.saveBookmark(movieId);
    if (res.data) {
      console.log("북마크 성공!");
      setBookMark();
    }
  };
  const deleteBookMark = async () => {
    const res = await BookmarkApi.removeBookmark(movieId);
    if (res.data) {
      console.log("북마크 해제 성공!");
      setBookMark();
      if (sortType === "member") {
        // setHideState((prevHideState) => ({
        //   ...prevHideState,
        //   [movieId]: true,
        // }));
        hideMovie(movieId);
      }
    }
  };

  return (
    <BookmarkComp>
      <div className="BookmarkBox">
        <div className="BookmarkAround" onClick={changeHeart}>
          <FontAwesomeIcon
            icon={faHeart}
            className={`heart ${marked ? "marked" : ""}`}
          />
        </div>
      </div>
    </BookmarkComp>
  );
};

export default Bookmark;
