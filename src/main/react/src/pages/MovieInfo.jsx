import MovieInfoSection1 from "../component/MovieInfo/MovieInfoSection1";
import MovieInfoContent from "../component/MovieInfo/MovieInfoContent";
import MovieInfoStaff from "../component/MovieInfo/MovieInfoStaff";
import MovieInfoStill from "../component/MovieInfo/MovieInfoStill";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieApi from "../api/MovieApi";

const MovieInfo = () => {
  const { id } = useParams();

  const [movieData, setMovieData] = useState({});

  const fetchMovieInfoData = async () => {
    try {
      const res = await MovieApi.getMoviesDetail(id);
      // 영화 Api  값이 있으면 setMovieData("값")
      if (res.data !== null) {
        setMovieData(res.data);
      }
    } catch (err) {
      console.error("영화정보 불러오기 실패 " + err);
    }
  };

  useEffect(() => {
    // 화면이 처음 렌더링 된 상태에서 한번만 호출!
    fetchMovieInfoData();
  }, [id]);

  return (
    <>
      <MovieInfoSection1 movieDetail={movieData} movieId={id} />
      <MovieInfoContent movieDetail={movieData} />
      <MovieInfoStaff movieDetail={movieData} />
      <MovieInfoStill movieDetail={movieData} />
    </>
  );
};
export default MovieInfo;
