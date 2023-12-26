import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import styled from "styled-components";
import face1 from "../../images/faceIcon/faceIcon1.png";
import face2 from "../../images/faceIcon/faceIcon2.png";
import face3 from "../../images/faceIcon/faceIcon3.png";
import face4 from "../../images/faceIcon/faceIcon4.png";
import face5 from "../../images/faceIcon/faceIcon5.png";
import face6 from "../../images/faceIcon/faceIcon6.png";
import face7 from "../../images/faceIcon/faceIcon7.png";
import face8 from "../../images/faceIcon/faceIcon8.png";
import face9 from "../../images/faceIcon/faceIcon9.png";
import face10 from "../../images/faceIcon/faceIcon10.png";
import face11 from "../../images/faceIcon/faceIcon11.png";
import face12 from "../../images/faceIcon/faceIcon12.png";
import face13 from "../../images/faceIcon/faceIcon13.png";

const IconSlideStyle = styled.div`
  padding: 100px 0;

  .logo-slider {
    .swiper-wrapper {
      transition-timing-function: linear;
    }

    .slide {
      width: 100%;

      img {
        width: 60%;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    padding: 20px 0;

    .logo-slider {
      padding: 30px 0;
      .slide {
        width: 50%;

        img {
          width: 70%;
        }
      }
    }
  }
`;

const IconSlide = () => {
  const Urls = [
    face1,
    face2,
    face3,
    face4,
    face5,
    face6,
    face7,
    face8,
    face9,
    face10,
    face11,
    face12,
    face13,
  ];

  return (
    <IconSlideStyle>
      <Swiper
        className="logo-slider"
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 0,
        }}
        slidesPerView={5}
        speed={3000}
        allowTouchMove={false}
        initialSlide={0}
      >
        {Urls.map((url, index) => (
          <SwiperSlide className="slide" key={index}>
            <img src={url} alt="뭅뭅친구" />
          </SwiperSlide>
        ))}
      </Swiper>
    </IconSlideStyle>
  );
};

export default IconSlide;
