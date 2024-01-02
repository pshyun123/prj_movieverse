package com.totalprj.movieverse.service;

import com.totalprj.movieverse.dto.MovieDto;
import com.totalprj.movieverse.dto.MovieResDto;
import com.totalprj.movieverse.dto.MovieSearchDto;
import com.totalprj.movieverse.entity.Movie;
import com.totalprj.movieverse.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;

    // 영화 저장
    public void saveMovie(Movie movie) {
        movieRepository.save(movie);
    }

    // 타이틀, 감독만 뽑아낸 List(중복 제거용)
    public List<MovieDto> checkExist(List<MovieDto> movieList) {
        log.info("movieLsit for check : {}", movieList);
        List<MovieDto> checkList = new ArrayList<>();

        for (MovieDto movieDto : movieList) {
            String title = movieDto.getTitle();
            String director = movieDto.getDirectorNm();
            String poster = movieDto.getPosters();
            String plot = movieDto.getPlotText();
            log.info("title : {} , director : {}", title, director);
            boolean isExist = movieRepository.existsByTitleAndDirectorNm(title, director);
            if (!isExist && !Objects.equals(poster, "") && !Objects.equals(plot, "")) { // 영화 정보가 없으면 리스트에 추가

                checkList.add(movieDto);

            }
        }
        log.info("중복되지 않은 영화 수 : {} 건", checkList.size());

        return checkList;
    }

    // 영화 정보 저장
    public void saveMovieList(List<MovieDto> checkedList) {
        for (MovieDto movieDto : checkedList) {
            Movie movie = new Movie();
            movie.setTitle(movieDto.getTitle());
            movie.setPosters(movieDto.getPosters());
            movie.setTitleEng(movieDto.getTitleEng());
            movie.setReprlsDate(movieDto.getReprlsDate());
            movie.setGenre(movieDto.getGenre());
            movie.setNation(movieDto.getNation());
            movie.setRating(movieDto.getRating());
            movie.setRuntime(movieDto.getRuntime());
            movie.setScore(movieDto.getScore());
            movie.setDirectorNm(movieDto.getDirectorNm());
            movie.setActorNm(movieDto.getActorNm());
            movie.setPlotText(movieDto.getPlotText());
            movie.setStlls(movieDto.getStlls());
            saveMovie(movie);
        }
    }

    // DB에서 영화 상세정보 가져오기
    public MovieResDto getMovieDetail(Long id) {
        MovieResDto movieDetail = new MovieResDto();
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당하는 영화가 없습니다."));

        movieDetail = convertToMovieInfo(movie);
        log.info("{}영화 상세정보 추출 : ", movieDetail.getTitle());

        return movieDetail;
    }

    // DB에서 영화정보 가져오기
    public List<MovieSearchDto> getMovieList() {
        List<Movie> movies = movieRepository.findAll();
        List<MovieSearchDto> movieList = new ArrayList<>();

        for (Movie movie : movies) {
            MovieSearchDto searchDto = convertToMovieSearch(movie);
            movieList.add(searchDto);
        }
        return movieList;
    }

    // 무비리스트 최신영화순 페이지네이션
    public List<MovieSearchDto> getRecentMovies(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("reprlsDate"), Sort.Order.asc("title")));
        return movieRepository.findAll(pageable)
                .getContent()
                .stream()
                .map(this::convertToMovieSearch)
                .collect(Collectors.toList());
    }

    // 무비리스트 오래된순 페이지네이션
    public List<MovieSearchDto> getFormerMovies(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.asc("reprlsDate"), Sort.Order.asc("title")));
        return movieRepository.findAll(pageable)
                .getContent()
                .stream()
                .map(this::convertToMovieSearch)
                .collect(Collectors.toList());
    }

    // 영화 키워드로 검색
    public List<MovieSearchDto> searchMoviesByKeyword(String keyword, Pageable pageable) {
        Page<Movie> movies = movieRepository.findByKeyword(keyword, pageable);
        return movies.stream()
                .map(this::convertToMovieSearch)
                .collect(Collectors.toList());
    }

    // 영화 정렬, 검색 및 페이지네이션 통합
    public List<MovieSearchDto> getProcessedMovieList(int page, int size, String sort, String keyword) {

        List<MovieSearchDto> movieList = new ArrayList<>();

        if (sort.equalsIgnoreCase("recent")) {
            Pageable pageableRecent = PageRequest.of(page, size, Sort.by(Sort.Order.desc("reprlsDate"), Sort.Order.asc("title")));
            if(keyword != null ){
                movieList = searchMoviesByKeyword(keyword, pageableRecent);
            }else {
                movieList = getRecentMovies(page, size);
            }

        }else if (sort.equalsIgnoreCase("former")){
            Pageable pageableFormer = PageRequest.of(page, size, Sort.by(Sort.Order.asc("reprlsDate"), Sort.Order.asc("title")));
            if(keyword != null ){
                movieList = searchMoviesByKeyword(keyword, pageableFormer);
            }else {
                movieList = getFormerMovies(page, size);
            }

        }
        return movieList;
    }

    // 무비리스트 페이지 수 조회
    public int getMoviePage(Pageable pageable) {
        return movieRepository.findAll(pageable).getTotalPages();
    }

    // 무비서치 DTO변환
    public MovieSearchDto convertToMovieSearch(Movie movie) {
        MovieSearchDto movieSearchDto = new MovieSearchDto();
        movieSearchDto.setId(movie.getId());
        movieSearchDto.setTitle(movie.getTitle());
        movieSearchDto.setPosters(movie.getPosters());
        movieSearchDto.setPlotText(movie.getPlotText());
        movieSearchDto.setScore(movie.getScore());
        return movieSearchDto;
    }

    // 리액트 요청에 맞춰서 전체 정보 반환
    public MovieResDto convertToMovieInfo(Movie movie) {
        MovieResDto movieResDto = new MovieResDto();
        movieResDto.setId(movie.getId());
        movieResDto.setTitle(movie.getTitle());
        movieResDto.setPosters(movie.getPosters());
        movieResDto.setTitleEng(movie.getTitleEng());
        movieResDto.setReprlsDate(movie.getReprlsDate());
        movieResDto.setGenre(movie.getGenre());
        movieResDto.setNation(movie.getNation());
        movieResDto.setRating(movie.getRating());
        movieResDto.setRuntime(movie.getRuntime());
        movieResDto.setScore(movie.getScore());
        movieResDto.setDirectorNm(movie.getDirectorNm());
        movieResDto.setActorNm(movie.getActorNm());
        movieResDto.setPlotText(movie.getPlotText());
        movieResDto.setStlls(movie.getStlls());
        return movieResDto;
    }
}
