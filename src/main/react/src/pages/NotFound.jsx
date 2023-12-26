import { styled } from "styled-components";
import Button from "../util/Button";
import { useNavigate } from "react-router-dom";

const NotFoundComp = styled.section`
  width: 100%;
  .container {
    height: 80vh;
    display: flex;
    text-align: center;
    justify-content: center;
    flex-direction: column;
    /* outline: 1px solid red; */

    .ErrorBox {
      /* outline: 1px solid white; */
      margin-top: 100px;
      margin-bottom: 50px;
      text-align: center;
      h2 {
        font-size: 2.2em;
        color: white;
        font-weight: 600;
        margin-bottom: 40px;
        span {
          color: red;
          font-weight: 800;
          margin-right: 5px;
        }
      }
      p {
        margin-top: 10px;
        font-size: 20px;
        line-height: 1.4;
      }
    }
    .buttonBox {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column; // 버튼을 수직으로 정렬
    }
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  const toMain = () => {
    navigate("/");
  };
  return (
    <>
      <NotFoundComp>
        <div className="container">
          <div className="ErrorBox">
            <h2>
              <span>404</span>Not Found
            </h2>
            <p>페이지를 찾을 수 없습니다</p>
            <p>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.</p>
            <p>입력하신 주소가 정확한지 다시 한 번 확인해주세요.</p>
          </div>
          <div className="buttonBox">
            <Button
              children="홈으로"
              active={true}
              front="var(--LIGHTVIO)"
              clickEvt={toMain}
              width="90px"
            />
          </div>
        </div>
      </NotFoundComp>
    </>
  );
};
export default NotFound;
