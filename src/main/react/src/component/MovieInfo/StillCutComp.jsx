import styled from "styled-components";

const StillCompStyle = styled.div`
  .still {
    width: 100%;
    height: 0;
    padding-bottom: 75%; /* 예시 비율, 원하는 비율로 조정 가능 */
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;

const StillCutComp = ({ still }) => {
  return (
    <>
      <StillCompStyle>
        <div className="still">
          <img src={still} alt="stllsImg" />
        </div>
      </StillCompStyle>
    </>
  );
};

export default StillCutComp;
