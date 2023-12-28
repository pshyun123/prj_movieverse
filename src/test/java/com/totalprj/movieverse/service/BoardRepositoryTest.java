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
import java.util.Optional;


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

    public Member createMemberInfo() {
        Member member = new Member();
        member.setEmail("test@gmail.com");
        member.setPassword("Test1234!");
        member.setName("테스트");
        member.setAlias("햄스터");
        member.setPhone("010-1234-5678");
        member.setAddr("서울시 강남구 역삼동");
        member.setRegDate(LocalDateTime.now());
        return member;
    }

    public Category createCategoryInfo() {
        Category category = new Category();
        category.setCategoryName("모임후기");
        return category;
    }

    @Test
    @DisplayName("게시글 카테고리 및 회원 정보 매핑 테스트")
    public void findCategoryAndMemberSaveTest() {
        Member member = createMemberInfo();
        memberRepository.save(member);
        Category category = createCategoryInfo();
        categoryRepository.save(category);

        Board board = new Board();
        board.setMember(member);
        board.setCategory(category);
        board.setGatherType("오프라인");
        board.setTitle("햄스터월드에서 햄스터를 만난 후기");
        board.setBoardContent("햄스터를 만나서 롤러코스터를 탔습니다!");
        board.setImage("햄스터이미지.jpg");
        board.setCount(0);
        boardRepository.save(board);

        em.flush();
        em.clear();


        // 게시글 리스트 조회 및 출력
        List<Board> boards = boardRepository.findAll();
        System.out.println("게시글 전체 개수: " + boards.size());

        System.out.println("게시글 리스트:");
        for (Board savedBoard : boards) {
            System.out.println("게시글 ID: " + savedBoard.getId() + ", 제목: " + savedBoard.getTitle());
        }
        Board savedBoard = boardRepository.findById(board.getId()).orElseThrow(EntityNotFoundException::new);

        System.out.println("savedBoard test 결과 : " + savedBoard);
    }

    @Test
    @DisplayName("특정 회원이 작성한 게시글 조회 테스트")
    public void findBoardsByMemberTest() {
        Member member = createMemberInfo();
        memberRepository.save(member);

        Category category = createCategoryInfo();
        categoryRepository.save(category);

        Board board1 = new Board();
        board1.setMember(member);
        board1.setCategory(category);
        board1.setGatherType("오프라인");
        board1.setTitle("햄스터 월드에서 햄스터를 만난 후기");
        board1.setBoardContent("햄스터를 만나서 롤러코스터를 탔습니다!");
        board1.setImage("햄스터 이미지1.jpg");
        board1.setCount(0);
        boardRepository.save(board1);

        Board board2 = new Board();
        board2.setMember(member);
        board2.setCategory(category);
        board2.setGatherType("온라인");
        board2.setTitle("온라인 모임 후기");
        board2.setBoardContent("온라인에서 모임을 가졌어요!");
        board2.setImage("온라인 모임 이미지.jpg");
        board2.setCount(0);
        boardRepository.save(board2);

        em.flush();
        em.clear();

        Optional<Member> savedMember = memberRepository.findById(member.getId());
        if (savedMember.isPresent()) {
            Member foundMember = savedMember.get();
            System.out.println("회원이 작성한 게시글 리스트: " + foundMember.getBoards());
        } else {
            throw new EntityNotFoundException("회원을 찾을 수 없습니다.");
        }

    }
}