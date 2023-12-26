package com.totalprj.movieverse.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovieResDto {
    private Long id;
    private String title;
    private String posters;
    private String titleEng;
    private String reprlsDate;
    private String genre;
    private String nation;
    private String rating;
    private String runtime;
    private String score;
    private String directorNm;
    private String actorNm;
    private String plotText;
    private String stlls;
}
