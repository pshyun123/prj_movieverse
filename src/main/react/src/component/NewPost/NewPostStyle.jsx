import styled from "styled-components";
// 새 글 작성 전체////////////////////////////
export const NewPostComp = styled.section`
  background-color: white;
  .container {
    padding: 5%;
    // 말풍선
    .bubbleArea {
      /* border: 1px solid red; */
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
      img {
        width: 120px;
        height: 120px;
        margin-right: 50px;
      }
      .bubbleText {
        position: relative;
        background: var(--GREY);
        border-radius: 20px;
        padding: 20px 30px;
        width: 100%;
        height: 120px;
        h2 {
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--VIOLET);
          margin-bottom: 10px;
        }
        p {
          font-size: 1.1rem;
          color: black;
          margin-bottom: 5px;
        }
        :after {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          width: 0;
          height: 0;
          border: 27px solid transparent;
          border-right-color: var(--GREY);
          border-left: 0;
          border-top: 0;
          margin-top: -13.5px;
          margin-left: -27px;
        }
      }
    }
    // 새 글 작성
    .postBox {
      width: 100%;
      border: 1px solid var(--GREY);
      border-radius: 10px;
      margin-top: 10px;
      padding: 40px;
      .selectBoard {
        h3 {
          color: var(--VIOLET);
          font-weight: 600;
          font-size: 1.4rem;
        }
      }
      .meetingMethod {
        h3 {
          color: var(--VIOLET);
          font-weight: 600;
          font-size: 1.4rem;
          letter-spacing: 8px; // 자간 조정
        }
      }
      .writer,
      .uploadDate,
      .postTitle,
      .uploadImg,
      .contents {
        display: flex;
        margin-bottom: 20px;

        h3 {
          color: var(--VIOLET);
          font-weight: 600;
          font-size: 1.4rem;
          width: 100px;
        }
        p {
          color: black;
          font-size: 1.2rem;
        }
      }
      .postTitle,
      .contents {
        textarea {
          width: 90%;
          border-radius: 10px;
          padding: 10px;
          font-size: 1.1rem;
          resize: none;
        }
        h3 {
          letter-spacing: 8px;
        }
      }
      .boardImg {
        width: 100%;
        margin-bottom: 30px;

        .imgBox {
          position: relative;
          width: 20%;
          padding-bottom: 20%;
          margin-bottom: 15px;
          border-radius: 5%;
          background-color: var(--GREY);
          overflow: hidden;
          img {
            position: absolute;
            width: 100%;
            height: 100%;
          }
          @media only screen and (max-width: 768px) {
            width: 30%;
            padding-bottom: 30%;
          }
        }
        label {
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 0.8em;
          font-weight: 600;
          cursor: pointer;
          background-color: var(--LIGHTVIO);
          transition: 0.3s ease-out;
          &:hover {
            background-color: var(--VIOLET);
            color: white;
          }
        }
        input {
          display: none;
        }
      }
      .contents {
        /* display: flex; */
        flex-direction: column;
        width: 100%;

        textarea {
          width: 100%;
          height: 400px;
          border-radius: 10px;
          padding: 10px;
          font-size: 1.1rem;
          margin-top: 15px;
          resize: none;
        }
      }
      .buttonBox {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        Button {
          margin: 20px 20px 0 20px;
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .container {
      padding: 2%;
      // 말풍선
      .bubbleArea {
        margin-bottom: 10px;
        img {
          width: 100px;
          height: 100px;
          margin-right: 30px;
        }
        .bubbleText {
          padding: 15px;
          width: 100%;
          h2 {
            font-size: 1.2rem;
          }
          p {
            font-size: 0.9rem;
          }
          :after {
            margin-left: -20px;
          }
        }
      }
      // 새 글 작성
      .postBox {
        padding: 20px;
        .selectBoard {
          h3 {
            font-size: 1.1rem;
          }
        }
        .meetingMethod {
          h3 {
            font-size: 1.1rem;
            letter-spacing: 6px; // 자간 조정
          }
        }
        .writer,
        .uploadDate,
        .postTitle,
        .uploadImg,
        .contents {
          margin-bottom: 15px;
          h3 {
            font-size: 1.1rem;
            width: 80px;
          }
          p {
            font-size: 0.9rem;
          }
        }
        .postTitle,
        .contents {
          textarea {
            width: 80%;
            padding: 8px;
            font-size: 0.9rem;
          }
          h3 {
            letter-spacing: 6px;
          }
        }
        .boardImg {
          width: 80%;
          margin-bottom: 10px;

          .imgBox {
            width: 30%;
            padding-bottom: 30%;
          }
        }
        .contents {
          textarea {
            width: 100%;
            height: 300px;
            padding: 8px;
            font-size: 0.9rem;
            margin-top: 10px;
          }
        }
        .buttonBox {
          Button {
            margin: 0 20px;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .container {
      .bubbleArea {
        .bubbleText {
          h2 {
            font-size: 1.3em;
          }
          p {
            font-size: 1em;
            line-height: 1.4;
          }
        }
      }
    }
    .postBox {
      .selectBoard {
      }
    }
  }
`;
// 라디오 버튼 스타일 ////////////////////////
export const RadioBox = styled.div`
  padding: 20px 0;

  .boardSelectBtn {
    display: flex;
    width: 100%;
    /* outline: 1px solid red; */
    .boardLable1 {
      background-color: var(--LIGHTVIO);
    }
    .boardLable2 {
      background-color: var(--VIOLET);
    }
    .boardLable3 {
      background-color: var(--BLUE);
    }
    label {
      padding: 10px 15px;
      cursor: pointer;
      border-radius: 2rem;
      font-size: 1rem;
      font-weight: 600;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      word-break: keep-all;
      margin-right: 20px;
      accent-color: var(--LIGHTVIO);

      /* 체크박스를 라벨 내에 위치 */
      input[type="radio"] {
        margin: 0 8px 0 0;
      }
    }
  }
  .placeSelectBtn {
    display: flex;
    width: 100%;
    .placeLable1 {
      background-color: var(--BLUE);
    }

    .placeLable2 {
      background-color: var(--MIDBLUE);
    }
    label {
      padding: 10px 15px;
      cursor: pointer;
      border-radius: 2rem;
      font-size: 1rem;
      font-weight: 600;
      color: white;
      display: flex;
      word-break: keep-all;
      margin-right: 20px;
      justify-content: center;
      align-items: center;
      accent-color: var(--LIGHTVIO);

      /* 체크박스를 라벨 내에 위치 */
      input[type="radio"] {
        margin: 0 8px 0 0;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .boardSelectBtn {
      label {
        font-size: 0.8rem;
      }
    }
    .placeSelectBtn {
      label {
        font-size: 0.8rem;
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .boardSelectBtn {
      label {
        padding: 6px 10px;
        font-size: 0.8rem;
        margin-right: 5px;
      }
    }
    .placeSelectBtn {
      label {
        padding: 8px 12px;
        font-size: 0.8rem;
      }
    }
  }
`;
