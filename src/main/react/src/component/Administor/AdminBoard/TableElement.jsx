import { styled } from "styled-components";
import { useState, useEffect } from "react";
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

const Tr = ({
  data,
  index,
  handleModal,
  setEditCategory,
  setEditType,
  setEditId,
  revise,
  setRevise,
}) => {
  const [confirmRevise, setConfirmRevise] = useState(false);
  const [categorySel, setCategorySel] = useState(data.categoryName);
  const [categoryActive, setCategoryActive] = useState(true);
  const [typeSel, setTypeSel] = useState(data.gatherType);
  const [gatherActive, setGatherActive] = useState(true);

  const toDate = new Date(data.regDate);
  const regDate = toDate.toISOString().split("T")[0];

  useEffect(() => {
    // console.log("Category : " + selCategory);
    // console.log("Gather : " + selGather);
    if (categorySel === "무비추천") {
      setTypeSel("sel");
      setGatherActive(true);
    }
  }, [categorySel, typeSel]);
  useEffect(() => {
    setConfirmRevise(false);
    setRevise(false);
    setCategoryActive(true);
    setGatherActive(true);
    if (revise === "back") {
      setCategorySel(data.categoryName);
      setTypeSel(data.gatherType);
    }
  }, [revise]);

  const clickRevise = () => {
    setCategoryActive(false);
    if (categorySel !== "영화추천" && categorySel !== "sel")
      setGatherActive(false);
    setConfirmRevise(true);
  };

  const onChangeCategory = (e) => {
    setCategorySel(e.target.value);
    if (e.target.value !== "무비추천") {
      setGatherActive(false);
      if (data.gatherType === "") {
        setTypeSel("오프라인");
      } else setTypeSel(data.gatherType);
    }
  };
  const onChangeType = (e) => {
    setTypeSel(e.target.value);
  };

  const clickOk = () => {
    handleModal("확인", "수정하시겠습니까?", true, 0);
    setEditCategory(categorySel);
    if (categorySel === "무비추천") {
      setEditType("");
    } else {
      setEditType(typeSel);
    }
    setEditId(data.id);
  };

  const clickDel = () => {
    handleModal("삭제", "삭제하시겠습니까?", true, 1);
    setEditId(data.id);
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
            clickEvt={clickOk}
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
          clickEvt={clickDel}
        />
      </td>
    </TrComp>
  );
};
export default Tr;
