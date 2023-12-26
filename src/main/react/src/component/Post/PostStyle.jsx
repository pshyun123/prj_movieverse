import styled from "styled-components";

export const PostComp = styled.section`
  .container {
    background-color: white;
    padding: 3%;
    border-radius: 5px;

    .titleBox {
      width: 100%;
      border-bottom: 1px solid var(--GREY);
      display: flex;
      /* justify-content: center; */
      align-items: center;
      padding-bottom: 30px;
      position: relative;

      .memIconArea {
        width: 15%;
        text-align: center;
        .imgBox {
          width: 100%;
          padding-bottom: 100%;
          position: relative;
          border-radius: 50%;
          overflow: hidden;
          background-color: var(--VIOLET);
          img {
            object-fit: cover;
            left: 0;
            width: 100%;
            height: 100%;
            position: absolute;
          }
        }
        p {
          color: black;
          margin-top: 5px;
        }
      }
      .titleElements {
        width: 90%;
        margin-left: 30px;
        /* padding: 30px 0; */
        .topElements {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          .selectedBox {
            width: 40%;
            height: 30px;
            display: flex;
            text-align: center;

            .boardType {
              width: 100px;
              height: 30px;
              background-color: var(--LIGHTVIO);
              border-radius: 15px;
              margin-right: 5px;
              padding: 5px;

              p {
                font-weight: 600;
              }
            }
            .placeType {
              width: 100px;
              height: 30px;
              background-color: var(--BLUE);
              border-radius: 15px;
              padding: 5px;
              p {
                font-weight: 600;
              }
            }
          }
        }
        .uploadedDate {
          color: var(--GREY);
        }
        h3 {
          color: #333;
        }
      }
      .count {
        position: absolute;
        bottom: 20px;
        right: 0;
        color: #333;
      }
    }
    .contentsBox {
      /* border: 1px solid red; */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 5%;
      .introduce {
        width: 90%;
        img {
          width: 100%;
          border-radius: 10px;
        }
        .contentsText {
          width: 100%;
          margin: 40px 0;
          color: #333;
          line-height: 1.5;
          font-size: 1.2rem;
          font-weight: 300;
          white-space: pre-wrap;
          @media only screen and (max-width: 768px) {
            font-size: 1rem;
          }
        }
      }
      .buttonBox {
        display: flex;
        button {
          &:first-child {
            margin-right: 20px;
          }
        }
      }
    }
    .commentArea {
      h3 {
        color: var(--VIOLET);
        font-weight: 600;
        margin-bottom: 10px;
      }
      .commentList {
        /* border: 1px solid red; */

        .commentBox {
          /* border: 1px solid blue; */
          border-top: 1px solid var(--GREY);
          border-bottom: 1px solid var(--GREY);
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 5px;
          .iconArea {
            width: 10%;
            .imgBox {
              width: 100%;
              padding-bottom: 100%;
              position: relative;
              border-radius: 50%;
              overflow: hidden;
              background-color: var(--VIOLET);
              img {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
              }
            }
          }
          .textArea {
            /* border: 1px solid orange; */
            width: 60%;
            padding: 2%;
            line-height: 1.4;

            .nickName {
              color: var(--VIOLET);
              font-weight: 600;
              font-size: 1.3rem;
              margin-bottom: 15px;
            }
            .commentText {
              color: black;
              font-size: 1.2rem;
            }
          }
          .rightArea {
            width: 20%;
            padding: 2%;
            /* border: 1px solid blue; */
            .writeDate {
              color: var(--GREY);
              margin-bottom: 20px;
              text-align: right;
            }
            .editBtnBox {
              /* outline: 1px solid red; */
              display: flex;
              justify-content: end;
              Button {
                margin-left: 10px;
              }
            }
          }
        }
      }
      .textInputBox {
        width: 100%;
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: end;
        textarea {
          width: 100%;
          height: 150px;
          padding: 8px;
          font-size: 0.9rem;
          margin-bottom: 10px;
          border: 2px solid var(--GREY);
          border-radius: 10px;
          outline-color: var(--GREY);
          resize: none;
        }
        .postBtn {
          align-items: right;
          margin-bottom: 30px;
        }
      }
    }
    .listBtnBox {
      display: flex;
      justify-content: center;
    }
  }
  @media only screen and (max-width: 768px) {
    .container {
      padding: 6%;

      .titleBox {
        padding-bottom: 30px;

        .memIconArea {
          width: 15%;
          text-align: center;
        }
        p {
          color: black;
          font-size: 0.7rem;
        }
      }
      .titleElements {
        .topElements {
          .selectedBox {
            .boardType,
            .placeType {
              display: flex;
              justify-content: center;
              align-items: center;
              p {
                color: white;
              }
            }
          }
        }

        h3 {
          font-size: 1.1rem;
        }
      }
      .contentsBox {
        padding: 3%;
        margin-top: 30px;
        .introduce {
          width: 95%;
        }
        .contentsText {
          width: 100%;
          margin: 30px 0;
          p {
            font-size: 1rem;
          }
        }
      }
      .commentArea {
        h3 {
          margin-top: 30px;
        }
        .commentList {
          .commentBox {
            .iconArea {
              width: 13%;
            }
            .textArea {
              width: 55%;
              padding: 2%;
              .nickName {
                font-size: 1rem;
                margin-bottom: 10px;
              }
              .commentText {
                color: black;
                font-size: 0.9rem;
              }
            }
            .rightArea {
              width: 30%;
              .writeDate {
                margin-bottom: 10px;
              }
              .editBtnBox {
                Button {
                  font-size: 0.8rem;
                  margin-left: 10px;
                }
              }
            }
          }
        }
        .textInputBox {
          margin-top: 20px;
        }
      }
      .listBtnBox {
        margin-top: 30px;
      }
    }
  }
`;
