package com.totalprj.movieverse.service;

import com.totalprj.movieverse.entity.ChatRoom;
import com.totalprj.movieverse.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@Transactional
@Slf4j
@RequiredArgsConstructor
@TestPropertySource(locations = "classpath:application-test.properties")
public class ChatRoomRepositoryTest {

    @Autowired
    ChatRoomRepository chatRoomRepository;

    @PersistenceContext
    EntityManager em;

    @Test
    @DisplayName("모든 채팅방 목록 조회")
    public void findAllChatRoomListTest(){

        //채팅방 목록 생성
        ChatRoom chatRoom1 = new ChatRoom();
        chatRoom1.setRoomName("채팅방1");
        chatRoom1.setRoomId("1234jdkf");
        chatRoom1.setCreatedAt(LocalDateTime.now());
        chatRoomRepository.save(chatRoom1);

        ChatRoom chatRoom2 = new ChatRoom();
        chatRoom2.setRoomName("채팅방2");
        chatRoom2.setRoomId("5678qhej");
        chatRoom2.setCreatedAt(LocalDateTime.now());
        chatRoomRepository.save(chatRoom2);


        // 채팅방 목록 조회
        List<ChatRoom> chatRoomList = chatRoomRepository.findAll();

        // 채팅 목록 내용 확인
        assertNotNull(chatRoomList);
        assertEquals(2, chatRoomList.size());
        assertEquals("채팅방1",chatRoomList.get(0).getRoomName());
        assertEquals("채팅방2", chatRoomList.get(1).getRoomName());

        // 조회된 목록 출력
        System.out.println("모든 채팅방 개수: " + chatRoomList.size());
        System.out.println("모든 채팅방 목록: " + chatRoomList);
        }
    }
