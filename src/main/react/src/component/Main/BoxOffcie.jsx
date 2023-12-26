import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import BoxOfficeSlide from "../Slide/BoxOfficeSlide";

import "swiper/css";
import "swiper/css/effect-cards";
// import { EffectCards } from "swiper/modules";

const BoxOfficeComp = styled.section`
  width: 100%;
  /* padding: 5% 0; */
  .container {
    width: 100%;
    padding: 50px 0;

    .boxOfficeBox {
      /* border: 1px solid red; */
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      .textBox {
        h3 {
          font-weight: 600;
          font-size: 1.6rem;
        }
        hr {
          width: 130px;
        }
      }
      .cardSwiper {
        width: 70%;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .container {
      .boxOfficeBox {
        .textBox {
          h3 {
            font-weight: 600;
            font-size: 1.4rem;
          }
          hr {
            width: 120px;
          }
        }
        .cardSwiper {
        }
      }
    }
  }
`;
const BoxOffice = () => {
  return (
    <>
      <BoxOfficeComp>
        <div className="container">
          <div className="boxOfficeBox">
            <div className="textBox">
              <h3>박스 오피스</h3>
              <hr />
            </div>

            <div className="cardSwiper">
              <BoxOfficeSlide />
            </div>
          </div>
        </div>
      </BoxOfficeComp>
    </>
  );
};
export default BoxOffice;
