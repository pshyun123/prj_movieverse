package com.totalprj.movieverse.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="movie")
@Getter
@Setter
@NoArgsConstructor
public class Movie {
    @Id
    @Column(name="movie_id") // 영화 ID
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="movie_title") // 제목
    private String title;

    @Column(name="movie_poster_url") // 포스터 url
    private String posters;

    @Column(name = "movie_titleEng") // 영문 제목
    private String titleEng;

    @Column(name="movie_release") // 개봉일
    private String reprlsDate;

    @Column(name="movie_genre") // 장르
    private String genre;

    @Column(name="movie_nation") // 국가
    private String nation;

    @Column(name="movie_rating") // 등급
    private String rating;

    @Column(name="movie_runtime") // 상영 시간
    private String runtime;

//    @Column(name="movie_audience") // 누적 관객
//    private String audiAcc;
    @Column(name = "movie_score") // 평점
    private String score;

    @Column(name="movie_director") // 감독
    private String directorNm;

    @Column(name="movie_actor") // 출연 배우
    private String actorNm;

    @Column(name="movie_content" , columnDefinition = "TEXT") // 주요 정보
    private String plotText;

    @Column(name="movie_still_url" , columnDefinition = "TEXT") // 스틸컷
    private String stlls;

}
