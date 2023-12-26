package com.totalprj.movieverse.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardResDto {
    private Long id;
    private String memberAlias;
    private String memberImage;
    private String categoryName;
    private String gatherType;
    private String title;
    private String image;
    private String boardContent;
    private int count;
    private LocalDateTime regDate;
}
