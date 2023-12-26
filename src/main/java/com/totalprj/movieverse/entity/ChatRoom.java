package com.totalprj.movieverse.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name="chat_room")
@ToString
@NoArgsConstructor
public class ChatRoom {
    @Id // 이 Id는 PRIMARY KEY로 들어가는것을 의미
    @Column(name="room_id")
    private String roomId;
    @Column(name="room_name")
    private String roomName;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
