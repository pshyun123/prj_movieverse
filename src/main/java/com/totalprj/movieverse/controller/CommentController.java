package com.totalprj.movieverse.controller;

import com.totalprj.movieverse.dto.CommentReqDto;
import com.totalprj.movieverse.dto.CommentResDto;
import com.totalprj.movieverse.security.SecurityUtil;
import com.totalprj.movieverse.service.CommnetService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommnetService commnetService;

    // 댓글 저장
    @PostMapping("/new")
    public ResponseEntity<Boolean> saveNewComment(@RequestBody CommentReqDto commentReqDto) {
        log.info("댓글 저장 진입");
        Long id = SecurityUtil.getCurrentMemberId();
        return ResponseEntity.ok(commnetService.saveComment(commentReqDto, id));
    }

    //댓글 전체 리스트 조회
    @GetMapping("/{id}")
    public ResponseEntity<List<CommentResDto>> commentList(@PathVariable Long id) {
        List<CommentResDto> list = commnetService.getCommentList(id);
        return ResponseEntity.ok(list);
    }

    // 댓글 수정
    @PostMapping("/modify")
    public ResponseEntity<Boolean> commentModify(@RequestBody CommentReqDto commentReqDto) {
        boolean result = commnetService.commentModify(commentReqDto);
        return ResponseEntity.ok(result);
    }

    // 댓글 삭제
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> commentDelete(@PathVariable Long id) {
        boolean result = commnetService.commentDelete(id);
        return ResponseEntity.ok(result);
    }

    // 댓글 총 페이지 수
    @GetMapping("/page/{boardId}")
    public ResponseEntity<Integer> commentPageCount(@PathVariable Long boardId,
                                                    @RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "5") int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        int pageCnt = commnetService.getCommentPage(pageRequest, boardId);
        return ResponseEntity.ok(pageCnt);
    }

    // 댓글 페이지네이션
    @GetMapping("/page/list/{boardId}")
    public ResponseEntity<List<CommentResDto>> commentPageList(@PathVariable Long boardId,
                                                               @RequestParam(defaultValue = "0") int page,
                                                               @RequestParam(defaultValue = "5") int size) {
        List<CommentResDto> list = commnetService.getCommentPageList(page, size, boardId);
        return ResponseEntity.ok(list);
    }

}