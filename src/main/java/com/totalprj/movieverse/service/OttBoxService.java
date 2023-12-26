package com.totalprj.movieverse.service;

import com.totalprj.movieverse.dto.MovieSearchDto;
import com.totalprj.movieverse.entity.*;
import com.totalprj.movieverse.repository.BoxofficeRepository;
import com.totalprj.movieverse.repository.OttNetflixRepository;
import com.totalprj.movieverse.repository.OttTvingRepository;
import com.totalprj.movieverse.repository.OttWatchaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OttBoxService {
    private final OttTvingRepository tvingRepository;
    private final OttNetflixRepository netflixRepository;
    private final OttWatchaRepository watchaRepository;
    private final BoxofficeRepository boxofficeRepository;

    private final MovieService movieService;

    // BoxOffice 영화 리스트
    public List<MovieSearchDto> boxOfficeList() {
        log.info("boxOffice list 생성 시작");
        // 반환할 빈 배열 생성
        List<MovieSearchDto> movieList = new ArrayList<>();
        // 박스오피스 객체를 리스트로 담아줄 빈 배열 생성
        List<Boxoffice> boxoffices = new ArrayList<>();
        // 박스오피스 정보 다 불러옴
        boxoffices = boxofficeRepository.findAll();

        //각 박스오피스의 영화 정보를 movieSearchDto 리스트로 반환
        for (Boxoffice boxoffice : boxoffices) {
            Movie movie = boxoffice.getMovie(); // 박스오피스의 영화정보
            MovieSearchDto movieSearchDto = movieService.convertToMovieSearch(movie); // 영화정보를 dto에 담음
            movieList.add(movieSearchDto); // dto를 리스트에 추가
            log.info("담긴 영화 : {}", movieSearchDto.getTitle());
        }
        return movieList;
    }

    // 티빙 영화 리스트
    public List<MovieSearchDto> tivingList() {
        log.info("tiving list 생성 시작");
        List<MovieSearchDto> movieList = new ArrayList<>();
        List<OttTving> ottTvings = new ArrayList<>();
        ottTvings = tvingRepository.findAll();

        for (OttTving ottTving : ottTvings) {
            Movie movie = ottTving.getMovie();
            MovieSearchDto movieSearchDto = movieService.convertToMovieSearch(movie);
            movieList.add(movieSearchDto);
            log.info("담긴 영화 : {}", movieSearchDto.getTitle());
        }return movieList;
    }
    // 넷플릭스 영화 리스트
    public List<MovieSearchDto> netflixList() {
        log.info("nexflix list 생성 시작");
        List<MovieSearchDto> movieList = new ArrayList<>();
        List<OttNetflix> ottNetflixes = new ArrayList<>();
        ottNetflixes = netflixRepository.findAll();

        for (OttNetflix ottNetflix : ottNetflixes) {
            Movie movie = ottNetflix.getMovie();
            MovieSearchDto movieSearchDto = movieService.convertToMovieSearch(movie);
            movieList.add(movieSearchDto);
            log.info("담긴 영화 : {}", movieSearchDto.getTitle());
        }return movieList;
    }

    // 왓챠 영화 리스트
    public List<MovieSearchDto> WatchaList() {
        log.info("watcha list 생성 시작");
        List<MovieSearchDto> movieList = new ArrayList<>();
        List<OttWatcha> ottWatchas = new ArrayList<>();
        ottWatchas = watchaRepository.findAll();

        for (OttWatcha ottWatcha : ottWatchas) {
            Movie movie = ottWatcha.getMovie();
            MovieSearchDto movieSearchDto = movieService.convertToMovieSearch(movie);
            movieList.add(movieSearchDto);
            log.info("담긴 영화 : {}", movieSearchDto.getTitle());
        }return movieList;
    }


}
