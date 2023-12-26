package com.totalprj.movieverse.service;

import com.totalprj.movieverse.dto.BoardReqDto;
import com.totalprj.movieverse.dto.BoardResDto;
import com.totalprj.movieverse.entity.Board;
import com.totalprj.movieverse.entity.Category;
import com.totalprj.movieverse.entity.Member;
import com.totalprj.movieverse.repository.BoardRepository;
import com.totalprj.movieverse.repository.CategoryRepository;
import com.totalprj.movieverse.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BoardService {
    private final BoardRepository boardRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;

    // 게시물 등록
    public boolean saveBoard(BoardReqDto boardReqDto, Long id) {
        try {
            Board board = new Board();
            Member member = memberRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("해당 회원이 존재하지 않습니다.")
            );
            Category category = categoryRepository.findByCategoryName(boardReqDto.getCategoryName()).orElseThrow(
                    () -> new RuntimeException("해당 카테고리가 존재하지 않습니다.")
            );
            board.setMember(member);
            board.setCategory(category);
            board.setGatherType(boardReqDto.getGatherType());
            board.setTitle(boardReqDto.getTitle());
            board.setImage(boardReqDto.getImage());
            board.setBoardContent(boardReqDto.getBoardContent());

            boardRepository.save(board);
            return true;
        } catch (Exception e) {
            log.error("저장 중 오류 : {}", (Object) e.getStackTrace());
            return false;
        }
    }

    // 게시물 전체 조회
    public List<BoardResDto> getBoardList() {
        List<Board> boards = boardRepository.findAll();
        List<BoardResDto> boardResDtos = new ArrayList<>();
        for (Board board : boards) {
            boardResDtos.add(convertEntityToDto(board));
        }
        return boardResDtos;
    }

    // 게시물 상세 조회
    public BoardResDto getBoardDetail(Long postId) {
        BoardResDto boardResDto = new BoardResDto();
        Board board = boardRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("해당하는 게시글이 없습니다."));
        boardResDto = convertEntityToDto(board);
        log.info("{}게시글 상세정보 추출 : ", boardResDto.getTitle());
        return boardResDto;
    }

    // 조회 수
    public boolean addCount(Long postId) {
        try {
            Board board = boardRepository.findById(postId)
                    .orElseThrow(() -> new RuntimeException("해당하는 게시글이 없습니다."));
            int count = board.getCount();
            board.setCount(count+1);
            boardRepository.save(board);
            return true;
        }catch (Exception e) {
            log.error("페이지수 증가 중 오류 : {}", (Object) e.getStackTrace());
            return false;
        }
    }

    // 게시글리스트 최신순 페이지네이션
    public List<BoardResDto> getRecentBoard(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("regDate"), Sort.Order.asc("title")));
        return boardRepository.findAll(pageable)
                .getContent()
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }


    // 게시물 삭제
    public boolean deleteBoard(Long id) {
        try {
            Board board = boardRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("해당 게시글이 존재하지 않습니다.")
            );
            boardRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            log.error("보드 삭제 중 오류 : {}", (Object) e.getStackTrace());
            return false;
        }
    }

    // 게시판 정보 수정
    public boolean modifyBoard(BoardReqDto boardReqDto) {
        try {
            Board board = boardRepository.findById(boardReqDto.getId()).orElseThrow(
                    () -> new RuntimeException("해당 게시글이 존재하지 않습니다."));
            Category category = categoryRepository.findByCategoryName(boardReqDto.getCategoryName()).orElseThrow(
                    () -> new RuntimeException("해당 카테고리가 존재하지 않습니다."));

            log.info("수정 category : {}", category.getCategoryName());

            // 값이 null이 아니면 업데이트, null이면 기존 값 유지
            if (boardReqDto.getCategoryName() != null) {
                board.setCategory(category);
            }
            if (boardReqDto.getGatherType() != null) {
                board.setGatherType(boardReqDto.getGatherType());
            }
            if (boardReqDto.getTitle() != null) {
                board.setTitle(boardReqDto.getTitle());
            }
            if (boardReqDto.getImage() != null) {
                board.setImage(boardReqDto.getImage());
            }
            if (boardReqDto.getBoardContent() != null) {
                board.setBoardContent(boardReqDto.getBoardContent());
            }

            boardRepository.save(board);
            return true;
        } catch (Exception e) {
            log.error("보드 수정 중 오류 : {}", (Object) e.getStackTrace());
            return false;
        }
    }


    // 게시글 엔티티를 DTO로 변환
    private BoardResDto convertEntityToDto (Board board) {
        BoardResDto boardResDto = new BoardResDto();
        boardResDto.setId(board.getId());
        boardResDto.setMemberAlias(board.getMember().getAlias());
        boardResDto.setMemberImage(board.getMember().getImage());
        boardResDto.setCategoryName(board.getCategory().getCategoryName());
        boardResDto.setTitle(board.getTitle());
        boardResDto.setBoardContent(board.getBoardContent());
        boardResDto.setImage(board.getImage());
        boardResDto.setGatherType(board.getGatherType());
        boardResDto.setRegDate(board.getRegdate());
        boardResDto.setCount(board.getCount());
        return boardResDto;
    }

    // 페이지네이션 관련
    public List<BoardResDto> getProcessedBoardList(int page, int size, String sort, String keyword, String categoryName, String gatherType) {
        List<BoardResDto> boardList = new ArrayList<>();

        if(sort.equalsIgnoreCase("recent")) {
            Pageable pageableRecent = PageRequest.of(page, size, Sort.by(Sort.Order.desc("regdate"), Sort.Order.asc("title")));
            // 검색어 있는 경우
            boardList = searchBoardList(keyword,categoryName, gatherType, pageableRecent);

        }else if (sort.equalsIgnoreCase("former")){
            Pageable pageableFormer = PageRequest.of(page, size, Sort.by(Sort.Order.asc("regdate"), Sort.Order.asc("title")));
            // 검색어 있는 경우
            boardList = searchBoardList(keyword,categoryName, gatherType, pageableFormer);
        }
        return boardList;
    }

    public List<BoardResDto> searchBoardList(String keyword, String categoryName, String gatherType, Pageable pageable) {
        Page<Board> boards = boardRepository.findByKeywordAndCategoryNameAndGatherType(
                keyword,
                categoryName,
                gatherType,
                pageable
        );
        return boards.stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    // 페이지 수 조회
    public int getBoardListPage(int page, int size, String keyword, String categoryName, String gatherType){
        Pageable pageable = PageRequest.of(page, size);
        Page<Board> boards = boardRepository.findByKeywordAndCategoryNameAndGatherType(
                keyword,
                categoryName,
                gatherType,
                pageable
        );
        int totalPages = boards.getTotalPages();

        if (totalPages > 0 && page >= totalPages) {

            return totalPages - 1;
        }

        return totalPages;
    }

    //회원이 작성한 보드/ 댓글 포함 보드 리스트
    public List<BoardResDto> searchMemBoardList(Long id, String type, int page, int size) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당하는 회원이 없습니다."));

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("regdate"), Sort.Order.asc("title")));

        List<BoardResDto> boardList = new ArrayList<>();
        if(type.equalsIgnoreCase("written")){
            Page<Board> boards = boardRepository.findByMember(member, pageable);
            boardList = boards.stream()
                    .map(this::convertEntityToDto)
                    .collect(Collectors.toList());
        }else if(type.equalsIgnoreCase("comment")) {
            Page<Board> boards = boardRepository.findByCommentingMember(member, pageable);
            boardList = boards.stream()
                    .map(this::convertEntityToDto)
                    .collect(Collectors.toList());
        }

        return boardList;
    }

    //회원이 작성한 보드/ 댓글 포함 보드 리스트 페이지 수
    public int searchMemBoardPage(Long id, String type, Pageable pageable){
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당하는 회원이 없습니다."));
        int totalPages = 0;
        if (type.equalsIgnoreCase("written")){
            Page<Board> boards = boardRepository.findByMember(member, pageable);
            totalPages = boards.getTotalPages();
        }else if (type.equalsIgnoreCase("comment")){
            Page<Board> boards = boardRepository.findByCommentingMember(member, pageable);
            totalPages = boards.getTotalPages();
        }
        return totalPages;
    }


    // admin 영역

    // 게시글 페이지네이션
    public List<BoardResDto> getAdminBoardList(int page, int size) {
        Pageable pageable = PageRequest.of(page,size);
        List<Board> boards = boardRepository.findAll(pageable).getContent();
        List<BoardResDto> boardList = new ArrayList<>();
        for(Board board : boards) {
            boardList.add(convertEntityToDto(board));
        }
        return boardList;
    }

    // 총 페이지 수
    public int getAdminBoardPage(Pageable pageable) {
        return boardRepository.findAll(pageable).getTotalPages();
    }

}
