package com.totalprj.movieverse.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "board")
@Getter
@Setter
@ToString
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "board_id")
    private Long id;

    // 회원
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // 카테고리 (대분류)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    // 소분류
    @Column(name = "gather_type")
    private String gatherType;

    // 댓글
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    // 제목
    @Column(name = "board_title", nullable = false)
    private String title;
    
    // 내용
    @Column(name = "board_content", nullable = false, columnDefinition = "TEXT")
    private String boardContent;

    // 이미지
    private String image;

    // 조회수
    private int count;

    // 등록 날짜
    @Column(name = "registration_date")
    private LocalDateTime regdate;

    @PrePersist
    public void prepersist() {regdate = LocalDateTime.now();}

}
