package com.totalprj.movieverse.repository;

import com.totalprj.movieverse.entity.OttTving;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OttTvingRepository extends JpaRepository<OttTving, Long> {
}
