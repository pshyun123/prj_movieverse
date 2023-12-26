package com.totalprj.movieverse.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class CommentResDto {
    private Long commentId;
    private Long boardId;
    private String memberAlias;
    private String memberImage;
    private String commentContent;
    private LocalDateTime commentRegDate;
}
