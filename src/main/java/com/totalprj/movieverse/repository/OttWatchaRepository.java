package com.totalprj.movieverse.repository;

import com.totalprj.movieverse.entity.OttWatcha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OttWatchaRepository extends JpaRepository<OttWatcha, Long> {
}
