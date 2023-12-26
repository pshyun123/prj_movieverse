import { styled } from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import AgreementModal from "../../util/Agreement/AgreementModal";

const CheckboxComp = styled.div`
  font-size: 1em;
  font-weight: 600;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  label {
    display: flex;
    align-items: center;
    &.agreeAll {
      font-size: 1.2em;
    }
    input {
      margin-right: 10px;
    }
  }
  .iconBox {
    padding: 5px 5px;
    cursor: pointer;
  }
`;

const AgreeCheck = ({
  checked,
  children,
  onCheckedChange,
  agreeAll,
  modalType,
}) => {
  const checkBoxChange = () => {
    // onCheckedChange("checked");
    onCheckedChange("");
  };

  // 약관 모달
  // AgreementModal
  const [openAgreement, setAModalOpen] = useState(false);
  const [type, setType] = useState("");
  const openAgree = (agreeType) => {
    setAModalOpen(true);
    setType(agreeType);
  };
  const closeAgree = () => {
    setAModalOpen(false);
  };
  return (
    <>
      <CheckboxComp>
        <label className={agreeAll ? "agreeAll" : ""}>
          <input type="checkbox" checked={checked} onChange={checkBoxChange} />
          {children}
        </label>
        {!agreeAll && (
          <FontAwesomeIcon
            icon={faAngleRight}
            className="iconBox"
            onClick={() => {
              openAgree(modalType);
            }}
          />
        )}
      </CheckboxComp>
      <AgreementModal open={openAgreement} close={closeAgree} type={type} />
    </>
  );
};
export default AgreeCheck;
