import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserStore";
import { useNavigate } from "react-router-dom";
import { storage } from "../api/firebase";
import basicProfile from "../images/faceIcon/faceIcon1.png";
import JoinComp from "../component/Join/JoinStyles";
import DaumPostPopup from "../api/DaumPost";
import AgreeCheck from "../component/Join/AgreeCheck";
import Modal from "../util/Modal";
import { Input, InputButton, Address } from "../component/Join/JoinInput";
import Button from "../util/Button";
import MemberApi from "../api/MemberApi";
import Common from "../util/Common";

const Join = ({ email, profile, kakaoId }) => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { setLoginStatus, loginStatus } = context;

  // 프로필 관련 ////////////////////////////////////////////////////
  const [imgSrc, setImgSrc] = useState(
    profile && profile ? profile : basicProfile
  );
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");

  // 입력받은 이미지 파일 주소
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files?.[0];

    // 선택된 파일이 있다면
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImgSrc(objectUrl);
      // 파이어베이스에 보내기위해 변수에 저장
      setFile(selectedFile);
    }
  };

  // 이미지 변경 확인 용
  // useEffect(() => {
  //   console.log("imgSrc : " + imgSrc);
  //   console.log("file : " + file.name);
  // }, [file]);
  ////////////////////////////////////////////////////////////////

  //모달/////////////////////////////////////////////////////////
  const [openModal, setModalOpen] = useState(false);
  const closeModal = (num) => {
    setModalOpen(false);
  };
  const [modalMsg, setModalMsg] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState(null);
  /////////////////////////////////////////////////////////////

  //키보드 입력
  const [inputEmail, setInputEmail] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputPw2, setInputPw2] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputAlias, setInputAlias] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  // 오류 메세지
  const [emailMessage, setEmailMessage] = useState("");
  const [codeMessage, setCodeMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [pw2Message, setPw2Message] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [aliasMessage, setAliasMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");

  // 유효성
  const [isEmail, setIsEmail] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isPw2, setIsPw2] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isAlias, setIsAlias] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isAddr, setIsAddr] = useState(false);
  const [isKakao, setIsKakao] = useState(false);

  // 정규식
  const regexList = [
    //email
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    //pw
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%_#^*?])[A-Za-z\d@$!%_#^*?]{8,15}$/,
    //phone
    /^\d{3}-\d{4}-\d{4}$/,
  ];
  //중복체크
  const isUnique = async (num, checkVal) => {
    const msgList = [setEmailMessage, setAliasMessage, setPhoneMessage];
    const validList = [setIsEmail, setIsAlias, setIsPhone];
    try {
      const res = await MemberApi.checkUnique(num, checkVal);
      console.log("중복여부 : " + !res.data);
      if (!res.data) {
        if (num === 0) {
          msgList[num]("사용 가능합니다. 인증을 해주세요.");
        } else msgList[num]("사용 가능합니다.");
        validList[num](true);
      } else {
        msgList[num]("이미 사용중입니다.");
        validList[num](false);
      }
    } catch (err) {
      console.log("중복오류 : " + err);
    }
  };

  // 이메일
  const onChangeEmail = (e) => {
    const currEmail = e.target.value;
    console.log("currr" + currEmail);
    setInputEmail(currEmail);
    if (!regexList[0].test(currEmail)) {
      setEmailMessage("잘못 된 형식입니다.");
      setIsEmail(false);
    } else {
      isUnique(0, currEmail);
    }
  };

  // 이메일 인증 번호 확인
  const [sentCode, setSentCode] = useState("");
  const onChangeEmailCode = (e) => {
    const currCode = Number(e.target.value);
    console.log("currr" + typeof currCode);
    console.log("sentCode: " + typeof sentCode);
    console.log("code : " + (currCode === sentCode));
    setInputCode(currCode);
  };

  // 이메일 인증
  const authorizeMail = async () => {
    try {
      const res = await MemberApi.sendEmailCode(inputEmail);
      console.log("이메일전송 결과 : " + res.data);
      if (res.data !== null) {
        setSentCode(res.data);
        setModalOpen(true);
        setModalMsg(
          "인증번호가 발송되었습니다.\n받은 메일함에 없는 경우 스팸메일함을 확인해주세요."
        );
        setModalHeader("확인");
      }
    } catch (e) {
      console.log("이메일 err : " + e);
    }
  };
  const checkCode = () => {
    if (inputCode === sentCode) {
      setIsCode(true);
      setCodeMessage("인증이 완료되었습니다.");
    } else {
      setIsCode(false);
      setCodeMessage("인증번호를 확인해주세요.");
    }
  };

  // 비밀번호
  const onChangePw = (e) => {
    const currPw = e.target.value;
    setInputPw(currPw);
    if (!regexList[1].test(currPw)) {
      setPwMessage(
        "대소문자, 숫자, 특수기호 포함 8자 이상 15자 이하로 입력 하세요"
      );
      setIsPw(false);
      setIsPw2(false);
      setPw2Message("");
    } else {
      setPwMessage("사용 가능합니다");
      setIsPw(true);
    }
  };
  // 비밀번호 재 입력
  const onChangePw2 = (e) => {
    const currPw2 = e.target.value;
    setInputPw2(currPw2);
    if (currPw2 !== inputPw) {
      setPw2Message("입력한 비밀번호와 일치 하지 않습니다.");
      setIsPw2(false);
    } else if (isPw && currPw2 === inputPw) {
      setPw2Message("비밀번호가 일치합니다");
      setIsPw2(true);
    }
  };

  // 이름
  const onChangeName = (e) => {
    const currName = e.target.value;
    setInputName(currName);
    if (currName.length < 2 || currName.length > 5) {
      setNameMessage("2자 이상 5자 이하로 입력하세요");
      setIsName(false);
    } else {
      setNameMessage("사용 가능합니다");
      setIsName(true);
    }
  };

  // 닉네임
  const onChangeAlias = (e) => {
    const currAlias = e.target.value;
    setInputAlias(currAlias);
    if (currAlias.length < 2 || currAlias.length > 8) {
      setAliasMessage("2자 이상 8자 이하로 입력하세요");
      setIsAlias(false);
    } else {
      isUnique(1, currAlias);
    }
  };
  const onChangePhone = (e) => {
    const currPhone = e.target.value;
    setInputPhone(currPhone);
    const regex = regexList[2];
    if (!regex.test(currPhone)) {
      setPhoneMessage("잘못 입력 하셨습니다.");
      setIsPhone(false);
    } else {
      isUnique(2, currPhone);
    }
  };

  // input값 변경 확인 용
  // useEffect(() => {
  //   console.log("email!");
  //   console.log("email : " + inputEmail);
  // }, [inputEmail]);

  //주소////////////////////////////////////////////////////////
  const [inputAddr, setInputAddr] = useState("");
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const openPostCode = () => {
    setIsPopUpOpen(true);
  };
  const closePostCode = () => {
    setIsPopUpOpen(false);
  };

  const setAddr = (addr) => {
    setInputAddr(addr);
    setIsAddr(true);
  };
  //////////////////////////////////////////////////////////

  // 약관 동의 //////////////////////////////////////////////////
  const [checkedAll, setCheckedAll] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const onCheckedChange = (checkboxNumber) => {
    switch (checkboxNumber) {
      case 1:
        setChecked1(!checked1);
        break;
      case 2:
        setChecked2(!checked2);
        break;
      default:
        // 전체약관동의 체크박스를 선택하면 나머지 두 개의 체크박스도 선택/해제되도록 설정
        setCheckedAll(!checkedAll);
        setChecked1(!checkedAll);
        setChecked2(!checkedAll);
        break;
    }
  };
  useEffect(() => {
    if (checked1 && checked2) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checked1, checked2]);
  /////////////////////////////////////////////////////////////////
  // 회원가입 /////////////////////////////////////////////////////
  const onSubmit = () => {
    if (imgSrc !== basicProfile && imgSrc !== profile) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      fileRef.put(file).then(() => {
        console.log("저장성공!");
        fileRef.getDownloadURL().then((url) => {
          console.log("저장경로 확인 : " + url);
          setUrl(url);
          addNewMember(url);
        });
      });
    } else {
      if (imgSrc === profile) {
        addNewMember(profile);
      } else {
        addNewMember();
      }
    }
  };

  const addNewMember = async (url) => {
    try {
      const res = await MemberApi.joinMember(
        inputEmail,
        inputPw2,
        inputName,
        inputAlias,
        inputPhone,
        inputAddr,
        url,
        isKakao
      );
      if (res.data !== null) {
        console.log("회원가입 성공!");
        setModalOpen(true);
        setModalHeader("회원가입");
        setModalMsg("회원가입에 성공했습니다!");
        setModalType("회원가입");
      }
    } catch (err) {
      console.log("회원가입 : " + err);
    }
  };
  // 로그인 상태 체크 + 첫 카카오 로그인 관련 처리
  useEffect(() => {
    if (loginStatus) {
      navigate("/");
    }
    if (email) {
      setInputEmail(email);
      setIsCode(true);
      setInputPw2(kakaoId);
      setIsPw2(true);
      setIsKakao(true);
    }
  }, []);
  // 로그인 처리
  const kakaoLogin = async () => {
    console.log("카카오 로그인!");
    try {
      const res = await MemberApi.login(email, kakaoId);
      console.log(res.data);
      if (res.data.grantType === "Bearer") {
        console.log("KL accessToken : " + res.data.accessToken);
        console.log("KL refreshToken : " + res.data.refreshToken);
        Common.setAccessToken(res.data.accessToken);
        Common.setRefreshToken(res.data.refreshToken);
        setLoginStatus(true);
        navigate("/");
      }
    } catch (err) {
      console.log("로그인 에러 : " + err);
    }
  };

  return (
    <>
      <JoinComp>
        <div className="container">
          <h2>회원가입</h2>
          {/* 프로필 이미지 */}
          <div className="profile">
            <div className="imgBox">
              <img src={imgSrc} alt="프로필이미지" />
            </div>
            <label>
              <input type="file" onChange={(e) => handleFileInputChange(e)} />
              파일 선택
            </label>
          </div>
          {/* 인풋 영역 */}
          <div className="inputArea">
            {/* 첫 카카오 로그인 회원가입 : 일반 회원 가입 */}
            {email ? (
              <Input value={email} disabled={true} />
            ) : (
              <>
                <InputButton
                  holder="이메일 입력"
                  value={inputEmail}
                  changeEvt={onChangeEmail}
                  btnChild="인증하기"
                  active={isEmail}
                  clickEvt={authorizeMail}
                  msg={emailMessage}
                  msgType={isEmail}
                />
                <InputButton
                  holder="인증번호를 입력하세요"
                  value={inputCode}
                  changeEvt={onChangeEmailCode}
                  btnChild="확인"
                  active={isEmail}
                  clickEvt={checkCode}
                  msg={codeMessage}
                  msgType={isCode}
                />
                <Input
                  holder="비밀번호"
                  value={inputPw}
                  type="password"
                  msg={pwMessage}
                  msgType={isPw}
                  changeEvt={onChangePw}
                />
                <Input
                  holder="비밀번호 다시 입력"
                  value={inputPw2}
                  type="password"
                  msg={pw2Message}
                  msgType={isPw2}
                  changeEvt={onChangePw2}
                />
              </>
            )}
            <Input
              holder="이름"
              value={inputName}
              msg={nameMessage}
              msgType={isName}
              changeEvt={onChangeName}
            />
            <Input
              holder="닉네임"
              value={inputAlias}
              msg={aliasMessage}
              msgType={isAlias}
              changeEvt={onChangeAlias}
            />
            <Input
              holder="전화번호 '-' 포함 입력하세요"
              value={inputPhone}
              msg={phoneMessage}
              msgType={isPhone}
              changeEvt={onChangePhone}
            />
            {/* 주소 */}
            <Address value={inputAddr} open={openPostCode} />
            {isPopUpOpen && (
              <DaumPostPopup
                onClose={closePostCode}
                setAddr={setAddr}
                open={isPopUpOpen}
              />
            )}

            {/* 약관동의 */}
            <div className="agreementBox">
              <AgreeCheck
                className="all"
                agreeAll={true}
                children="전체 약관동의"
                checked={checkedAll}
                onCheckedChange={() => onCheckedChange()}
              />
              <AgreeCheck
                children="[필수] 서비스 이용약관 동의"
                checked={checked1}
                onCheckedChange={() => onCheckedChange(1)}
                modalType="use"
              />
              <AgreeCheck
                children="[필수] 개인정보 수집 및 이용 동의"
                checked={checked2}
                onCheckedChange={() => onCheckedChange(2)}
                modalType="privacy"
              />
            </div>

            {/* 회원가입 */}
            <Button
              children={"회원가입"}
              width="100%"
              height="60px"
              active={
                isCode &&
                isPw2 &&
                isName & isAlias &&
                isPhone &&
                isAddr &&
                checkedAll
              }
              clickEvt={onSubmit}
            />
          </div>
        </div>
      </JoinComp>
      <Modal
        open={openModal}
        close={closeModal}
        header={modalHeader}
        children={modalMsg}
        type={modalType}
        confirm={() => {
          if (email) {
            kakaoLogin();
          } else {
            navigate("/login");
          }
        }}
      />
    </>
  );
};
export default Join;
