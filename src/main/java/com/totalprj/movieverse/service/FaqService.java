package com.totalprj.movieverse.service;

import com.totalprj.movieverse.dto.FaqDto;
import com.totalprj.movieverse.entity.Faq;
import com.totalprj.movieverse.repository.FaqRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FaqService {
    private final FaqRepository faqRepository;



    // faq 추가
    public boolean createFaq(FaqDto faqDto) {
        // Faq 객체 생성
        Faq faq = new Faq();
        faq.setFaqAnswer(faqDto.getFaqAnswer());
        faq.setFaqQuestion(faqDto.getFaqQuestion());
        // Faq 저장
        Faq saved = faqRepository.save(faq);
        // 저장된 Faq를 Dto로 변환

        log.info("savedFaq : {}", faqDto);
        return true;
    }


    // faq 수정
    public boolean reviseFaq(FaqDto faqDto) {
        try {
            Faq faq = faqRepository.findById(faqDto.getFaqId()).orElseThrow(
                    ()->new RuntimeException("수정할 게시글이 없습니다.")
            );

            // 수정할 내용을 설정
            faq.setFaqAnswer(faqDto.getFaqAnswer());
            faq.setFaqQuestion(faqDto.getFaqQuestion());

        // 수정된 Faq 저장
        Faq saved = faqRepository.save(faq);
            return true;
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }

    // faq 삭제
    public boolean deleteFaq(Long faqId){
        try {
            Faq faq = faqRepository.findById(faqId)
                    .orElseThrow(()->new RuntimeException("해당 게시글이 존재하지 않습니다"));

            faqRepository.delete(faq);

            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }


    // DB에서 FAQ 정보 가져오기
    public List<FaqDto> getFaqList(){
        List<Faq> faqs = faqRepository.findAll();  // Faq 테이블에서 모든 데이터를 조회
        List<FaqDto> faqDtoList = new ArrayList<>();  // FaqDto 객체를 담을 리스트 생성

        for (Faq faq : faqs) {  // 조회된 각각의 Faq 엔티티에 대해 반복함
            FaqDto faqDto = convertEntityToDto(faq);  // 엔티티를 Dto로 변환시켜줌
            faqDtoList.add(faqDto);  // 변환된 Dto를 리스트에 추가해줌
        }
        return faqDtoList;  // 최종적으로 Dto가 담긴 리스트를 반환
    }



    //엔티티를 Dto로 변환
    public FaqDto convertEntityToDto(Faq faq){
        FaqDto faqDto = new FaqDto();
        faqDto.setFaqId(faq.getFaqId());
        faqDto.setFaqAnswer(faq.getFaqAnswer());
        faqDto.setFaqQuestion(faq.getFaqQuestion());
        return faqDto;
    }
}
