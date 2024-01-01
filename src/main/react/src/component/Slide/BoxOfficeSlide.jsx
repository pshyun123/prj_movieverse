import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/bundle";
import styled from "styled-components";
import MovieCard from "../MovieSearch/MovieCard";
import OttBoxApi from "../../api/OttBoxApi";

const BoxOfficeSlideStyle = styled.div`
  padding: 50px 0;
  width: 100%;
  align-items: center;
  .boxOfficeRank-slider {
    width: 100%;
    position: relative;
    width: 100%;

    // 스와이퍼 버튼
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

      // 스와이퍼 버튼 hover
      &:hover {
        background-color: var(--LIGHTVIO);
      }

      // 스와이퍼의 화살표 버튼
      &::after {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--DARKBLUE);
      }

      // 스와이퍼 비활성화시 버튼 상태
      &.swiper-button-disabled {
        cursor: default;
        pointer-events: auto;
        &:hover {
          background-color: white;
        }
      }
    }
  }
`;

const BoxOfficeSlide = () => {
  const [movieData, setMovieData] = useState([]);

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

  // 처음 마운트되고 한번만 영화정보 가져 옴
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
        {/* 영화 데이터를 매핑하여 Swiper 슬라이드로 표시 */}
        {movieData &&
          movieData.map((movie) => (
            <SwiperSlide className="slide" key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        {/* Swiper 화살표 버튼 */}
        <div className="swiper-button-prev swiper-button"></div>
        <div className="swiper-button-next swiper-button"></div>
      </Swiper>
    </BoxOfficeSlideStyle>
  );
};

export default BoxOfficeSlide;
