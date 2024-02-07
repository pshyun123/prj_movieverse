import { styled } from "styled-components";

const HeaderComp = styled.header`
  width: 100vw;
  height: 80px;
  background-color: rgba(24, 18, 43, 0.7);
  backdrop-filter: blur(40px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  border-bottom: 1px solid rgba(204, 204, 204, 0.1);
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    //모바일 메뉴
    .m-menu {
      display: none;
      cursor: pointer;
    }
    //로고
    .logo {
      height: 100%;
      display: flex;
      flex-grow: 1;
      align-items: center;
      img {
        height: 80%;
        cursor: pointer;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 100%;
      }
    }
    //메뉴
    nav {
      text-align: center;
      height: 100%;
      flex-grow: 2;
      .menu {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        > li {
          height: 100%;
          flex-grow: 1;
          position: relative;
          font-size: 1.2em;
          font-weight: 600;
          padding: 10px 20px;
          cursor: pointer;
          .m-title {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            cursor: pointer;
            transition: 0.2s ease-in;
          }
          .sub-menu {
            width: 100%;

            height: 0;
            overflow: hidden;

            position: absolute;
            top: 100%;
            left: 0;

            border-radius: 0 0 5px 5px;
            transition: height 0.8s ease-out;
            li {
              background-color: var(--GREY);
              font-size: 1.2rem;
              font-weight: 400;
              color: #333;
              transition: 0.2s ease-in;
              &:hover {
                background-color: var(--LIGHTVIO);
                color: white;
              }
            }
          }
          &:hover {
            .m-title {
              color: var(--LIGHTVIO);
            }
            .sub-menu {
              height: auto;
              border: 1px solid #ddd;
              li {
                padding: 20px 0;
              }
            }
          }
        }
      }
    }
    //로그인아이콘
    .log-icon {
      flex-grow: 1;
      display: flex;
      justify-content: right;
      font-size: 30px;
      svg {
        padding: 10px 10px;
        color: var(--GREY);
        transition: 0.3s;

        &:hover {
          cursor: pointer;
          color: var(--LIGHTBLUE);
        }
      }
    }
    @media only screen and (max-width: 768px) {
      justify-content: space-between;
      height: 80px;
      .mo-menu {
        flex-grow: 0;

        .m-menu {
          display: block;
          font-size: 40px;
          padding: 10px;
        }
      }

      nav {
        width: 100vw;
        height: calc(100vh - 80px);
        padding-bottom: 40px;
        position: absolute;
        top: 79px;
        left: -150%;
        background-color: var(--MIDBLUE);
        transition: 0.5s ease-in;

        &.active {
          left: -1px;
        }
        .menu {
          height: auto;
          display: block;
          > li {
            padding: 0 20px;
            position: static;
            .m-title {
              font-size: 1.3em;
              padding: 20px 0;
              background-color: var(--IVORY);
            }
            .sub-menu {
              height: auto;
              position: static;
              border-radius: 0;
              li {
                font-size: 1.2em;
                padding: 20px 0;
              }
            }
            &:hover {
              .sub-menu {
                border: none;
                li {
                  &:hover {
                    font-weight: 600;
                  }
                }
              }
            }
          }
        }
      }
      .logo {
        display: flex;
        justify-content: center;
      }
      .log-icon {
        flex-grow: 0;
      }
    }
  }
  @media only screen and (max-width: 480px) {
    height: 40px;
    .container {
      height: 40px;
      .mo-menu {
        .m-menu {
          font-size: 20px;
        }
        flex-grow: 1;
        width: 20%;
      }
      .logo {
        flex-grow: 1;
      }
      nav {
        height: calc(100vh - 40px);
        top: 39px;
      }
      .log-icon {
        flex-grow: 1;
        width: 20%;
        font-size: 20px;
      }
    }
  }
`;
export default HeaderComp;
