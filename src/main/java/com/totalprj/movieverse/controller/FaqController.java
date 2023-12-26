package com.totalprj.movieverse.controller;

import com.totalprj.movieverse.dto.FaqDto;
import com.totalprj.movieverse.security.SecurityUtil;
import com.totalprj.movieverse.service.FaqService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@Slf4j
@RequestMapping("/faq")
@RequiredArgsConstructor
public class FaqController {
    private final FaqService faqService;

    // FAQ목록 보기
    @GetMapping("/list")
    public ResponseEntity<List<FaqDto>> getFaqList(){
        log.info("faq리스트 조회 진입");
        return ResponseEntity.ok(faqService.getFaqList());
    }

    // FAQ 추가
    @PostMapping("/new")
    public ResponseEntity<Boolean> createFaq(@RequestBody FaqDto faqDto){
        log.info("FAQ 저장하기: {}", faqDto);
        return ResponseEntity.ok(faqService.createFaq(faqDto)); // 저장된 faq dto 반환

    }

    // FAQ 수정
    @PostMapping("/revise")
    public ResponseEntity<Boolean> reviseFaq(@RequestBody FaqDto faqDto){
        log.info("FAQ 수정하기 {}", faqDto);
        return ResponseEntity.ok(faqService.reviseFaq(faqDto));
    }

    // FAQ 삭제
    @DeleteMapping("/delete/{faqId}")
    ResponseEntity<Boolean> deleteFaq(@PathVariable Long faqId) {
        log.info("FAQ 삭제하기 {}");
        return ResponseEntity.ok(faqService.deleteFaq(faqId));
    }
}
