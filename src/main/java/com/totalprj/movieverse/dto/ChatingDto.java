package com.totalprj.movieverse.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter@Setter
public class ChatingDto {
    private Long chattingId;
    private String roomName;
    private LocalDateTime createdAt;
}
