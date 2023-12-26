import MovieSearchBanner from "../component/MovieSearch/MovieSearchBanner";
import MovieSort from "../component/MovieSearch/MovieSort";
import SearchMapBox from "../component/MovieSearch/SearchMapBox";
import { useState } from "react";

const MovieSearch = () => {
  const [selBtn, setSelBtn] = useState("recent");
  const [keyword, setKeyword] = useState("");

  const handleButtonClick = (type) => {
    setSelBtn(type);
  };

  return (
    <>
      <MovieSearchBanner keyword={keyword} setKeyword={setKeyword} />
      <MovieSort selBtn={selBtn} setSelBtn={handleButtonClick} />
      <SearchMapBox sortType={selBtn} keyword={keyword} />
    </>
  );
};
export default MovieSearch;
