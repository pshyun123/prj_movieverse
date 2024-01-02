import React, { useState, useEffect, useCallback } from "react";
import { storage } from "../api/firebase";
import Button from "../util/Button";
import { useNavigate } from "react-router-dom";
import face from "../images/faceIcon/faceIcon7.png";
import { NewPostComp, RadioBox } from "../component/NewPost/NewPostStyle";
import basicImg from "../images/congrats.png";
import Modal from "../util/Modal";
import MemberApi from "../api/MemberApi";
import BoardApi from "../api/BoardApi";
import useTokenAxios from "../hooks/useTokenAxios";

const NewPost = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [memberInfo, setMemberInfo] = useState(null);

  const fetchMemberDetail = async () => {
    const res = await MemberApi.getMemberDetail();
    if (res.data !== null) setMemberInfo(res.data);
  };
  const getMemberDetail = useTokenAxios(fetchMemberDetail);

  // 카테고리 및 모임형식 관련
  const [selCategory, setSelCategory] = useState("");
  const [selGather, setSelGather] = useState("");
  const [isCategory, setIsCategory] = useState("");
  const [isGather, setIsGather] = useState("");

  const onCategoryChange = (e) => {
    const currVal = e.target.value;
    setSelCategory(currVal);
    if (currVal !== "") {
      setIsCategory(true);
      if (currVal === "무비추천") setIsGather(true);
    }
    if (currVal !== "무비추천" && selGather === "") {
      setIsGather(false);
    }
  };
  const onGatherChange = (e) => {
    const currVal = e.target.value;
    setSelGather(currVal);
    if (currVal === "" && selCategory !== "무비추천") {
      setIsGather(false);
    } else if (currVal !== "" && selCategory !== "무비추천") {
      setIsGather(true);
    }
  };

  const [inputTitle, setInputTitle] = useState("");
  const [inputContents, setInputContents] = useState("");
  const [isTitle, setIsTitle] = useState("");
  const [isContents, setIsContents] = useState("");

  const onInputTitleChange = (e) => {
    const currVal = e.target.value;
    setInputTitle(currVal);
    if (currVal.length > 0) setIsTitle(true);
    else setIsTitle(false);
  };
  const onInputContentsChange = (e) => {
    const currVal = e.target.value;
    setInputContents(currVal);
    if (currVal.length > 0) setIsContents(true);
    else setIsContents(false);
  };

  useEffect(() => {
    // console.log("Category : " + selCategory);
    // console.log("Gather : " + selGather);
    if (selCategory === "무비추천") setSelGather("");
  }, [selCategory, selGather]);

  // useEffect(() => {
  //   console.log("title : " + inputTitle);
  //   console.log("contents : " + inputContents);
  // }, [inputTitle, inputContents]);

  //날짜
  useEffect(() => {
    const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      return `${year}.${month}.${day}`;
    };

    setCurrentDate(getCurrentDate());

    getMemberDetail(); // 멤버 정보 가져옴
  }, []);

  // 게시판 리스트로 이동
  const navigate = useNavigate();
  const toGatherList = () => {
    navigate(-1);
  };

  // 이미지 업로드
  const [imgSrc, setImgSrc] = useState(basicImg);
  const [file, setFile] = useState("");
  const [isImage, setIsImage] = useState(false);

  // 입력받은 이미지 파일 주소
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files?.[0];

    // 선택된 파일이 있다면
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImgSrc(objectUrl);
      // 파이어베이스에 보내기위해 변수에 저장
      setFile(selectedFile);
      setIsImage(true);
    }
  };

  // 모달
  const [openModal, setModalOpen] = useState(false);
  const closeModal = (num) => {
    setModalOpen(false);
    switch (selCategory) {
      case "무비모임":
        navigate("/board/gather");
        break;
      case "모임후기":
        navigate("/board/recap");
        break;
      case "무비추천":
        navigate("/board/recs");
        break;
      default:
        console.log("카테고리 오류");
    }
  };
  const [modalMsg, setModalMsg] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState(null);

  const handleModal = (header, msg, type) => {
    setModalOpen(true);
    setModalHeader(header);
    setModalMsg(msg);
    setModalType(type);
  };

  const onSubmit = () => {
    if (imgSrc !== basicImg) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      fileRef.put(file).then(() => {
        // console.log("저장성공!");
        fileRef.getDownloadURL().then((url) => {
          // console.log("저장경로 확인 : " + url);
          // console.log("url" + url);
          newPost(url);
        });
      });
    } else {
      newPost();
    }
  };
  const clickSave = useTokenAxios(onSubmit);

  const newPost = async (url) => {
    const res = await BoardApi.saveNewPost(
      selCategory,
      selGather,
      inputTitle,
      url,
      inputContents
    );
    if (res.data) {
      console.log("저장 성공!");
      handleModal("성공", "등록이 완료 되었습니다.", false);
    }
  };

  return (
    <>
      <NewPostComp>
        <div className="container">
          <div className="bubbleArea">
            <img className="faceIcon" src={face} alt="Icon" />
            <div className="bubbleText">
              <h2>게시글을 등록해 볼까요?</h2>
              <p>
                무비 모임을 열어서 함께 영화도 보고, 모임 후기도 남겨보세요!
              </p>
              <p>
                나의 인생 영화, 추천 영화도 공유하며 새로운 취향도 찾아보아요~
              </p>
            </div>
          </div>
          <div className="postBox">
            <div className="selectBoard">
              <h3>게시판 선택</h3>
              <RadioBox>
                {/* name 부분이 같아야 함 */}
                <div className="boardSelectBtn">
                  <label className="boardLable1" htmlFor="btn1">
                    <input
                      type="radio"
                      id="무비모임"
                      value="무비모임"
                      name="category"
                      onChange={onCategoryChange}
                    />
                    무비모임
                  </label>
                  <label className="boardLable2" htmlFor="btn2">
                    <input
                      type="radio"
                      id="모임후기"
                      value="모임후기"
                      name="category"
                      onChange={onCategoryChange}
                    />
                    모임후기
                  </label>
                  <label className="boardLable3" htmlFor="btn3">
                    <input
                      type="radio"
                      id="무비추천"
                      value="무비추천"
                      name="category"
                      onChange={onCategoryChange}
                    />
                    무비추천
                  </label>
                </div>
              </RadioBox>
            </div>
            <div className="meetingMethod">
              <h3>장 소</h3>
              <RadioBox>
                <div className="placeSelectBtn">
                  <label className="placeLable1" htmlFor="btn1">
                    <input
                      type="radio"
                      id="온라인"
                      value="온라인"
                      name="gather"
                      onChange={onGatherChange}
                      disabled={selCategory === "무비추천" ? true : false}
                    />
                    온라인
                  </label>
                  <label className="placeLable2" htmlFor="btn2">
                    <input
                      type="radio"
                      id="오프라인"
                      value="오프라인"
                      name="gather"
                      onChange={onGatherChange}
                      disabled={selCategory === "무비추천" ? true : false}
                    />
                    오프라인
                  </label>
                </div>
              </RadioBox>
            </div>
            <div className="writer">
              <h3>작성자</h3>
              <p>{memberInfo && memberInfo.alias}</p>
            </div>
            <div className="uploadDate">
              <h3>작성일</h3>
              <p>{currentDate}</p>
            </div>
            <div className="postTitle">
              <h3>제 목</h3>
              <textarea
                type="text"
                value={inputTitle}
                placeholder="제목을 입력해주세요"
                onChange={onInputTitleChange}
              ></textarea>
            </div>
            <div className="uploadImg">
              <h3>이미지</h3>
              <div className="boardImg">
                <div className="imgBox">
                  <img src={imgSrc} alt="게시글 내용 이미지" />
                </div>
                <label>
                  <input
                    type="file"
                    onChange={(e) => handleFileInputChange(e)}
                  />
                  파일 선택
                </label>
              </div>
            </div>
            <div className="contents">
              <h3>내 용</h3>
              <textarea
                type="text"
                value={inputContents}
                placeholder="내용을 입력해주세요"
                onChange={onInputContentsChange}
              ></textarea>
            </div>
            <div className="buttonBox">
              <Button
                children="등록하기"
                active={
                  isCategory && isGather && isTitle && isContents && isImage
                }
                back="var(--BLUE)"
                clickEvt={clickSave}
              />
              <Button
                children="목록보기"
                active={true}
                front="var(--VIOLET)"
                back="var(--BLUE)"
                clickEvt={toGatherList}
              />
            </div>
          </div>
        </div>
      </NewPostComp>
      <Modal
        open={openModal}
        close={closeModal}
        header={modalHeader}
        children={modalMsg}
        type={modalType}
      />
    </>
  );
};
export default NewPost;
