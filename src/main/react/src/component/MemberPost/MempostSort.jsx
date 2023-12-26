import { styled } from "styled-components";
import { useState, useEffect } from "react";

/* 내 게시글\댓글 버튼*/
const MempostSortComp = styled.section`
  .container {
    height: 150px;
    text-align: center;

    /* outline: 1px solid red; */
  }

  button {
    padding-top: 130px;
    background: none;
    border: none;
    color: white;
    transition: 0.1s ease-in;
    font-size: 22px;
    font-weight: 600;

    &:hover {
      cursor: pointer;
    }
    &.recent {
      padding-left: 10px;
      margin-right: 5px;
    }
    &.selected {
      color: var(--LIGHTVIO);
    }
  }
`;

const MempostSort = ({ selType, setSelType }) => {
  return (
    <MempostSortComp>
      <div className="container">
        <button
          className={`written ${selType === "written" ? "selected" : ""}`}
          onClick={setSelType}
        >
          작성글
        </button>
        <button
          className={`comment ${selType === "comment" ? "selected" : ""}`}
          onClick={setSelType}
        >
          작성댓글
        </button>
      </div>
    </MempostSortComp>
  );
};

export default MempostSort;
