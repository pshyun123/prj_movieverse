package com.totalprj.movieverse.repository;

import com.totalprj.movieverse.entity.Admin;
import com.totalprj.movieverse.entity.RefreshTokenAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RefreshTokenAdminRepository extends JpaRepository<RefreshTokenAdmin, Long> {
    boolean existsByRefreshToken(String refreshToken);
    boolean existsByAdmin(Admin admin);

    @Modifying
    @Query("DELETE FROM RefreshTokenAdmin r WHERE r.admin = :admin")
    void deleteByAdmin(@Param("admin")Admin admin);
}
