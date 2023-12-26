import { styled } from "styled-components";

const MovieSortStyle = styled.div`
  .container {
    margin-bottom: 0.5%;
    height: 50px;
    .buttonBox {
      display: flex;
      justify-content: flex-end;
      align-items: baseline;
      button {
        background: none;
        border: none;
        color: white;
        transition: 0.3s;
        font-size: 1.1em;
        font-weight: 600;
        vertical-align: text-bottom;
        text-align: bottom;

        line-height: 1;

        &:hover {
          cursor: pointer;
        }

        &.recent {
          padding-right: 10px;
          margin-right: 5px;
        }

        &.selected {
          color: var(--LIGHTVIO);
        }
      }
    }
  }
`;

const MovieSort = ({ selBtn, setSelBtn }) => {
  return (
    <MovieSortStyle>
      <div className="container">
        <div className="buttonBox">
          <button
            className={`recent ${selBtn === "recent" ? "selected" : ""}`}
            onClick={() => setSelBtn("recent")}
          >
            최신 순
          </button>
          <button
            className={`former ${selBtn === "former" ? "selected" : ""}`}
            onClick={() => setSelBtn("former")}
          >
            오래된 순
          </button>
        </div>
      </div>
    </MovieSortStyle>
  );
};

export default MovieSort;
