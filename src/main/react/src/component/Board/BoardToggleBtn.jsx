import styled, { css } from "styled-components";
import { useState, useEffect } from "react";

const ToggleBtn = styled.button`
  width: 25%;
  border-radius: 30px;
  padding: 5px;
  border: 1px solid #909090;
  overflow: hidden;
  cursor: pointer;
  background-color: white;
  position: relative;
  transition: all 0.5s ease;
  .btnBox {
    display: flex;
    justify-content: space-around;
    outline: 1px solid yellow;
    width: 100%;
  }
  @media only screen and (max-width: 768px) {
    width: 40%;
  }
`;

const BtnText = styled.div`
  width: 50%;
  z-index: 5;
  color: ${(props) => (props.$toggle === true ? "var(--VIOLET)" : "white")};
  font-size: 15px;
  font-weight: bold;
  transition: all 0.5s ease;
`;

const Circle = styled.div`
  background-color: var(--VIOLET);
  width: 49%;
  height: 90%;
  border-radius: 30px;
  position: absolute;
  left: 2%;
  top: 6%;
  transition: all 0.8s ease;
  ${(props) =>
    props.$toggle === false &&
    css`
      transform: translate(98%, 0);
    `}
`;

const ToggleButton = ({ onChange, gatherType }) => {
  const [toggle, setToggle] = useState(true);

  const clickedToggle = () => {
    setToggle(toggle ? false : true);
    gatherType === "온라인" ? onChange("오프라인") : onChange("온라인");
  };

  useEffect(() => {
    if (gatherType === "온라인") {
      setToggle(true);
      onChange("온라인");
    } else if (gatherType === "오프라인") {
      setToggle(false);
      onChange("오프라인");
    }
  }, [gatherType]);

  return (
    <>
      <ToggleBtn onClick={clickedToggle}>
        <div className="btnBox">
          <BtnText $toggle={!toggle}>온라인</BtnText>
          <BtnText $toggle={toggle}>오프라인</BtnText>
        </div>
        <Circle $toggle={toggle} />
      </ToggleBtn>
    </>
  );
};

export default ToggleButton;
