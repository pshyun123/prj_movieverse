package com.totalprj.movieverse.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardReqDto {
    private Long id;
    private String categoryName;
    private String gatherType;
    private String title;
    private String image;
    private String boardContent;
}
