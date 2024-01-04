import React from "react";
import styled from "styled-components";
import Button from "../util/Button";
import IconSlide from "../component/Slide/IconSlide";
import { useNavigate } from "react-router-dom";
import congrats from "../images/congrats.png";

const PayRstComp = styled.section`
  width: 100%;
  padding: 5% 0;

  .container {
    padding-top: 130px;
    background-color: var(--LIGHTVIO);
    border-radius: 10px;

    .paymentBox {
      width: 100%;

      .textBox {
        margin-bottom: 50px;
        text-align: center;
        .titleBox {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;

          .congrats {
            width: 50px;
            //좌우 반전시키기 위해
            transform: rotate(90deg);
            -moz-transform: scaleX(-1);
            -o-transform: scaleX(-1);
            -webkit-transform: scaleX(-1);
            transform: scaleX(-1);
            filter: FlipH;
            -ms-filter: "FlipH";
          }
          h2 {
            font-weight: 600;
            color: var(--VIOLET);
            margin: 0 20px;
          }
          .congrats2 {
            width: 50px;
          }
        }
        h3 {
          font-size: 1.7rem;
          color: var(--VIOLET);
          margin-bottom: 30px;
          span {
            font-weight: 600;
            color: var(--VIOLET);
          }
        }
        p {
          font-size: 1.4rem;
          margin-bottom: 10px;
          color: var(--VIOLET);
        }
      }
      .buttonBox {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    @media only screen and (max-width: 768px) {
      .paymentBox {
        .textBox {
          .titleBox {
            .congrats {
              width: 40px;
            }
            .congrats2 {
              width: 40px;
            }
            h2 {
              font-size: 1.8rem;
              margin: 0 10px;
            }
          }
          h3 {
            font-size: 1.4rem;
            margin-bottom: 20px;
          }
          p {
            font-size: 1.1rem;
            margin-bottom: 7px;
          }
        }
      }
    }
    @media only screen and (max-width: 480px) {
      .paymentBox {
        .textBox {
          .titleBox {
            h2 {
              font-size: 1.6rem;
            }
          }
          h3 {
            font-size: 1.2rem;
          }
          p {
            font-size: 0.9rem;
          }
        }
      }
    }
  }
`;

const PaymentRst = () => {
  const navigate = useNavigate();

  const toMain = () => {
    navigate("/");
  };

  return (
    <>
      <PayRstComp>
        <div className="container">
          <div className="paymentBox">
            <div className="textBox">
              <div className="titleBox">
                <img className="congrats" src={congrats} alt="congrats" />
                <h2>축하합니다!</h2>
                <img className="congrats2" src={congrats} alt="congrats2" />
              </div>
              <h3>
                이제 당신은 <span>뭅뭅 멤버스</span>예요.
              </h3>
              <p>귀여운 뭅뭅 친구들을 보는 건 지금이 마지막입니다.</p>
              <p>무비키키와 무비모임에서 소통하며</p>
              <p>새로운 친구들과 자유롭게 즐겨주세요~</p>
            </div>

            <div className="buttonBox">
              <Button
                children="홈으로"
                active={true}
                front="var(--BLUE)"
                clickEvt={toMain}
              />
            </div>
            <IconSlide />
          </div>
        </div>
      </PayRstComp>
    </>
  );
};
export default PaymentRst;
