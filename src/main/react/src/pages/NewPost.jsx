import React, { useState, useEffect, useCallback } from "react";
import { storage } from "../api/firebase";
import Button from "../util/Button";
import { useNavigate } from "react-router-dom";
import face from "../images/faceIcon/faceIcon7.png";
import { NewPostComp, RadioBox } from "../component/NewPost/NewPostStyle";
import basicImg from "../images/congrats.png";
import Modal from "../util/Modal";
import MemberApi from "../api/MemberApi";
import Common from "../util/Common";
import BoardApi from "../api/BoardApi";

const NewPost = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [memberInfo, setMemberInfo] = useState(null);

  const fetchMemberDetail = async () => {
    const res = await MemberApi.getMemberDetail();
    if (res.data !== null) setMemberInfo(res.data);
  };

  // 카테고리 및 모임형식 관련
  const [selCategory, setSelCategory] = useState("");
  const [selGather, setSelGather] = useState("");

  const onCategoryChange = (e) => {
    setSelCategory(e.target.value);
  };
  const onGatherChange = (e) => {
    setSelGather(e.target.value);
  };

  const [inputTitle, setInputTitle] = useState("");
  const [inputContents, setInputContents] = useState("");
  const onInputTitleChange = (e) => {
    setInputTitle(e.target.value);
  };
  const onInputContentsChange = (e) => {
    setInputContents(e.target.value);
  };

  useEffect(() => {
    // console.log("Category : " + selCategory);
    // console.log("Gather : " + selGather);
    if (selCategory === "무비추천") setSelGather("");
  }, [selCategory, selGather]);

  useEffect(() => {
    console.log("title : " + inputTitle);
    console.log("contents : " + inputContents);
  }, [inputTitle, inputContents]);

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

    Common.handleTokenAxios(fetchMemberDetail); // 멤버 정보 가져옴
  }, []);

  // 게시판 리스트로 이동
  const navigate = useNavigate();
  const toGatherList = () => {
    navigate(-1);
  };

  // 이미지 업로드
  const [imgSrc, setImgSrc] = useState(basicImg);
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

  const onSubmit = () => {
    if (imgSrc !== basicImg) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      fileRef.put(file).then(() => {
        console.log("저장성공!");
        fileRef.getDownloadURL().then((url) => {
          console.log("저장경로 확인 : " + url);
          setUrl(url);
          console.log("url" + url);
          Common.handleTokenAxios(() => newPost(url));
        });
      });
    } else {
      Common.handleTokenAxios(newPost);
    }
  };

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
    }
  };

  // 등록하기 버튼 활성화
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const requiredData =
      inputTitle.length > 0 &&
      inputContents.length > 0 &&
      selCategory.length > 0 &&
      ((selCategory !== "무비추천" && selGather.length > 0) ||
        selGather.length === 0) &&
      (imgSrc !== basicImg || imgSrc.startsWith("blob:"));

    setIsActive(requiredData);
    console.log("이미지 데이터 : ", imgSrc);
  }, [inputTitle, inputContents, imgSrc, selCategory, selGather]);

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
                active={isActive}
                back="var(--BLUE)"
                clickEvt={onSubmit}
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
    </>
  );
};
export default NewPost;
