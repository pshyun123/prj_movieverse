// OttSlide.js
import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/bundle";
import styled from "styled-components";
import MovieCard from "../MovieSearch/MovieCard";
import OttBoxApi from "../../api/OttBoxApi";

const OttSlideStyle = styled.div`
  width: 100%;
  padding-top: 80px;
  .ottRank-slider {
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

const OttSlide = ({ activeButton }) => {
  const [movieData, setMovieData] = useState([]);

  const swiperRef = useRef(null);


  const fetchMoviesByButton = async () => {
    try {
      const data = (() => {
        switch (activeButton) {
          case "tiving":
            return OttBoxApi.getTivingMovies();
          case "netflix":
            return OttBoxApi.getNetflixMovies();
          case "watcha":
            return OttBoxApi.getWatchaMovies();
          default:
            //디폴트 값
            return OttBoxApi.getOttBoxMovies();
        }
      })();

      const result = await data;

      if (result && result.data !== null) {
        console.log(result.data);
        setMovieData(result.data);

        swiperRef.current.swiper.slideTo(0);
        swiperRef.current.swiper.update();
      } else {
        console.log("영화 정보가 없습니다.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      fetchMoviesByButton();
    } catch (e) {
      console.log(e);
    }
  }, [activeButton]);

  return (
    <OttSlideStyle>
      <Swiper
        className="ottRank-slider"
        loop={false}
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        allowTouchMove={true}
        initialSlide={0}
        spaceBetween={20}
        breakpoints={{
          992: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          300: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
        ref={swiperRef}
      >
        {movieData &&
          movieData.map((movie) => (
            <SwiperSlide className="slide" key={movie.title}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        <div className="swiper-button-prev swiper-button"></div>
        <div className="swiper-button-next swiper-button"></div>
      </Swiper>


    </OttSlideStyle>
  );
};

export default OttSlide;
