import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserStore";
import loginBgPc from "../images/login_bg_pc.jpg";
import loginBgMo from "../images/login_bg_mo.jpg";
import Button from "../util/Button";
import Modal from "../util/Modal";
import MemberApi from "../api/MemberApi";
import Common from "../util/Common";

const LoginComp = styled.section`
  width: 100%;
  height: 80vh;
  background-image: url(${loginBgPc});
  background-position: center;
  background-size: cover;
  .bgBox {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    .container {
      height: 100%;
      padding-top: 120px;
      display: flex;
      justify-content: center;
      .loginBox {
        width: 400px;
        /* outline: 1px solid red; */
        h2 {
          margin-bottom: 30px;
          font-size: 1.8em;
          font-weight: 600;
        }
        .inputBox {
          border-radius: 5px;
          border: 1px solid var(--GREY);
          overflow: hidden;
          margin-bottom: 40px;
          input {
            width: 100%;
            font-size: 1em;
            padding: 15px;
            border: none;
            outline: none;
            &:first-child {
              border-bottom: 1px solid var(--GREY);
            }
            &::placeholder {
              color: var(--GREY);
            }
          }
        }
        button {
          margin-bottom: 30px;
          &.kakaoBtn {
            background-color: #fee500;
            font-size: 1em;
            font-weight: 600;
            color: #333;
            cursor: pointer;
            border: none;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    background-image: url(${loginBgMo});
    .bgBox {
      .container {
        .loginBox {
          width: 90%;
          h2 {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { setLoginStatus, loginStatus } = context;

  //키보드 입력
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");

  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
  };
  const onChangePw = (e) => {
    setInputPw(e.target.value);
  };

  // 버튼 활성화
  const [isActive, setIsActive] = useState(false);

  // 팝업 처리
  const [openModal, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const [modalMsg, setModalMsg] = useState("");

  useEffect(() => {
    // console.log("id:" + inputEmail);
    // console.log("pw:" + inputPw);

    // 이메일 + 비밀번호 입력시 로그인 버튼 활성화
    if (inputEmail.length > 0 && inputPw.length > 0) setIsActive(true);
    else setIsActive(false);
  }, [inputEmail, inputPw, modalMsg]);

  const loginClick = async () => {
    console.log("로그인!");
    try {
      const res = await MemberApi.login(inputEmail, inputPw);
      // console.log(res.data);
      if (res.data.grantType === "Bearer") {
        // console.log("accessToken : " + res.data.accessToken);
        // console.log("refreshToken : " + res.data.refreshToken);
        Common.setAccessToken(res.data.accessToken);
        Common.setRefreshToken(res.data.refreshToken);
        setLoginStatus(true);
        navigate("/");
      } else {
        setModalOpen(true);
        setModalMsg("잘못된 아이디 또는 비밀번호 입니다.");
      }
    } catch (err) {
      console.log("로그인 에러 : " + err);
      if (err.response && err.response.status === 405) {
        console.log("로그인 실패: 405 Unauthorized");
        setModalOpen(true);
        setModalMsg("잘못된 아이디 또는 비밀번호 입니다.");
      } else {
        console.log("로그인 에러 : " + err);
        setModalOpen(true);
        setModalMsg("서버와의 연결이 끊어졌습니다!");
      }
    }
  };
  const toJoin = () => {
    navigate("/join");
  };

  const kakaoLogin = () => {
    const CLIENT_ID = process.env.REACT_APP_KAKAO_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_URL;
  };
  useEffect(() => {
    if (loginStatus) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <LoginComp>
        <div className="bgBox">
          <div className="container">
            <div className="loginBox">
              <h2>로그인</h2>
              <div className="inputBox">
                <input
                  type="text"
                  placeholder="이메일(example@naver.com)"
                  value={inputEmail}
                  onChange={onChangeEmail}
                />
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={inputPw}
                  onChange={onChangePw}
                />
              </div>
              <Button
                children="로그인"
                active={isActive}
                width="100%"
                height="50px"
                clickEvt={loginClick}
              />
              <Button
                className="kakaoBtn"
                children="카카오 간편 로그인"
                active={true}
                width="100%"
                height="50px"
                front="#fee500"
                color="#333"
                clickEvt={kakaoLogin}
              />
              <Button
                children="회원가입"
                active={true}
                width="100%"
                height="50px"
                clickEvt={toJoin}
              />
            </div>
          </div>
        </div>
      </LoginComp>
      <Modal
        open={openModal}
        close={closeModal}
        header="로그인 실패"
        children={modalMsg}
      />
    </>
  );
};
export default Login;
