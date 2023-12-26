import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/bundle";
import styled from "styled-components";
import MovieCard from "../MovieSearch/MovieCard";
import OttBoxApi from "../../api/OttBoxApi";
import { useNavigate } from "react-router-dom";
import Modal from "../../util/Modal";

const BoxOfficeSlideStyle = styled.div`
  padding: 50px 0;
  width: 100%;
  align-items: center;
  .boxOfficeRank-slider {
    width: 100%;
    position: relative;
    width: 100%;
    position: relative;
    .swiper-button {
      color: #494949;
      background-color: white;
      opacity: 0.5;
      padding: 20px 20px;
      height: 15px;
      width: 15px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 10;
      &:hover {
        background-color: var(--LIGHTVIO);
      }

      &::after {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--DARKBLUE);
      }
      &.swiper-button-prev {
      }
      &.swiper-button-next {
      }
      &.swiper-button-disabled {
        z-index: 10;
        cursor: default;
        pointer-events: auto;
        &:hover {
          background-color: white;
        }
      }
    }

    .swiper-wrapper {
      align-items: center;
      .slide {
        width: 30%;
      }
    }
  }
`;

const BoxOfficeSlide = () => {
  const [movieData, setMovieData] = useState([]);

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

  //박스오피스 영화정보 리스트 가져오기
  const fetchBoxOfficeList = async () => {
    try {
      const res = await OttBoxApi.getBoxOfficeMovies();
      if (res.data !== null) {
        console.log(res.data);
        setMovieData(res.data);
      } else {
        console.log("영화 정보가 없습니다.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect [] => 빈 배열은 처음 마운트되고 한번만 실행
  useEffect(() => {
    try {
      fetchBoxOfficeList();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <BoxOfficeSlideStyle>
      <Swiper
        className="boxOfficeRank-slider"
        loop={false}
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        allowTouchMove={true}
        initialSlide={0}
        spaceBetween={10}
        breakpoints={{
          992: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          576: {
            slidesPerView: 1,
          },
        }}
      >
        {movieData &&
          movieData.map((movie) => (
            <SwiperSlide className="slide" key={movie.id}>
              <MovieCard movie={movie} handleModal={handleModal} />
            </SwiperSlide>
          ))}
        <div className="swiper-button-prev swiper-button"></div>
        <div className="swiper-button-next swiper-button"></div>
      </Swiper>
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
    </BoxOfficeSlideStyle>
  );
};

export default BoxOfficeSlide;
