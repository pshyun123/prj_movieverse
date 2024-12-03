# **Movieverse** 
🔗 ** Movieverse 사이트**
https://movieverse2024.site/ </br>

🔗 **발표 PPT**
[무비버스 발표자료.pdf](https://github.com/user-attachments/files/17995880/default.pdf)

---

## 🔍 **프로젝트 소개** 
**Movieverse**는 현재 인기 있는 상영작 및 OTT별 영화 정보와 온/오프라인 영화 커뮤니티 서비스를 제공하는 플랫폼 **영화취향을 공유하고 소통할 수 있는 플랫폼**입니다.
 
### 📌 **Movieverse의 특징** 
1.	데이터 수집 및 크롤링
o	정해진 스케줄에 따라 Spring에서 Flask로 요청을 보내 크롤링 
o	KMDB(한국영화데이터베이스) API 활용하여 인기 영화 및 최신 영화 정보를 수집후 DB에 저장
2.	프론트엔드와의 통신
o	React의 요청에 맞춰 영화 정보를 반환하도록 설계.
3.	보안 강화
o	JWT(Json Web Token)을 사용해 사용자 정보를 암호화하고 인증/인가 처리.
o	로그인 후 일정 기간 경과 시 재로그인이 필요하도록 규칙 설정.
o	API Key와 같은 중요 정보는 환경변수를 사용하여 보안성 강화.
4.	결제 기능
o	모든 카드사를 지원하는 결제 시스템을 도입하여 사용자 편의성 증대.
5.	배포 및 인프라
o	AWS를 통해 배포하고, 가비아와 Route53으로 도메인 연결.
o	ACM(AWS Certificate Manager)에서 SSL 인증서를 발급받고, 로드밸런서를 사용해 HTTPS 연결 구성.
6.	모바일 앱 빌드 및 배포
o	React Native, WebView, Expo를 활용해 구글 플레이스토어용 앱 빌드.
o	20명의 비공개 테스터 모집 및 14일 연속 테스트 유지 조건 만족 후, 구글 플레이스토어에 앱 등록 완료.


---

### 📌 프로젝트에 포함 된 주요 기능
1.	인증 및 인가(JWT) 
2.	약관 동의 
3.	반응형 웹(모바일 대응) 
4.	외부 데이터 연동 
5.	파이썬 플라스크 활용 
6.	테스트 주도 개발 (스프링부트의 Junit5) 
7.	이메일 인증 
8.	결제 시스템 
9.	제3자 인증 인증 방식
10.	페이지네이션 / 무한 스크롤 
11.	웹소켓을 활용한 채팅 기능 
12.	리액트네이티브 적용 

- 배포
   - AWS 클라우드 서비스 배포
   -도메인 계정 등록(가비아)
---

### ⏰ 개발기간
2023.12.06 ~ 2024.01.05 
| 분류 | 날짜 | 
| :--- | :--- |
| 1. 주제, 요구사항 | 11/20 ~ 11/27 |
| 2. 스토리보드 | 12/1 ~ 12/05 |
| 3. DATABASE | 12/28 ~ 1/2|
| 4. FRONTEND | 12/4 ~ 12/28 |
| 5. BACKEND | 12/4 ~ 12/28 |
| 6. AWS | 1/3 ~ 1/4 |

 
---


## 👨‍👩‍👧‍👦 역할분담 
| 팀원 | 역할 |
| --- | --- |
| 김현지(팀장) | 로그인(카카오인증) / 회원가입,수정 / 채팅 / 관리자 - 게시판|
| 박소현 | 메인 / 게시판(프론트) / 결제 / 관리자 - 회원관리 |
| 이재원 | 영화정보크롤링 외 / 게시판(백) |
| 유현주 | 회원상세 / 404페이지 / 로그인 로딩페이지 / 관리자(FAQ) |
| 이세웅 | 게시글 상세페이지 + 댓글 / 게시글 작성 및 수정 페이지 |



## 👨‍👩‍👧‍👦 **나의 역할** 
### **1. 메인 페이지 ** 
![무비버스_메인](https://github.com/user-attachments/assets/cdcde227-3add-4a8b-8f9a-99ef4e53ef75)
- 스와이퍼(Swiper) 라이브러리를 활용하여 사용자 친화적인 영화 정보 제공
- 크롤링으로 수집한 최신 영화 정보를 OTT별로 정보를 가져올 수 있도록 처리
- Axios를 사용하여 영화 정보를 가져오는데 사용되는 영화 API 호출 - 스와이퍼 라이브러리를 커스터마이징(미디어 쿼리 등) 
- OTT 사이트(티빙, 넷플릭스, 왓챠) 별 영화정보를 useState로 상태관리

### **2. 결제 페이지** 
![무비버스_결제](https://github.com/user-attachments/assets/d225c6ae-97d4-4fdc-b866-49275b6ee4fe)
- 컴포넌트의 활용으로 재사용 가능한 코드 구현
- 실제 사용자의 정보를 받아 DB에 변경된 멤버십 내용을 저장. DB 업데이트 
- 멤버십 회원 여부에 따라 광고 배너 제거 
- NHN KCP 결제 방식 사용(Payment.jsx) 
 
### **3. 관리자 페이지 - 회원관리** 
![무비버스_관리자](https://github.com/user-attachments/assets/e1fd6b3d-a0ac-49ed-b342-0b1c771469b1)
- 차트 라이브러리를 활용(네이티브 쿼리 사용해 월별 가입자 수를 백에서 가져옴) 
- 페이지네이션 적용(백에서 회원정보가 10개씩 보내짐. 두번째 페이지부터는 순번이 11, 21…로 시작할 수 있도록 조정함) 
- map으로 반복할 요소는 컴포넌트화 하여 관리

- **차트 라이브러리 활용**: 가입자 현황을 월별로 볼 수 있는 차트로 시각화 
- **커스텀 훅 구현**: 로그인 상태 관리 및 자동 토큰 갱신(코드의 재사용성을 높이고, 애플리케이션의 안정성을 향상)
![관리자페이지](https://github.com/user-attachments/assets/dd468fc2-a59e-410f-bc14-b2a6a4a70102)

### **4. 게시판 페이지 -프론트** 
- 사용자의 편의를 고려한 UI, 상태관리, API 적용
- 게시판
![무비버스_게시판](https://github.com/user-attachments/assets/97293873-20af-4e7b-8cd8-0bda1eb9c9c6)

- 게시글 작성
![무비버스_새 게시글](https://github.com/user-attachments/assets/0af98e77-2b90-4a54-bcce-0abbf439f086)

- 게시글 상세보기
![무비버스_게시글 상세](https://github.com/user-attachments/assets/7fd4820d-fc23-443e-a377-ff3d33850abc)

## 📄 **문서 작업** 
프로젝트 진행에 있어, 협동성과 효율성을 높이기 위해 문서화 자료를 만들었습니다.아래는 프로젝트 동안 생성한 주요 문서의 일부입니다.
 
### 1. WBS (작업 분류 체계) 
<img width="1340" alt="wbs1" src="https://github.com/user-attachments/assets/c24e8275-67ed-4d13-8d4e-9755c0e6c6ae">
<img width="1469" alt="wbs2" src="https://github.com/user-attachments/assets/23d88587-c4a1-41a8-a6b5-bb8d03cfba8c">
### 2. 메뉴트리 / ERD 
![Menu tree](https://github.com/user-attachments/assets/ff4c87bd-f0ce-4e8a-921c-908be46de202)

![ERD-movieverse](https://github.com/user-attachments/assets/37662015-a0af-4c54-a805-f993dffc09fa)
### 3. 스토리보드 (Figma) 
![스토리보드](https://github.com/user-attachments/assets/cfa54e3d-80ee-4c6b-89f2-b87b970a2832)


### 4. 단위 테스트 결과 
<img width="1414" alt="단위테스트" src="https://github.com/user-attachments/assets/78b5b6d6-7938-4fe3-a817-4789f2227de0">
### 5. 애자일 - 스플린트 회의
<img width="677" alt="스플린트" src="https://github.com/user-attachments/assets/f0f0858d-2b13-408a-8428-f7d46e272a74">
 
#### ⚙️ **사용기술 및 환경**
| 분류 | 기술 | 
| --- | :--- | 
| 사용 언어 | HTML, CSS(SCSS), JavaScript(JSX) / Java / Python |
| 프론트엔드 라이브러리 | React |
| 백엔드 프레임워크 | Spring Boot - JPA / Flask | 
| RDBMS | MySQL | 
| 클라우드 스토리지 | Firebase Storage | 
| IDE | IntelliJ, VScode, MySQL WorkBench, DBeaver, Pycharm | 
| 협업 도구 | GitHub, Notion, Figma, Google Spreadsheet | 
| MockUp Tool | Figma | 
| 형상 관리 | Git, GitHub | 

---

