import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { styled } from "styled-components";
import searchBannerPc from "../../../src/images/moviesearch_pc.jpg";
import searchBannerPc2 from "../../../src/images/SearchBannerPc2.jpg";
import searchBannerMo2 from "../../../src/images/searchBannerMo2.jpg";

const SearchBannerStyle = styled.section`
  width: 100%;
  background-image: url(${searchBannerPc2});
  background-size: 100%;
  background-position: center;
  margin-bottom: 5%;
  height: 350px;
  .wrapper {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 80px 0;
    .container {
      text-align: center;
      .searchText {
        margin-bottom: 50px;
      }
      .movieSearchBar {
        width: 100%;
        align-items: center;
        justify-content: center;
        display: flex;
        .inputBox {
          position: relative;
          width: 50%;
          input {
            text-align: center;
            border: none;
            outline: none;
            width: 100%;
            height: 40px;
            border-radius: 5px;
          }
          .searchBox {
            position: absolute;
            top: 0;
            color: black;
            right: 10px;
            padding: 10px;
            cursor: pointer;
            svg {
              font-size: 20px;
            }
          }
        }
      }
    }
    @media only screen and (max-width: 768px) {
      .container {
        .movieSearchBar {
          .inputBox {
            position: relative;
            width: 80%;
            input {
              text-align: center;
              border: none;
              outline: none;
              width: 100%;
              height: 40px;
              border-radius: 5px;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    background-image: url(${searchBannerMo2});
    height: 300px;
  }
`;

const MovieSearchBanner = ({ setKeyword }) => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <SearchBannerStyle>
      <div className="wrapper">
        <div className="container">
          <div className="searchText">
            <h2>영화 검색</h2>
          </div>
          <div className="movieSearchBar">
            <div className="inputBox">
              <input
                type="text"
                placeholder="찾으시는 영화를 검색하세요."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <div className="searchBox">
                <FontAwesomeIcon
                  icon={faSearch}
                  onClick={() => {
                    setKeyword(searchInput);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SearchBannerStyle>
  );
};

export default MovieSearchBanner;
