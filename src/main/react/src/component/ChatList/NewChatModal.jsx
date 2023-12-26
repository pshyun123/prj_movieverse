import { styled } from "styled-components";
import Button from "../../util/Button";

const NewChatModalComp = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .openModal {
    display: flex;
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.8s;
  }

  section {
    width: 90%;
    max-width: 600px;
    margin: 0 auto;
    padding: 60px 0;
    border-radius: 0.3rem;
    background-color: var(--VIOLET);
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
    .contentBox {
      padding: 16px;
      text-align: center;
      color: #333;
      white-space: pre-line;
      line-height: 1.4;
      margin-bottom: 10px;
      h3 {
        font-size: 1.4em;
        font-weight: 600;
        margin-bottom: 40px;
      }
      input {
        width: 70%;
        outline: none;
        border: 1px solid var(--GREY);
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 6px;
      }
      .err {
        width: 70%;
        height: 20px;
        margin: 0 auto;
        text-align: right;
        padding-right: 5px;
      }
    }
    .btnBox {
      display: flex;
      justify-content: center;
      button {
        padding: 6px 12px;
        color: #fff;
        border-radius: 5px;
        font-size: 13px;
        &:last-child {
          margin-left: 10px;
        }
      }
    }
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const NewChatModal = (props) => {
  const { open, confirm, close, active, inputVal, errMsg, onChangeInput } =
    props;
  return (
    <NewChatModalComp>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <div className="contentBox">
              <h3>새로 만드는 키키의 이름은 무엇인가요?</h3>
              <input
                type="text"
                value={inputVal}
                placeholder="새로운 키키 이름을 적어주세요!"
                onChange={onChangeInput}
              />
              <div className="err">{errMsg}</div>
            </div>
            <div className="btnBox">
              <Button
                clickEvt={confirm}
                active={active}
                width="20%"
                back={"var(--BLUE)"}
              >
                만들기
              </Button>
              <Button
                clickEvt={close}
                active={true}
                width="20%"
                back={"var(--BLUE)"}
              >
                취소하기
              </Button>
            </div>
          </section>
        )}
      </div>
    </NewChatModalComp>
  );
};
export default NewChatModal;
