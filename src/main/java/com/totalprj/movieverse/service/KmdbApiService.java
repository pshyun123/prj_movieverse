package com.totalprj.movieverse.service;

import com.totalprj.movieverse.dto.MovieDto;
import com.totalprj.movieverse.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.time.Duration;
import java.time.Instant;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class KmdbApiService {
    private final MovieRepository movieRepository;
    private final MovieService movieService;


    // 스케줄러 등록
    @Scheduled(initialDelay = 80 * 1000, fixedDelay = Long.MAX_VALUE)
    public void movieScheduler() {
        Instant startTime = Instant.now();
        log.info("KmdbApiService schedule start!");
        try {
            List<MovieDto> response = kmdbApiList();

            if(response != null ){
                log.info("python response : {}", response);
                List<MovieDto> checkedList = movieService.checkExist(response);
                movieService.saveMovieList(checkedList);

            }else {
                log.error("kmdpApiList 가 실패했습니다.");
            }
        }catch(Exception e) {
            log.error("KmdbApiService Schedule 처리 중 오류 : ", e);
        }
        Instant endTime = Instant.now();
        log.info("KmdbApiService schedule end! 걸린 시간 : {}", Duration.between(startTime, endTime));
    }

    public List<MovieDto> kmdbApiList() {
        log.info("파이썬을 통해 kmdbApi 정보 받으러 가는 중");
        RestTemplate restTemplate = new RestTemplate();
        String apiUrl = "http://localhost:5000/api/apilist";
        ResponseEntity<List<MovieDto>> responseEntity = restTemplate.exchange(
                apiUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<MovieDto>>() {});
        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            return responseEntity.getBody();
        } else {
            log.error("Request failed with status code: {}", responseEntity.getStatusCodeValue());
            return null;
        }
    }


}
