import styled from "styled-components";

const MovieInfoContentStyle = styled.section`
  background-color: white;
  padding: 5% 0%;
  .container {
    .content {
      .captionText {
        color: var(--VIOLET);
        margin-bottom: 20px;
        font-weight: 600;
      }
      .divider {
        border-bottom: 1px solid var(--GREY);
        margin-bottom: 50px;
      }
    }
    p {
      color: black;
      font-size: 1.4em;
      line-height: 1.5em;
    }
  }
`;

const MovieInfoContent = ({ movieDetail }) => {
  console.log(movieDetail);
  return (
    <>
      <MovieInfoContentStyle>
        <section>
          <div className="container">
            <div className="content">
              <h2 className="captionText">주요 정보</h2>
              <div className="divider"></div>
            </div>
            <div className="loadingText">
              <p className="movieContent">{movieDetail.plotText}</p>
            </div>
          </div>
        </section>
      </MovieInfoContentStyle>
    </>
  );
};

export default MovieInfoContent;
