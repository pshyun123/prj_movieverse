import { styled } from "styled-components";
const BoardCardStyle = styled.section`
  .container {
    .boardCardBox {
      padding-top: 90px;
      margin-bottom: 50px;
      .gatherTypeList {
        margin-bottom: 20px;
      }
      .sortArea {
        display: flex;
        font-weight: 600;
        font-size: 0.9rem;
        margin-bottom: 60px;
        justify-content: flex-end;
        li {
          position: relative;
          cursor: pointer;
          color: var(--GREY);
          font-size: 1.1em;
          &.active {
            color: var(--LIGHTVIO);
          }
          margin-left: 24px;
          &:last-child {
            &::after {
              content: "";
              width: 2px;
              height: 100%;
              background-color: var(--GREY);
              position: absolute;
              top: 1px;
              left: -11px;
            }
          }
        }
      }
      .boardMap {
        margin-bottom: 80px;
      }
      .newPostBtn {
        margin-bottom: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

export default BoardCardStyle;
