import { styled } from "styled-components";
import Button from "../../../util/Button";
import FaqApi from "../../../api/FaqApi";
import useTokenAxios from "../../../hooks/useTokenAxios";

const EditFaqModalComp = styled.div`
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
    background-color: var(--MIDBLUE);
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
        width: 80%;
        outline: none;
        border: 1px solid var(--GREY);
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 20px;
        text-align: center;
      }
      textarea {
        width: 80%;
        outline: none;
        border: 1px solid var(--GREY);
        padding: 20px;
        padding-bottom: 100px;
        border-radius: 5px;
        margin-bottom: 3px;
        resize: none;
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

const EditFaqModal = (props) => {
  const {
    open,
    close,
    titleVal,
    onChangeTitle,
    contentVal,
    onChangeContent,
    type,
    editId,
    bringData,
  } = props;

  const newFaq = async () => {
    const res = await FaqApi.createFaq(contentVal, titleVal);
    if (res.data) {
      console.log("faq 저장 성공");
      close();
      bringData();
    }
  };
  const addFaq = useTokenAxios(newFaq);

  const reviseFaq = async () => {
    console.log("수정 시도");
    const res = await FaqApi.reviseFaq(editId, contentVal, titleVal);
    if (res.data) {
      console.log("faq 수정 성공");
      close();
      bringData();
    }
  };
  const editFaq = useTokenAxios(reviseFaq);

  return (
    <EditFaqModalComp>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <div className="contentBox">
              <h3>
                {type === "edit"
                  ? "수정사항을 입력하세요"
                  : "새 FAQ를 작성해주세요"}
              </h3>
              <input
                defaultValue={titleVal}
                onChange={onChangeTitle}
                placeholder={"질문을 입력해 주세요"}
              />
              <textarea
                defaultValue={contentVal}
                onChange={onChangeContent}
                placeholder={"답변을 작성해 주세요"}
              />
            </div>
            <div className="btnBox">
              <Button
                clickEvt={() => {
                  type === "edit" ? editFaq() : addFaq();
                }}
                active={true}
                width="20%"
                back={"var(--BLUE)"}
              >
                등록하기
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
    </EditFaqModalComp>
  );
};

export default EditFaqModal;
