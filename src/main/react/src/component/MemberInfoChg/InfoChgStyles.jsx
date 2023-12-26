import { styled } from "styled-components";

const InfoChgComp = styled.section`
  padding: 80px 0;
  .container {
    h2 {
      font-weight: 600;
      text-align: center;
      margin-bottom: 60px;
    }
    .profile {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 50px;

      .imgBox {
        position: relative;
        width: 20%;
        padding-bottom: 20%;
        margin-bottom: 30px;
        border-radius: 50%;
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

    .inputArea {
      max-width: 400px;
      margin: 0 auto;
      .btnBox {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
      }
      .withdrawBox {
        display: flex;
        justify-content: end;
      }
    }
  }
`;
export default InfoChgComp;
