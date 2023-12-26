import { styled } from "styled-components";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  PaginationComp,
  ButtonStyle,
  PageWrapper,
  PageButton,
} from "./PaginationStyle";
import {
  faAnglesLeft,
  faAngleLeft,
  faAngleRight,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

const PaginationUtil = ({ totalPage, limit, page, setPage }) => {
  const [currentPageArray, setCurrentPageArray] = useState([]);
  const [totalPageArray, setTotalPageArray] = useState([]);

  useEffect(() => {
    if (page % limit === 1) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
    } else if (page % limit === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
    }
  }, [page]);

  useEffect(() => {
    // totalPage를 limit에 따라 나눈 배열을 생성
    const slicedPageArray = sliceArrayByLimit(totalPage, limit);
    // 나눈 배열을 상태로 설정
    setTotalPageArray(slicedPageArray);
    // 현재 페이지 배열을 첫 번째 페이지 배열로 설정
    setCurrentPageArray(slicedPageArray[0]);
  }, [totalPage]);

  const sliceArrayByLimit = (totalPage, limit) => {
    // 0부터 (totalPage-1)까지의 원소를 갖는 배열을 생성
    const totalPageArray = Array(totalPage)
      .fill()
      .map((_, i) => i); //  콜백 함수는 i (인덱스) 매개변수만 사용하고 현재 요소를 무시
    // 현재 요소가 의도적으로 무시된다는 것을 나타내기 위해 언더스코어(_)가 사용됨

    // 제한된 크기로 나눈 배열을 생성하여 반환
    return Array(Math.ceil(totalPage / limit))
      .fill()
      .map(() => totalPageArray.splice(0, limit));
  };

  const handleToFirst = () => {
    if (totalPageArray.length > 0) {
      setPage(totalPageArray[0][0] + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const handleToLast = () => {
    if (totalPageArray.length > 0) {
      const lastPageArray = totalPageArray[totalPageArray.length - 1];
      setPage(lastPageArray[lastPageArray.length - 1] + 1);
    }
  };

  return (
    <>
      <PaginationComp>
        {/* 맨 처음 버튼, 이전 버튼 */}
        <ButtonStyle className="toFirst" onClick={handleToFirst}>
          <FontAwesomeIcon icon={faAnglesLeft} />
        </ButtonStyle>
        <ButtonStyle className="prev" onClick={handlePrev}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </ButtonStyle>
        {/* 숫자 버튼 */}
        <PageWrapper>
          {currentPageArray?.map((i) => (
            <PageButton
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
              $isActive={page === i + 1}
            >
              {i + 1}
            </PageButton>
          ))}
        </PageWrapper>
        {/* 다음 버튼, 맨 끝 버튼 */}
        <ButtonStyle className="next" onClick={handleNext}>
          <FontAwesomeIcon icon={faAngleRight} />
        </ButtonStyle>
        <ButtonStyle className="toLast" onClick={handleToLast}>
          <FontAwesomeIcon icon={faAnglesRight} />
        </ButtonStyle>
      </PaginationComp>
    </>
  );
};
export default PaginationUtil;
