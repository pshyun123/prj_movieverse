package com.totalprj.movieverse.repository;

import com.totalprj.movieverse.entity.Boxoffice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoxofficeRepository extends JpaRepository<Boxoffice, Long> {
}
