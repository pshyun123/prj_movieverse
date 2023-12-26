package com.totalprj.movieverse.repository;

import com.totalprj.movieverse.entity.Bookmark;
import com.totalprj.movieverse.entity.Member;
import com.totalprj.movieverse.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Book;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    boolean existsByMemberAndMovie(Member member, Movie movie);
    Optional<Bookmark> findByMemberAndMovie(Member member, Movie movie);

//    List<Bookmark> findAllByMember(Member member);
    Page<Bookmark> findAllByMember(Member member, Pageable pageable);
}
