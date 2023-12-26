package com.totalprj.movieverse.repository;

import com.totalprj.movieverse.entity.OttNetflix;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OttNetflixRepository extends JpaRepository<OttNetflix, Long> {
}
