package com.totalprj.movieverse.service;

import com.totalprj.movieverse.dto.KakaoDto;
import com.totalprj.movieverse.entity.Kakao;
import com.totalprj.movieverse.repository.KakaoRepository;
import com.totalprj.movieverse.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;


import java.util.HashMap;
import java.util.Map;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class KakaoService {
    private final MemberRepository memberRepository;
    private final RestTemplate restTemplate;
    private final KakaoRepository kakaoRepository;
    public Map<String, Object> kakaoUserInfo (String kakaoToken) {
        Map<String, Object> kakaoInfo = new HashMap<>();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        headers.set("Authorization", "Bearer " + kakaoToken);

        String url = "https://kapi.kakao.com/v2/user/me";

        ResponseEntity<KakaoDto> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                KakaoDto.class
        );
        KakaoDto kakaoDto = responseEntity.getBody();
        boolean isExist = false;
        if (kakaoDto != null) {
            isExist = kakaoRepository.existsById(kakaoDto.getId());
            log.info("kakaoId exists? : {}",isExist);
            if(!isExist)saveKakaoEntity(kakaoDto);
            else {
                isExist = memberRepository.existsByEmail(kakaoDto.getKakaoAccount().getEmail());
            }
        }
        kakaoInfo.put("isMember", isExist);
        kakaoInfo.put("userInfo", kakaoDto);

        return kakaoInfo;
    }

    private void saveKakaoEntity(KakaoDto kakaoDto) {
        Kakao kakao = kakaoDto.toEntity();
        kakaoRepository.save(kakao);
    }

}