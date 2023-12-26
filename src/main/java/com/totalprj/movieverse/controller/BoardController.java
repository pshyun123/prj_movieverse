package com.totalprj.movieverse.controller;

import com.totalprj.movieverse.dto.BoardReqDto;
import com.totalprj.movieverse.dto.BoardResDto;
import com.totalprj.movieverse.security.SecurityUtil;
import com.totalprj.movieverse.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @PostMapping("/new")
    public ResponseEntity<Boolean> saveNewBoard(@RequestBody BoardReqDto boardReqDto){
        log.info("새 게시글 저장 진입");
        Long id = SecurityUtil.getCurrentMemberId();
        return ResponseEntity.ok(boardService.saveBoard(boardReqDto, id));
    }

    // 게시글 전체 조회
    @GetMapping("/list")
    public ResponseEntity<List<BoardResDto>> boardList() {
        List<BoardResDto> list = boardService.getBoardList();
        return ResponseEntity.ok(list);
    }

    // 게시글 상세 조회
    // 질문 ! boardList는 Back주소인데 리액트랑 안맞아도 상관없는거 아닌가요?
    @GetMapping("/post/{postId}")
    public ResponseEntity<BoardResDto> boardDetail(@PathVariable Long postId) {
        log.info("게시판 게시글정보 조회 postId : {}", postId);
        BoardResDto boardResDto = boardService.getBoardDetail(postId);
        return ResponseEntity.ok(boardResDto);
    }

    @PutMapping("/post/counter")
    public ResponseEntity<Boolean> boardCounter(@RequestBody Long postId) {
        log.info("게시판 조회수 올리는 중 post Id : {}", postId);
        return ResponseEntity.ok(boardService.addCount(postId));
    }

    // 게시판 수정
    @PostMapping("/update")
    public ResponseEntity<Boolean> updateBoard(@RequestBody BoardReqDto boardReqDto) {
        log.info("boardReqDto : ", boardReqDto);
        return ResponseEntity.ok(boardService.modifyBoard(boardReqDto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteBoard(@PathVariable Long id){
        log.info("게시글 삭제 id : {}", id);
        return ResponseEntity.ok(boardService.deleteBoard(id));
    }


    // 게시글 총 페이지 수
    @GetMapping("/totalpages")
    public ResponseEntity<Integer> getBoardTotalPages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String categoryName,
            @RequestParam(required = false) String gatherType
    ) {
        log.info("totalpages 진입");
        int totalPages = boardService.getBoardListPage(page, size, keyword, categoryName, gatherType);
        log.info("보드 총 페이지 : {}", totalPages);
        return ResponseEntity.ok(totalPages);
    }
    // 게시글 리스트
    @GetMapping("/processedlist")
    public ResponseEntity<List<BoardResDto>> getProcessedBoardList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(defaultValue = "recent") String sort,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String categoryName,
            @RequestParam(required = false) String gatherType
    ) {
        List<BoardResDto> boardList = boardService.getProcessedBoardList(page, size, sort, keyword, categoryName, gatherType);
        return ResponseEntity.ok(boardList);
    }

    @GetMapping("/memboard/page")
    public ResponseEntity<Integer> getMemBoardPages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(defaultValue = "written") String type
    ){
        Long id = SecurityUtil.getCurrentMemberId();
        PageRequest pageRequest = PageRequest.of(page,size);
        int totalPages = boardService.searchMemBoardPage(id, type, pageRequest);
        return ResponseEntity.ok(totalPages);
    }

    @GetMapping("/memboard/list")
    public ResponseEntity<List<BoardResDto>> getMemBoardList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(defaultValue = "written") String type
    ){
        Long id = SecurityUtil.getCurrentMemberId();
        List<BoardResDto> memBoardList = boardService.searchMemBoardList(id, type, page, size);
        return ResponseEntity.ok(memBoardList);
    }

    // admin 영역
    // 게시글 페이지네이션
    @GetMapping("/admin/boardlist")
    public ResponseEntity<List<BoardResDto>> adminBoardList(@RequestParam (defaultValue = "0") int page,
                                                            @RequestParam (defaultValue = "10") int size){
        return ResponseEntity.ok(boardService.getAdminBoardList(page, size));
    }

    // 총 페이지 수
    @GetMapping("/admin/totalpage")
    public ResponseEntity<Integer> adminBoardPages(@RequestParam (defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "10") int size){
        PageRequest pageRequest = PageRequest.of(page,size);
        return ResponseEntity.ok(boardService.getAdminBoardPage(pageRequest));
    }


}
