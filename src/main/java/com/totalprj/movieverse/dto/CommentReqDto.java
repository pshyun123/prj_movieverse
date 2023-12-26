package com.totalprj.movieverse.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CommentReqDto {
    private Long id;
    private Long boardId;
    private String commentContent;
}
