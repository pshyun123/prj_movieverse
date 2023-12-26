import { useState, useEffect } from "react";
import Button from "../util/Button";
import Modal from "../util/Modal";
import AgreementModal from "../util/Agreement/AgreementModal";
import Chart from "../component/Chart/Chart";
import PaginationUtil from "../util/Pagination/Pagination";
const UtilTest = () => {
  //Modal
  // 여기서부터
  const [openModal, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState(null);
  const [modalConfirm, setModalConfirm] = useState(null);

  // 모달 닫기
  const closeModal = (num) => {
    setModalOpen(false);
  };
  const handleModal = (header, msg, type, num) => {
    setModalOpen(true);
    setModalHeader(header);
    setModalMsg(msg);
    setModalType(type);
    setModalConfirm(num);
  };
  // 여기까지 고정적으로 복사 (수정 X)

  // 함수에 담아 둠 - 이 페이지에서는 버튼이 눌렸을 때 사용하므로
  // 모달 팝업 버튼의 clickEvt 에서 사용
  // 결과 : 모달 팝업 버튼이 눌려지면 모달 팝업
  const test = () => {
    // 모달 팝업 버튼을 눌러보면 어떤 매개변수가 어디에 영향을 주는지 볼 수 있음
    handleModal("header", "msg", true);
  };

  //Button 활성화
  const [isActive, setActive] = useState(false);
  const activate = () => {
    isActive ? setActive(false) : setActive(true);
  };

  // AgreementModal
  const [openAgreement, setAModalOpen] = useState(false);
  const agreeTest = () => {
    setAModalOpen(true);
  };
  const closeAgree = () => {
    setAModalOpen(false);
  };

  // 페이지네이션 관련

  const [totalPage, setTotalPage] = useState(5);
  const [page, setPage] = useState(1);

  return (
    <>
      <div className="container">
        <Button
          children="모달팝업"
          front="var(--VIOLET)"
          back="var(--LIGHTVIO)"
          width=""
          height=""
          fontSize=""
          active={isActive}
          clickEvt={test}
        />
        <Button children="활성화" clickEvt={activate} active={true} />
        <br />
        <Button children="약관" active={true} clickEvt={agreeTest} />
      </div>
      <Modal
        open={openModal}
        close={closeModal}
        header={modalHeader}
        children={modalMsg}
        type={modalType}
        confirm={() => {
          if (modalConfirm === 0) {
            // 조건걸기
          }
        }}
      />
      <AgreementModal open={openAgreement} close={closeAgree} type={"use"} />
      {/* <Chart /> */}
      <PaginationUtil
        totalPage={totalPage}
        limit={5}
        page={page}
        setPage={setPage}
      />
    </>
  );
};
export default UtilTest;
