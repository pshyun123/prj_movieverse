package com.totalprj.movieverse.service;


import com.totalprj.movieverse.dto.MovieDto;
import com.totalprj.movieverse.entity.*;
import com.totalprj.movieverse.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class PythonApiService {
    private final MovieService movieService;
    private final MovieRepository movieRepository;
    private final OttNetflixRepository netflixRepository;
    private final OttWatchaRepository watchaRepository;
    private final OttTvingRepository tvingRepository;
    private final BoxofficeRepository boxofficeRepository;


//    @Scheduled(cron = "0 1 * * * *")
    @Scheduled(initialDelay = 0, fixedDelay = Long.MAX_VALUE)
    public void startScheduler(){
        Instant startTime = Instant.now();
        log.info("PythonApiService schedule start!");
        // 파이썬에서 정보 받아오기 실패 시에 대한 예외 처리
        try {
            List<Map<String, List<Map<String, String>>>> response = fetchDataFromPythonServer();
            log.info("python response : {}", response);

            if(response != null) {
                List<Map<String, List<Map<String, String>>>> ottList = ottDataList(response);
                log.info("movieDataList : {}", ottList);
                processList(ottList);
            }else {
                log.error("fetchDataFromPythonServer 가 실패했습니다.");
            }
        }catch (Exception e) {
            log.error("PythonApiService Schedule 처리 중 오류 : ", e);
        }
        Instant endTime = Instant.now();
        log.info("PythonApiService schedule end! 걸린 시간 : {}", Duration.between(startTime, endTime));
    }

    public List<Map<String, List<Map<String, String>>>> fetchDataFromPythonServer() {
        log.info("파이썬으로 부터 크롤링 결과 + 영화 정보 받으러 가는중 ");
        RestTemplate restTemplate = new RestTemplate();
        String apiUrl = "http://127.0.0.1:5000/api/kmdblist";
        ResponseEntity<List<Map<String, List<Map<String, String>>>>> responseEntity = restTemplate.exchange(
                apiUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Map<String, List<Map<String, String>>>>>() {});

        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            return responseEntity.getBody();
        } else {
            log.error("Request failed with status code: {}", responseEntity.getStatusCodeValue());
            return null;
        }
    }
    // MovieInfo 만 저장하고 ott리스트 반환
    public List<Map<String, List<Map<String, String>>>> ottDataList(List<Map<String, List<Map<String, String>>>> movieList) {
        log.info("ottDataList 진입");
        List<Map<String, Object>> res = new ArrayList<>();

        // 영화 정보만 뽑아내기
        Optional<Map<String, List<Map<String, String>>>> movieInfoMap = movieList.stream()
                .filter(map -> map.containsKey("movieInfo"))
                .findFirst();

        // 영화 정보가 있다면 DB 저장
        if (movieInfoMap.isPresent()) {
            List<MovieDto> infoList = movieDtoList(movieInfoMap.get().get("movieInfo"));
            List<MovieDto> checkedList = movieService.checkExist(infoList);
            movieService.saveMovieList(checkedList);
        }

        // movieInfo를 제외한 나머지를 리스트로 묶어서 반환
        List<Map<String, List<Map<String, String>>>> ottMapList = movieList.stream()
                .filter(map -> !map.containsKey("movieInfo"))
                .collect(Collectors.toList());

        log.info("ottMapList : {}", ottMapList);
        return ottMapList;
    }

    // movieInfo MovieDto로 convert 후 리스트화
    public List<MovieDto> movieDtoList (List<Map<String,String>> movieInfo) {
        log.info("movieDtoList진입 / movieInfo : {}", movieInfo);
        List<MovieDto> movieDtoList = new ArrayList<>();
        for(Map<String,String> movie : movieInfo) {
            MovieDto movieDto = new MovieDto();
            log.info("title : {}", movie.get("title"));
            movieDto.setTitle(movie.get("title"));
            movieDto.setPosters(movie.get("posters"));
            movieDto.setTitleEng(movie.get("titleEng"));
            movieDto.setReprlsDate(movie.get("reprlsDate"));
            movieDto.setGenre(movie.get("genre"));
            movieDto.setNation(movie.get("nation"));
            movieDto.setRating(movie.get("rating"));
            movieDto.setRuntime(movie.get("runtime"));
            movieDto.setScore(movie.get("score"));
            movieDto.setDirectorNm(movie.get("directorNm"));
            movieDto.setActorNm(movie.get("actorNm"));
            movieDto.setPlotText(movie.get("plotText"));
            movieDto.setStlls(movie.get("stlls"));
            movieDtoList.add(movieDto);
        }

        return movieDtoList;
    }

    // Ott, boxoffice 구분
    public void processList (List<Map<String, List<Map<String, String>>>> ottList){
        log.info("processList 진입");
        List<String> ls = Arrays.asList("box_office", "netflix", "watcha", "tving");

        for(String type : ls) {
            List<Map<String, String>> ottData = ottList.stream()
                    .filter(ott -> ott.containsKey(type))
                    .findFirst()
                    .map(ottMap -> ottMap.get(type))
                    .orElse(null);

            log.info("ottData : {}", ottData);
            if(ottData != null) {
                saveOtt(type, ottData);
            }else {
                log.warn("ottData 값이 없습니다.");
            }
        }
    }

    // ott 별 method 호출
    public void saveOtt(String type, List<Map<String, String>> ottData){
        log.info("saveOtt 진입");
        switch(type) {
            case "box_office" :
                // box_office
                deleteAndSaveEntity(boxofficeRepository, Boxoffice.class ,ottData);
                break;
            case "netflix" :
                // netflix
                deleteAndSaveEntity(netflixRepository, OttNetflix.class, ottData);
                break;
            case "watcha" :
                deleteAndSaveEntity(watchaRepository, OttWatcha.class, ottData);
                break;
            case "tving":
                deleteAndSaveEntity(tvingRepository,OttTving.class, ottData);
                break;
            default:
                log.warn("ottData가 없습니다");
        }
    }

    // 해당 테이블 정보 지우고 새 정보 저장
    private <T> void deleteAndSaveEntity(JpaRepository<T, ?>repository, Class<T> entityType, List<Map<String, String>> ottData){
        log.info("deleteAndSaveEntity 진입");
        // 테이블 비우기
        repository.deleteAll();
        for(Map<String, String> data : ottData) {
            T entity;
            // 새 entity 객체 생성
            try {
                entity = entityType.getDeclaredConstructor().newInstance();
            } catch (Exception e) {
                throw new RuntimeException("엔티티 객체 생성 실패.", e);
            }

            try {
                // 제목, 감독 정보를 기준으로 영화 검색
                String title = data.get("title");
                String director = data.get("director");
                log.info("title: {} director : {}", title, director);
                Movie movie = movieRepository.findByTitle(title)
                        .orElseThrow(() -> new RuntimeException(title+"영화가 존재하지 않습니다."));

                // 해당하는 entity에 set
                if (entity instanceof Boxoffice) {
                    log.info("Boxoffice 저장 중");
                    ((Boxoffice) entity).setMovie(movie);
                }else if(entity instanceof OttNetflix) {
                    log.info("Netflix 저장 중");
                    ((OttNetflix) entity).setMovie(movie);
                }else if(entity instanceof OttWatcha) {
                    log.info("Watcha 저장 중");
                    ((OttWatcha) entity).setMovie(movie);
                }else if(entity instanceof OttTving) {
                    log.info("Tving 저장 중");
                    ((OttTving) entity).setMovie(movie);
                }

                // 저장
                repository.save(entity);
            } catch (RuntimeException e ) {
                log.error("저장 할 영화를 찾을 수 없습니다.",e);
            }
        }
    }


}


