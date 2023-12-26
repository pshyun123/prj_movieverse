import { styled } from "styled-components";
import face from "../../images/movieverse_logo.png";

const LoadingComp = styled.section`
  width: 100%;
  .container {
    h2 {
      font-size: 1.8rem;
      font-weight: 600;
      display: flex;
      text-align: center;
      justify-content: center;
      color: var(--GREY);
      margin-top: 15%;
    }
    .faceIcon {
      width: 150px;
      position: relative;
      left: 15%;
      bottom: 150px;
      margin-top: 5%;
      margin-bottom: 1%;
    }
  }
`;

const Loading = () => {
  return (
    <>
      <LoadingComp>
        <div className="container">
          <div className="loadingBox">
            <h2>로그인 중입니다 잠시만 기다려 주세요</h2>
          </div>
          <img className="faceIcon" src={face} alt="faceIcon" />
        </div>
      </LoadingComp>
    </>
  );
};

export default Loading;
