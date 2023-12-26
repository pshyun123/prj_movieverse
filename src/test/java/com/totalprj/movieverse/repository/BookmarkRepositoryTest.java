package com.totalprj.movieverse.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Slf4j
@TestPropertySource(locations = "classpath:application-test.properties")
@RequiredArgsConstructor
class BookmarkRepositoryTest {

}