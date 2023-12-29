import { styled } from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import Button from "../../../util/Button";
import basicProfile from "../../../images/faceIcon/faceIcon1.png";

const TrComp = styled.tr`
  vertical-align: middle;
  td {
    padding: 10px;
    vertical-align: middle;
    &.center {
      text-align: center;
    }
    &.profile {
      .wrapper {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .imgBox {
          width: 30px;
          padding-bottom: 30px;
          position: relative;
          border-radius: 100%;
          overflow: hidden;
          background-color: var(--GREY);
          img {
            position: absolute;
            width: 100%;
          }
          margin-right: 10px;
        }
        span {
        }
      }
    }
    &.selectBox {
      select {
        &:disabled {
          opacity: 1;
        }
        outline: none;
        border: none;
        padding: 6px;
        font-weight: 600;
        option {
        }
      }
    }
  }
`;

const Tr = ({ data, index, revise, setRevise, clickOk, clickDel, editId }) => {
  const [confirmRevise, setConfirmRevise] = useState(false);
  const [categorySel, setCategorySel] = useState(data.categoryName);
  const [categoryActive, setCategoryActive] = useState(true);
  const [typeSel, setTypeSel] = useState(data.gatherType);
  const [gatherActive, setGatherActive] = useState(true);

  const toDate = new Date(data.regDate);
  const regDate = toDate.toISOString().split("T")[0];

  console.log("TR" + data.id + "업데이트 되는 중");

  useEffect(() => {
    console.log("TR" + data.id + "마운트 되는 중");
  }, []);

  // 첫 렌더링(마운트) 상태 여부
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (!isInitialRender.current) {
      if (categorySel === "무비추천") {
        setTypeSel("sel");
        setGatherActive(true);
        console.log("TR" + data.id + "카테고리 무비추천");
      }
    } else {
      isInitialRender.current = false;
    }
  }, [categorySel, typeSel]);

  useEffect(() => {
    if (revise === true || revise === "back") {
      console.log("TR" + data.id + "revise 영향");
      setConfirmRevise(false);
      setRevise(false);
      setCategoryActive(true);
      setGatherActive(true);
      if (revise === "back") {
        setCategorySel(data.categoryName);
        setTypeSel(data.gatherType);
      }
    }
  }, [revise]);

  // 수정 버튼 클릭
  const clickRevise = () => {
    setCategoryActive(false);
    if (categorySel !== "영화추천" && categorySel !== "sel")
      setGatherActive(false);
    setConfirmRevise(true);
  };

  // 대분류 변경
  const onChangeCategory = (e) => {
    setCategorySel(e.target.value);
    if (e.target.value !== "무비추천") {
      setGatherActive(false);
      if (data.gatherType === "") {
        setTypeSel("오프라인");
      } else
        setTypeSel((prevType) => (prevType === "sel" ? "오프라인" : prevType));
    }
  };

  // 소분류 변경
  const onChangeType = (e) => {
    setTypeSel(e.target.value);
  };

  return (
    <TrComp>
      {/* 숫자 자동증가 */}
      <td className="center">{index + 1}</td>
      <td className="profile">
        <span className="wrapper">
          <span className="imgBox">
            <img
              src={data.memberImage ? data.memberImage : basicProfile}
              alt="profile"
            />
          </span>
          <span>{data.alias}</span>
        </span>
      </td>
      <td>{data.title}</td>
      <td className="center">{data.count}</td>
      <td className="center">{regDate}</td>
      {/* 셀렉트 들어갈 예정 */}
      <td className="selectBox">
        <select
          name="category"
          disabled={categoryActive}
          value={categorySel}
          onChange={onChangeCategory}
        >
          <option value="sel" hidden>
            선택
          </option>
          <option value="무비모임">무비모임</option>
          <option value="모임후기">모임후기</option>
          <option value="무비추천">무비추천</option>
        </select>
      </td>
      {/* 셀렉트 들어갈 예정 */}
      <td className="selectBox">
        <select
          name="gather"
          disabled={gatherActive}
          value={typeSel}
          onChange={onChangeType}
        >
          <option value="sel" hidden>
            선택
          </option>
          <option value="오프라인">오프라인</option>
          <option value="온라인">온라인</option>
        </select>
      </td>
      <td>
        {confirmRevise ? (
          <Button
            children={"확인"}
            back="var(--MIDBLUE)"
            front="var(--BLUE)"
            fontSize=".8em"
            width="80px"
            height="30px"
            active={true}
            clickEvt={() => {
              clickOk(categorySel, typeSel, data.id);
            }}
          />
        ) : (
          <Button
            children={"수정"}
            back="var(--BLUE)"
            fontSize=".8em"
            width="80px"
            height="30px"
            active={true}
            clickEvt={clickRevise}
          />
        )}
      </td>
      <td>
        <Button
          children={"삭제"}
          front="var(--GREY)"
          back="var(--BLUE)"
          fontSize=".8em"
          width="80px"
          height="30px"
          active={true}
          clickEvt={() => clickDel(data.id)}
        />
      </td>
    </TrComp>
  );
};

const MemoizedTr = React.memo(Tr, (prevProps, nextProps) => {
  const isTargetTr = prevProps.data.id === nextProps.editId;

  return (
    (isTargetTr && prevProps.revise === nextProps.revise) ||
    (!isTargetTr &&
      prevProps.confirmRevise === nextProps.confirmRevise &&
      prevProps.categorySel === nextProps.categorySel &&
      prevProps.typeSel === nextProps.typeSel &&
      prevProps.categoryActive === nextProps.categoryActive &&
      prevProps.gatherActive === nextProps.gatherActive &&
      prevProps.data.id === nextProps.data.id)
  );
});

export default MemoizedTr;
