package com.totalprj.movieverse.repository;

import com.totalprj.movieverse.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByEmail(String email);
    boolean existsByAlias(String alias);
    boolean existsByPhone(String phone);

    boolean existsByPassword(String password);
    Optional<Member> findByEmail(String email);
    Optional<Member> findByEmailAndPassword(String email, String password);
    // 월별 가입자 수를 조회하는 쿼리
    @Query(nativeQuery = true, value = "SELECT m.month, COUNT(u.member_id) AS count " +
            "FROM (SELECT DISTINCT MONTH(reg_date) AS month FROM member WHERE reg_date >= DATE_FORMAT(CURRENT_DATE - INTERVAL 1 YEAR, '%Y-%m-01')) m " +
            "LEFT JOIN member u ON MONTH(u.reg_date) = m.month AND u.reg_date >= DATE_FORMAT(CURRENT_DATE - INTERVAL 1 YEAR, '%Y-%m-01') " +
            "GROUP BY m.month ")
    List<Map<String, Object>> getMonthlySignupCount();


}