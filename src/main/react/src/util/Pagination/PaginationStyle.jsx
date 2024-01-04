import { styled } from "styled-components";

// 페이지네이션 전체 감싸는 부분
export const PaginationComp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

// 맨처음, 이전, 다음, 맨 끝 버튼 모두 적용되는 것
export const ButtonStyle = styled.button`
  background-color: transparent;
  border: 0;
  color: var(--GREY);
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    color: var(--LIGHTVIO);
  }
  @media only screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;
export const PageWrapper = styled.div``;

// 페이지 숫자 버튼
export const PageButton = styled.button`
  background-color: transparent;
  border: 0;
  color: var(--GREY);
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  @media only screen and (max-width: 480px) {
    font-size: 1rem;
  }
  ${({ $isActive }) =>
    $isActive &&
    `
    color: var(--LIGHTVIO);
  `}
`;
