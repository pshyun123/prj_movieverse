package com.totalprj.movieverse.service;

import com.totalprj.movieverse.entity.Movie;
import com.totalprj.movieverse.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@Transactional
@Slf4j
@RequiredArgsConstructor
@TestPropertySource(locations = "classpath:application-test.properties")
public class MovieRepositoryTest {
    @Autowired
    MovieRepository movieRepository;

    @PersistenceContext
    EntityManager em;

    public List<Movie> createTestMovies() {
        List<Movie> movies = new ArrayList<>();

        Movie movie1 = new Movie();
        movie1.setTitle("신차원! 짱구는 못말려 더 무비 초능력 대결전 ~날아라 수제김밥~");
        movie1.setReprlsDate("20231222");
        movie1.setDirectorNm("오네 히토시");
        movie1.setScore("8.67");
        movie1.setPosters("https://search.pstatic.net/...");  // 포스터 URL
        movie1.setStlls("https://search.pstatic.net/..., https://search.pstatic.net/...");  // 스틸컷 URL
        movies.add(movie1);

        Movie movie2 = new Movie();
        movie2.setTitle("아쿠아맨과 로스트 킹덤");
        movie2.setReprlsDate("20231220");
        movie2.setDirectorNm("제임스 완");
        movie2.setScore("7.46");
        movie2.setPosters("https://search.pstatic.net/...");
        movies.add(movie2);

        Movie movie3 = new Movie();
        movie3.setTitle("노량: 죽음의 바다");
        movie3.setReprlsDate("20231220");
        movie3.setDirectorNm("김한민");
        movie3.setScore("8.50");
        movie3.setPosters("https://search.pstatic.net/...");
        movies.add(movie3);

        Movie movie4 = new Movie();
        movie4.setTitle("서울의 봄");
        movie4.setReprlsDate("20231122");
        movie4.setDirectorNm("김성수");
        movie4.setScore("9.60");
        movie4.setPosters("https://search.pstatic.net/...");
        movies.add(movie4);

        Movie movie5 = new Movie();
        movie5.setTitle("트롤: 밴드 투게더");
        movie5.setReprlsDate("20231220");
        movie5.setDirectorNm("월트 도른");
        movie5.setScore("8.89");
        movie5.setPosters("https://search.pstatic.net/...");
        movies.add(movie5);

        Movie movie6 = new Movie();
        movie6.setTitle("뽀로로 극장판 슈퍼스타 대모험");
        movie6.setReprlsDate("20231213");
        movie6.setDirectorNm("윤제완");
        movie6.setScore("9.05");
        movie6.setPosters("https://search.pstatic.net/...");
        movies.add(movie6);

        Movie movie7 = new Movie();
        movie7.setTitle("3일의 휴가");
        movie7.setReprlsDate("20231206");
        movie7.setDirectorNm("육상효");
        movie7.setScore("8.33");
        movie7.setPosters("https://search.pstatic.net/...");
        movies.add(movie7);

        Movie movie8 = new Movie();
        movie8.setTitle("괴물");
        movie8.setReprlsDate("20231129");
        movie8.setDirectorNm("고레에다 히로카즈");
        movie8.setScore("8.97");
        movie8.setPosters("https://search.pstatic.net/...");
        movies.add(movie8);

        return movies;
    }

    @Test
    @DisplayName("영화 정보 저장 테스트")
    public void saveBoxOfficeTest() {
        List<Movie> movies = createTestMovies();

        int cnt = 0;
//
        for(Movie movie : movies){
            cnt ++;
            Movie testMovie = movieRepository.save(movie);
            System.out.println("영화"+cnt+" 저장 결과 : " + testMovie);
        }

        em.flush();
        em.clear();

    }
}
