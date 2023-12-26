package com.totalprj.movieverse.controller;

import com.totalprj.movieverse.dto.MovieSearchDto;
import com.totalprj.movieverse.service.OttBoxService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/ottbox")
@RequiredArgsConstructor
public class OttBoxController {
    private final OttBoxService ottBoxService;

    //boxOffice 영화 리스트
    @GetMapping("/boxoffice")
    public ResponseEntity<List<MovieSearchDto>> getBoxOfficeList(){
        log.info("boxoffice 리스트 조회 진입");
        List<MovieSearchDto> movieList = ottBoxService.boxOfficeList();
        log.info("boxoffice list : {}", movieList);
        return ResponseEntity.ok(movieList);
    }

    // 티빙 영화 리스트
    @GetMapping("/otttiving")
    public ResponseEntity<List<MovieSearchDto>> getOttTvingList()
    {
        log.info("ottTiving 리스트 조회 진입");
        List<MovieSearchDto> movieList = ottBoxService.tivingList();
        log.info("ottTving list : {}", movieList);
        return ResponseEntity.ok(movieList);
    }
    // 넷플릭스 영화 리스트
    @GetMapping("/ottnetflix")
    public ResponseEntity<List<MovieSearchDto>> getOttNetflixList()
    {
        log.info("ottNetflix 리스트 조회 진입");
        List<MovieSearchDto> movieList = ottBoxService.netflixList();
        log.info("ottNetflix list : {}", movieList);
        return ResponseEntity.ok(movieList);
    }

    // 왓챠 영화 리스트
    @GetMapping("/ottwatcha")
    public ResponseEntity<List<MovieSearchDto>> getOttWatchaList()
    {
        log.info("ottWatcha 리스트 조회 진입");
        List<MovieSearchDto> movieList = ottBoxService.WatchaList();
        log.info("ottWatcha list : {}", movieList);
        return ResponseEntity.ok(movieList);
    }

}
