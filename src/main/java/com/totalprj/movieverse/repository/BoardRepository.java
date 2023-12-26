package com.totalprj.movieverse.repository;

import com.totalprj.movieverse.entity.Board;
import com.totalprj.movieverse.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findAll(Pageable pageable);

    @Query("SELECT b FROM Board b WHERE " +
            "(:keyword IS NULL OR (:keyword IS NOT NULL AND " +
            "(LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(b.boardContent) LIKE LOWER(CONCAT('%', :keyword, '%'))))) AND " +
            "LOWER(b.category.categoryName) LIKE LOWER(CONCAT('%', :categoryName, '%')) AND " +
            "LOWER(b.gatherType) LIKE LOWER(CONCAT('%', :gatherType, '%'))")
    Page<Board> findByKeywordAndCategoryNameAndGatherType(
            @Param("keyword") String keyword,
            @Param("categoryName") String categoryName,
            @Param("gatherType") String gatherType,
            Pageable pageable
    );

    // 회원이 작성한 보드
    Page<Board> findByMember(Member member, Pageable pageable);

    // 회원이 작성한 댓글이 포함된 보드
    @Query("SELECT b FROM Board b " +
            "WHERE b.id IN (SELECT c.board.id FROM Comment c WHERE c.member = :member)")
    Page<Board> findByCommentingMember(@Param("member") Member member, Pageable pageable);

}