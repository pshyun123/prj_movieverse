package com.totalprj.movieverse.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="ott_tving")
@Getter
@Setter
@NoArgsConstructor
public class OttTving {
    @Id
    @Column(name="tving_id") // Tving ID
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // 영화 ID 외래키
    @JoinColumn(name = "movie_id")
    private Movie movie;
}
