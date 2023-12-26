package com.totalprj.movieverse.service;

import com.totalprj.movieverse.dto.MovieSearchDto;
import com.totalprj.movieverse.entity.Bookmark;
import com.totalprj.movieverse.entity.Member;
import com.totalprj.movieverse.entity.Movie;
import com.totalprj.movieverse.repository.BookmarkRepository;
import com.totalprj.movieverse.repository.MemberRepository;
import com.totalprj.movieverse.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookmarkService {
    private final BookmarkRepository bookmarkRepository;
    private final MovieRepository movieRepository;
    private final MemberRepository memberRepository;
    private final MovieService movieService;

    // 북마크 여부 확인
    public boolean isBookMarked(Long memberId, Long movieId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재 하지 않습니다."));
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("영화가 존재 하지 않습니다."));

        boolean isBookMark = bookmarkRepository.existsByMemberAndMovie(member, movie);
        log.info("{} bookMarked {} ",movie.getTitle(), isBookMark );
        return isBookMark;
    }

    // 북마크 저장
    public boolean saveBookMark(Long memberId, Long movieId) {
        try {
            Member member = memberRepository.findById(memberId)
                    .orElseThrow(() -> new RuntimeException("해당 회원이 존재 하지 않습니다."));
            Movie movie = movieRepository.findById(movieId)
                    .orElseThrow(() -> new RuntimeException("영화가 존재 하지 않습니다."));

            Bookmark bookmark = new Bookmark();
            bookmark.setMember(member);
            bookmark.setMovie(movie);
            Bookmark saved = bookmarkRepository.save(bookmark);
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // 북마크 해제
    public boolean removeBookMark(Long memberId, Long movieId) {
        try {
            Member member = memberRepository.findById(memberId)
                    .orElseThrow(() -> new RuntimeException("해당 회원이 존재 하지 않습니다."));
            Movie movie = movieRepository.findById(movieId)
                    .orElseThrow(() -> new RuntimeException("영화가 존재 하지 않습니다."));

            Bookmark bookmark = bookmarkRepository.findByMemberAndMovie(member, movie)
                    .orElseThrow(() -> new RuntimeException("해당 북마크 정보가 없습니다."));

            bookmarkRepository.delete(bookmark);

            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    // 회원 북마크 정보 불러오기
    public List<MovieSearchDto> memberMovieList (Long id, int page, int size){
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재 하지 않습니다."));

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("id")));
        Page<Bookmark> bookmarks = bookmarkRepository.findAllByMember(member, pageable);

        List<MovieSearchDto> movieList = new ArrayList<>();

        for(Bookmark bookmark : bookmarks) {
            Movie movie = bookmark.getMovie();
            MovieSearchDto movieSearchDto = movieService.convertToMovieSearch(movie);
            movieList.add(movieSearchDto);
        }

        return movieList;
    }
}
