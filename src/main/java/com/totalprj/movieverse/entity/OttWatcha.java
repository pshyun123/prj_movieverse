package com.totalprj.movieverse.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="ott_watcha")
@Getter
@Setter
@NoArgsConstructor
public class OttWatcha {
    @Id
    @Column(name="watcha_id") // Watcha ID
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // 영화 ID 외래키
    @JoinColumn(name = "movie_id")
    private Movie movie;
}
