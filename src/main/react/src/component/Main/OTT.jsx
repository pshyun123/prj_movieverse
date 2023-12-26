import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import tiving from "../../images/logo_tiving.svg";
import netflex from "../../images/logo_netflex.png";
import watcha from "../../images/logo_watcha.svg";
import OttSlide from "../Slide/OttSlide";

const MovBtnStyle = `
  width: 150px;
  height: 60px;
  cursor: pointer;
  border: 0;
  background-color: "white";
  box-shadow: 2px 2px 2px 2px rgba(204, 204, 204, 0.4);
  border-radius: 5px;
  align-items: center;
  display: flex;
  justify-content: center;
  &.active {
    background-color: rgba(204, 204, 204, 0.2);
  }

  &:hover {
    background-color: rgba(204, 204, 204, 0.2);
  }
`;

const OTTComp = styled.section`
  width: 100%;
  height: 800px;
  background-color: white;
  position: relative;

  .bgBox {
    height: 40%;
    background-color: var(--LIGHTVIO);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .container {
    width: 100%;
    padding: 50px 0;

    .ottRankBox {
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      padding: 20px;

      h3 {
        font-weight: 600;
        font-size: 1.6rem;
        color: black;
      }
      hr {
        width: 130px;
        margin-bottom: 30px;
      }
      .ottBtnBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 50%;
        .tivingBtn {
          ${MovBtnStyle}
          margin-right: 10px;
          img {
            width: 80%;
          }
        }
        .netflixBtn {
          ${MovBtnStyle}
          margin-right: 10px;
          img {
            width: 90%;
          }
        }
        .watchaBtn {
          ${MovBtnStyle}
          img {
            width: 120%;
          }
        }
      }
      .ottRank-slider {
        width: 100%;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .bgBox {
      height: 43%;
    }

    .container {
      .ottRankBox {
        h3 {
          font-size: 1.4rem;
        }
        hr {
          width: 120px;
          margin-bottom: 30px;
        }
        .ottBtnBox {
          width: 70%;
        }
      }
      .ottRank-slider {
        width: 97%;
      }
    }
  }
`;

const OTT = () => {
  const [activeButton, setActiveButton] = useState("tiving");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <OTTComp>
      <div className="bgBox"></div>
      <div className="container">
        <div className="ottRankBox">
          <h3>OTT별 순위</h3>
          <hr />
          <div className="ottBtnBox">
            <div
              className={`tivingBtn ${
                activeButton === "tiving" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("tiving")}
            >
              <img src={tiving} alt="tiving" />
            </div>
            <div
              className={`netflixBtn ${
                activeButton === "netflix" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("netflix")}
            >
              <img src={netflex} alt="netflix" />
            </div>
            <div
              className={`watchaBtn ${
                activeButton === "watcha" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("watcha")}
            >
              <img src={watcha} alt="watcha" />
            </div>
          </div>
          <div className="ottRank-slider">
            <OttSlide activeButton={activeButton} />
          </div>
        </div>
      </div>
    </OTTComp>
  );
};

export default OTT;
