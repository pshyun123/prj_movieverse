import styled from "styled-components";
import face from "../../images/faceIcon/faceIcon1.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../util/Modal";

const AdComp = styled.div`
  width: 100%;
  background-color: var(--VIOLET);
  position: sticky;
  bottom: 0;
  z-index: 300;

  .container {
    position: relative;
    display: flex;
    justify-content: center;
  }
  &:hover {
    cursor: pointer;
    transition: 0.3s ease-in;
    background-color: var(--LIGHTVIO);

    p {
      color: var(--DARKBLUE);
    }
  }
  .ad {
    width: 65%;
    padding-left: 5%;
    display: flex;
    justify-content: center;
    align-items: left;
    flex-direction: column;
    p {
      font-size: 1.5rem;
      padding-bottom: 10px;
    }
    @media only screen and (max-width: 768px) {
      p {
        font-size: 1.1rem;
      }
    }
    @media only screen and (max-width: 569px) {
      p {
        font-size: 0.9rem;
      }
    }
    @media only screen and (max-width: 480px) {
      p {
        font-size: 0.7rem;
        padding-bottom: 3px;
      }
    }
  }
  .imgWrap {
    width: 16%;
    padding-bottom: 16%;
    position: relative;
    .faceIcon {
      position: absolute;
      /* width: 70%; */
      height: 100%;
      top: 0;
      left: 0;
    }
    @media only screen and (max-width: 768px) {
      width: 20%;
      padding-bottom: 20%;
    }
  }
`;
const Advertise = ({ isLogin }) => {
  const navigate = useNavigate();

  const toPayment = () => {
    if (isLogin) {
      navigate("/Payment");
    } else {
      handleModal(
        "로그인",
        "로그인이 필요한 기능입니다. \n 로그인 하시겠습니까?",
        true
      );
    }
  };

  // 팝업 처리
  const [openModal, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState(null);
  // 팝업으로 이동하는 조건이 하나라면 굳이 필요 없이 아래처럼 직접 입력
  const [modalConfirm, setModalConfirm] = useState(null);

  const closeModal = (num) => {
    setModalOpen(false);
  };
  const handleModal = (header, msg, type, num) => {
    setModalOpen(true);
    setModalHeader(header);
    setModalMsg(msg);
    setModalType(type);
  };

  return (
    <>
      {/* 클릭이벤트에 모달 팝업 이벤트를 넣고 */}
      <AdComp
        onClick={() => {
          toPayment();
          if (modalConfirm) {
            modalConfirm();
          }
        }}
      >
        <div className="container">
          <div className="ad">
            <p>지금 멤버십에 가입하고 광고 없는</p>
            <p>쾌적한 환경에서 무비버스를 이용해보세요!</p>
          </div>
          <div className="imgWrap">
            <img className="faceIcon" src={face} alt="faceIcon" />
          </div>
        </div>
      </AdComp>
      <Modal
        open={openModal}
        close={closeModal}
        header={modalHeader}
        children={modalMsg}
        type={modalType}
        confirm={() => {
          navigate("/login");
          closeModal();
        }}
      />
    </>
  );
};
export default Advertise;
