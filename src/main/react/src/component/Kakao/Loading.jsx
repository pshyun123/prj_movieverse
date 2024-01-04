import { styled } from "styled-components";
import logo from "../../images/movieverse_logo.png";

const LoadingComp = styled.section`
  width: 100%;
  height: 80vh;
  .container {
    display: flex;
    align-items: center;
    padding-top: 100px;
    .logo {
      width: 150px;
      margin-right: 20px;
    }
    h2 {
      font-size: 1.8rem;
      font-weight: 600;
      text-align: center;
      color: var(--GREY);
    }
  }
  @media only screen and (max-width: 480px) {
    .container {
      flex-direction: column;
      justify-content: center;
      .logo {
        width: 100px;
        margin-right: 0;
        margin-bottom: 40px;
      }
      h2 {
        font-size: 1.4em;
      }
    }
  }
`;

const Loading = () => {
  return (
    <>
      <LoadingComp>
        <div className="container">
          <img className="logo" src={logo} alt="logo" />
          <div className="loadingBox">
            <h2>로그인 중입니다 잠시만 기다려 주세요</h2>
          </div>
        </div>
      </LoadingComp>
    </>
  );
};

export default Loading;
