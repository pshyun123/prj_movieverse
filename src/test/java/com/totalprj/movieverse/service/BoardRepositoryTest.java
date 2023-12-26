package com.totalprj.movieverse.service;

import com.totalprj.movieverse.entity.Board;
import com.totalprj.movieverse.entity.Category;
import com.totalprj.movieverse.entity.Member;
import com.totalprj.movieverse.repository.BoardRepository;
import com.totalprj.movieverse.repository.CategoryRepository;
import com.totalprj.movieverse.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Slf4j
@RequiredArgsConstructor
@TestPropertySource(locations = "classpath:application-test.properties")
public class BoardRepositoryTest {
    @Autowired
    BoardRepository boardRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    MemberRepository memberRepository;

    @PersistenceContext
    EntityManager em;

    // 회원 정보 생성
//    public Member createMemberInfo() {
//        Member member = new Member();
//        member.setEmail("test@gmail.com");
//        member.setPassword("Test1234!");
//        member.setName("테스트");
//        member.setAlias("햄스터");
//        member.setPhone("010-1234-5678");
//        member.setAddr("서울시 강남구 역삼동");
//        member.setRegDate(LocalDateTime.now());
//        return member;
//    }
//
//    // 카테고리 정보 생성
//    public Category createCategoryInfo(){
//        Category category = new Category();
//        category.setCategoryName("모임후기");
//        return category;
//    }
//
//
//    @Test
//    @DisplayName("게시글 카테고리 및 회원 정보 매핑 테스트")
//    public void findCategoryAndMemberSaveTest(){
//        Member member = createMemberInfo();
//        memberRepository.save(member);
//        Category category = createCategoryInfo();
//        categoryRepository.save(category);
//
//        Board board = new Board();
//        board.setMember(member);
//        board.setCategory(category);
//        board.setGatherType("오프라인");
//        board.setTitle("햄스터월드에서 햄스터를 만난 후기");
//        board.setBoardContent("햄스터를 만나서 롤러코스터를 탔습니다!");
//        board.setImage("햄스터이미지.jpg");
//        board.setCount(0);
//        boardRepository.save(board);
//
//        em.flush();
//        em.clear();
//
//        Board savedBoard = boardRepository.findById(board.getId()).orElseThrow(EntityNotFoundException::new);
//
//        System.out.println("savedBoard test 결과 : " + savedBoard);
//    }
//
//
//    // 게시글 정보 생성
//    private Board createBoardInfo(Member member, Category category, String title, String content) {
//        Board board = new Board();
//        board.setMember(member);
//        board.setCategory(category);
//        board.setGatherType("오프라인");
//        board.setTitle(title);
//        board.setBoardContent(content);
//        board.setImage("햄스터이미지.jpg");
//        board.setCount(0);
//        return board;
//    }
//
//    @Test
//    @DisplayName("게시글 전체 조회")
//    public void findAllBoardsTest() {
//        Member member = createMemberInfo();
//        memberRepository.save(member);
//
//        Category category = createCategoryInfo();
//        categoryRepository.save(category);
//
//        Board board1 = createBoardInfo(member, category, "게시글 1", "게시글 내용 1");
//        boardRepository.save(board1);
//
//        Board board2 = createBoardInfo(member, category, "게시글 2", "게시글 내용 2");
//        boardRepository.save(board2);
//
//        List<Board> boards = boardRepository.findAll();
//
//        assertNotNull(boards);
//        assertEquals(2, boards.size());
//        assertEquals("게시글 1", boards.get(0).getTitle());
//        assertEquals("게시글 2", boards.get(1).getTitle());
//
//        System.out.println("전체 게시글 개수: " + boards.size());
//        System.out.println("전체 게시글 조회 결과: " + boards);
//    }
//
//    @Test
//    @DisplayName("게시글 상세 조회 테스트")
//    public void findBoardByIdTest() {
//        Member member = createMemberInfo();
//        memberRepository.save(member);
//
//        Category category = createCategoryInfo();
//        categoryRepository.save(category);
//
//        Board board = createBoardInfo(member, category, "게시글 제목", "게시글 내용");
//        boardRepository.save(board);
//
//        Board foundBoard = boardRepository.findById(board.getId()).orElse(null);
//
//        assertNotNull(foundBoard);
//        assertEquals("게시글 제목", foundBoard.getTitle());
//        assertEquals("게시글 내용", foundBoard.getBoardContent());
//
//        System.out.println("게시글 상세 조회 결과: " + foundBoard);
//    }

}
