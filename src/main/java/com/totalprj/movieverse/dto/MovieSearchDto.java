package com.totalprj.movieverse.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovieSearchDto {
    private Long id;
    private String title;
    private String posters;
    private String plotText;
    private String score;
}
