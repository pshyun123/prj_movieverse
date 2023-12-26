import { styled } from "styled-components";
import bgPc from "../../images/board_bg_pc.jpg";
import bgMo from "../../images/board_bg_mo.jpg";
const BoardComp = styled.section`
  width: 100%;
  height: 350px;
  background-image: url(${bgPc});
  background-size: cover;
  background-position: center bottom 15%;
  background-repeat: no-repeat;
  .wrapper {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    .container {
      text-align: center;
      .boardCategory {
        display: flex;
        padding-top: 20px;
        margin-bottom: 50px;
        li {
          font-size: 1.1em;
          position: relative;
          cursor: pointer;
          margin-left: 10px;
          color: var(--GREY);

          &:hover {
            color: var(--LIGHTVIO);
          }
          &.active {
            color: var(--LIGHTVIO);
            font-weight: 600;
          }
        }
      }
      .boardText {
        margin-bottom: 40px;
        h1 {
          font-size: 2.2em;
          font-weight: 600;
          padding-bottom: 40px;
        }
        p {
          font-size: 1.2em;
        }
      }
      .boardSearch {
        width: 100%;
        align-items: center;
        justify-content: center;
        display: flex;
        .inputBox {
          position: relative;
          width: 50%;
          input {
            text-align: center;
            border: none;
            outline: none;
            width: 100%;
            height: 40px;
            font-size: 0.8rem;
            border-radius: 5px;
          }
          .searchBox {
            position: absolute;
            top: 0px;
            right: 10px;
            padding: 10px;
            color: black;
            margin-left: -20px;
            cursor: pointer;
            svg {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    background-image: url(${bgMo});
    .wrapper {
      .container {
        .boardCategory {
        }
        .boardText {
        }
        .boardSearch {
          .inputBox {
            width: 80%;
          }
        }
      }
    }
  }
`;
export default BoardComp;
