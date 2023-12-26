import styled from "styled-components";
import React from "react";
import Bookmark from "../MovieSearch/Bookmark";
import Modal from "../../util/Modal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const InfoSection1Style = styled.section`
  background-color: black;
  padding: 90px 0;
  position: relative;
  .container {
    display: flex;
    .moviePoster {
      position: relative;
      width: 28%;
      margin: 0 10%;
      img {
        width: 100%;
        border-radius: 10px;
        object-fit: cover;
        height: 91.5%;
      }
      .bookmarkIcon {
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }
    .movieOtherInfo {
      flex: 1;
      font-size: 1.4em;
      letter-spacing: -0.8px;
      .titleInfo {
        .title {
          word-break: keep-all;
          white-space: normal;
          margin-bottom: 5px;
        }
      }
      .titleEngInfo {
        .titleEng {
          line-height: 20px;
          color: var(--GREY);
          margin-bottom: 12%;
        }
      }
      .infoBox {
        display: flex;
        margin-bottom: 5%;
        .movieInfo {
          margin-right: 10px;
          width: 23%;
          font-weight: 600;
          color: var(--LIGHTVIO);
        }
      }
    }
    p {
      line-height: 1.5rem;
    }
  }

  @media only screen and (max-width: 768px) {
    background-color: black;
    padding: 50px 0;
    .container {
      width: 95%;
      .moviePoster {
        width: 45%;
        margin-left: 1.5%;
      }
      .movieOtherInfo {
        .infoBox {
          /* margin-bottom: 1.5%; */
          .movieInfo {
            width: 35%;
          }
          .loadInfo {
            width: 65%;
            word-break: keep-all;
          }
        }
      }
    }
  }
`;

const MovieInfoSection1 = ({ movieDetail, movieId }) => {
  const navigate = useNavigate();
  //Modal
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

  const formatDate = (numericDate) => {
    try {
      if (numericDate && numericDate.length === 8) {
        const year = numericDate.slice(0, 4);
        const month = numericDate.slice(4, 6);
        const day = numericDate.slice(6, 8);
        return `${year}.${month}.${day}`;
      } else {
        throw new Error("잘못된 날짜");
      }
    } catch (error) {
      if (error.message !== "잘못된 날짜") {
        // "잘못된 날짜"가 아닌 경우에만 콘솔에 에러 메시지 출력
        console.error(`날짜 변환 오류: ${error.message}`);
      }
      return "날짜 변환 오류";
    }
  };
  return (
    <>
      <InfoSection1Style>
        <section>
          <div className="container">
            <div className="moviePoster">
              <img src={movieDetail.posters} alt="PosterImg" />
              <Bookmark
                className="BookmarkIcon"
                movieId={movieId}
                handleModal={handleModal}
              />
            </div>
            <div className="movieOtherInfo">
              <div className="titleInfo">
                <h3 className="title">{movieDetail.title}</h3>
              </div>
              <div className="titleEngInfo">
                <p className="titleEng">{movieDetail.titleEng}</p>
              </div>
              <div className="infoBox">
                <p className="movieInfo">개봉</p>
                <p className="loadInfo">{formatDate(movieDetail.reprlsDate)}</p>
              </div>
              <div className="infoBox">
                <p className="movieInfo">장르</p>
                <p className="loadInfo">
                  {movieDetail.genre ? movieDetail.genre : "-"}
                </p>
              </div>
              <div className="infoBox">
                <p className="movieInfo">국가</p>
                <p className="loadInfo">
                  {movieDetail.nation ? movieDetail.nation : "-"}
                </p>
              </div>
              <div className="infoBox">
                <p className="movieInfo">등급</p>
                <p className="loadInfo">
                  {movieDetail.rating ? movieDetail.rating : "-"}
                </p>
              </div>
              <div className="infoBox">
                <p className="movieInfo">평점</p>
                <p className="loadInfo">
                  {movieDetail.score !== " " ? movieDetail.score : "-"}
                </p>
              </div>
              <div className="infoBox">
                <p className="movieInfo">상영시간</p>
                <p className="loadInfo">{movieDetail.runtime + "분"}</p>
              </div>
            </div>
          </div>
        </section>
      </InfoSection1Style>
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
    </>
  );
};

export default MovieInfoSection1;
