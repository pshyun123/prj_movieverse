import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../../util/Button";
import face from "../../images/faceIcon/faceIcon3.png";

/* 마이페이지 MembershipJoin */
const MembershipJoinComp = styled.section`
  width: 100%;
  background-color: var(--BLUE);

  .container {
    position: relative;
    display: flex;
    justify-content: center;

    /* outline: 1px solid red; */
  }
  .adWrap {
    padding: 10%;
    width: 70%;
    /* outline: 1px solid white; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    p {
      font-size: 1.9rem;
      font-weight: 600;
      padding-bottom: 50px;
      white-space: nowrap;
      /* outline: 1px solid white; */
    }
    Button {
      font-size: 22px;
    }
  }
  .imgWrap {
    padding: 5%;
  }
  @media (max-width: 768px) {
    .container {
      padding: 10%;
      flex-direction: column;
    }
    .adWrap {
      flex-direction: column;
      width: 100%;
      padding: 10%;
      padding-top: 10px;
    }
    .imgWrap {
      display: flex;
      order: -1;
      justify-content: center;
      align-items: center;
      p {
        white-space: nowrap;
      }
    }
  }
`;
const MembershipJoin = () => {
  const navigate = useNavigate();

  const toPayment = () => {
    navigate("/Payment");
  };

  return (
    <MembershipJoinComp>
      <div className="container">
        <div className="adWrap">
          <div className="ad">
            <p>아직 멤버십 회원이 아니시군요!</p>
          </div>
          <div className="buttonBox">
            <Button children="가입하기" active={true} clickEvt={toPayment} />
          </div>
        </div>
        <div className="imgWrap">
          <img className="faceIcon" src={face} alt="faceIcon" />
        </div>
      </div>
    </MembershipJoinComp>
  );
};

export default MembershipJoin;
