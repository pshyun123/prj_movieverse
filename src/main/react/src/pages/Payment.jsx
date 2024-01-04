import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import styled from "styled-components";
import Button from "../util/Button";
import face from "../images/faceIcon/faceIcon4.png";
import MemberApi from "../api/MemberApi";
import useTokenAxios from "../hooks/useTokenAxios";

const PayComp = styled.section`
  width: 100%;
  padding: 5% 0;

  .container {
    position: relative;
    overflow: hidden;
    padding: 130px 0;
    background-color: var(--BLUE);
    border-radius: 10px;
    .paymentBox {
      width: 70%;
      padding-left: 15%;
      .textBox {
        margin-bottom: 50px;
        h2 {
          padding-bottom: 5%;
        }
        p {
          font-size: 1.3rem;
          padding-bottom: 2%;
          span {
            font-weight: 600;
            font-size: 1.7rem;
            color: var(--LIGHTVIO);
          }
        }
      }
    }
    .faceIcon {
      position: absolute;
      bottom: -10%;
      right: -8%;
      width: 400px;
    }
    @media only screen and (max-width: 768px) {
      .paymentBox {
        .textBox {
          p {
            font-size: 1.1rem;
            span {
              font-size: 1.4rem;
            }
          }
        }
      }
      .faceIcon {
        width: 300px;
      }
    }
    @media only screen and (max-width: 569px) {
      .paymentBox {
        width: 80%;
        .textBox {
          h2 {
            font-size: 1.6rem;
          }
        }
      }
      .faceIcon {
        width: 220px;
      }
    }
    .buttonBox {
      width: 250px;
      p {
        padding-top: 3%;
        text-align: right;
        font-size: 0.9rem;
      }
    }
    @media only screen and (max-width: 480px) {
      .paymentBox {
        width: 80%;
        .textBox {
          h2 {
            font-size: 1.2rem;
          }
          p {
            font-size: 0.9rem;
            span {
              font-size: 1.2rem;
            }
          }
        }
      }
      .faceIcon {
        width: 180px;
      }
    }
    .buttonBox {
      width: 50%;
      button {
        margin-bottom: 5px;
      }
      p {
        text-align: right;
        font-size: 0.8rem;
      }
    }
  }
`;
const Payment = () => {
  const navigate = useNavigate();

  const context = useContext(UserContext);
  // 로그인 / 멤버쉽 여부
  const { setIsKikiMember } = context;

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.8.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  // 멤버십 정보 저장
  const membershipUpdate = async () => {
    const res = await MemberApi.saveMembership(true);
    console.log(res.data);
    if (res.data) {
      navigate("/payment/result");
      console.log("멤버십 저장 성공");
    } else {
      console.log("멤버십 저장 실패!");
    }
  };
  const updateMembership = useTokenAxios(membershipUpdate);

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init("imp78148083");

    const data = {
      // pg: "tosspay",// 토스페이 간편결제
      // pg: "kakaopay", // 카카오페이 간편결제
      pg: "kcp.AO09C", // NHN KCP 결제 방식 사용
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: "2900",
      name: "결제 테스트",
      buyer_name: "홍길동",
      // buyer_tel: "01012345678",
      buyer_email: "14279625@gmail.com",
      buyer_addr: "구천면로 000-00",
      // buyer_postcode: "01234",
    };

    IMP.request_pay(data, callback);
  };

  const callback = (response) => {
    const {
      success,
      error_msg,
      imp_uid,
      merchant_uid,
      pay_method,
      paid_amount,
      status,
    } = response;

    if (success) {
      updateMembership();
      console.log("결제 성공");
      // 토큰
      setIsKikiMember(true);
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };

  return (
    <>
      <PayComp>
        <div className="container">
          <div className="paymentBox">
            <div className="textBox">
              <h2>앗, 광고가 불편하셨나요?</h2>
              <p>뭅뭅 친구들을 없애고</p>
              <p>쾌적한 무비버스를 즐겨보세요!</p>
              <p>
                단돈 <span>2,900원</span>으로
              </p>
              <p>마음의 평화를 얻을 수 있어요 :)</p>
            </div>
            <div className="buttonBox">
              <Button
                children="결제하기"
                active={true}
                clickEvt={onClickPayment}
                width="100%"
              />
              <p>VAT포함</p>
            </div>
          </div>
          <img className="faceIcon" src={face} alt="faceIcon" />
        </div>
      </PayComp>
    </>
  );
};
export default Payment;
