package com.totalprj.movieverse.repository;

import com.totalprj.movieverse.entity.Board;
import com.totalprj.movieverse.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findByBoard(Board board, Pageable pageable);
    List<Comment> findByBoard(Board board);
}
