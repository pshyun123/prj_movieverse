package com.totalprj.movieverse.repository;

import com.totalprj.movieverse.entity.Member;
import com.totalprj.movieverse.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Id;
import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    Optional<Movie> findByTitleAndDirectorNm(String title, String directorNm);
    boolean existsByTitleAndDirectorNm(String title, String directorNm);
    Optional<Movie> findByTitle(String title);
    List<Movie> findByTitleContaining(String title);

    @Query("SELECT m FROM Movie m WHERE " +
            "LOWER(m.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(m.titleEng) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(m.genre) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(m.nation) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(m.directorNm) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(m.actorNm) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(m.plotText) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Movie> findByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
