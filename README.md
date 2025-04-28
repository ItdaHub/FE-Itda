# Itda-소설 이어쓰기 웹사이트
누구나 쉽게 참여할 수 있는 소설 이어달리기 플랫폼입니다.

<br>

## 🔗목차

1. [기술스택](#기술-스택)
2. [프로젝트 목적](#프로젝트-목적)
3. [기능정의서](#기능정의서)
4. [ERD 다이어그램](#ERD-다이어그램)
5. [페이지별 기능](#페이지별-기능)
6. [사용된 라이브러리 및 API](#사용된-라이브러리-및-API)

<br>
<br>

## 🛠기술 스택

<h3>Frontend</h3>
<div style="display: flex; gap: 10px; flex-wrap: wrap;">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Styled--Components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white" />
</div>

<h3>Backend & Database</h3>
<div style="display: flex; gap: 10px; flex-wrap: wrap;">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
</div>

<h3>Development Tools</h3>
<div style="display: flex; gap: 10px; flex-wrap: wrap;">
  <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" />
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
</div>

<br/>

## 📚프로젝트 목적
창작자와 소비자 구분 없이 누구나 쉽게 참여하고 협력할 수 있는 참여형 콘텐츠를 제공합니다. <br/>
신선한 아이디어와 재미를 바탕으로, 모든 사용자가 창작의 즐거움을 경험하며, 함께 소설을 만들어가는 과정을 제공하는 것이 목표입니다.


<br/>

## 📆프로젝트 기간
* **진행 기간**: 2025.04.03-2025.04.25
* **총 작업 기간**: 약 3주
  
<br/>

## 👨‍👩‍👧‍👦프로젝트 팀원

| 이름       | 역할                  | GitHub                           |
|------------|-----------------------|----------------------------------|
| 권태연     | 프론트엔드 개발         | [Taetea1](https://github.com/Taetea1) |
| 박소현     | 프론트엔드 개발         | [rmfnxm23](https://github.com/rmfnxm23) |
| 손한별     | 백엔드 개발 / 팀장      | [HanbyeolSon74](https://github.com/HanbyeolSon74)|

<br/>
<br/>
 
## 🗒️기능정의서
<img width="839" alt="Image" src="https://github.com/user-attachments/assets/7f4bf837-063a-4010-bc4c-07a0f2fcb408" />

<br/>
<br/>

## 📐ERD 다이어그램
![Image](https://github.com/user-attachments/assets/59575b3b-7150-42b3-90ac-d7ab15b31da4)
<br/>
<br/>

## 💡페이지별 기능

### 메인 페이지
1. 메인 페이지
<img width="800" alt="Image" src="https://github.com/user-attachments/assets/684420bf-c621-4ebe-bafd-3f6b76ab9494" />

- 관리자에 등록된 배너가 5초마다 자동 스와이퍼
- 카테고리 클릭시 해당 카테고리 게시글만 필터링 (이어쓰기는 미완결 작품)
- 장르 클릭 시 해당 장르의 게시글만 필터링
- 모든 작품의 조회수와 찜의 갯수 합산하여 상위 10개만 표시 
- 연령별 인기작 현재년도와 출생년도를 계산하여 추정한 연령대별 조회수와 찜의 갯수 합산하여 상위 10개만 표시
- top 버튼 클릭 시 상단 이동


<br/>
<br/>

2. 새로쓰기

![Image](https://github.com/user-attachments/assets/d0b7d35f-5b2c-4941-8f22-4f51ddf2b6b0)

- 소설을 쓰는 첫 주자는 장르와 함께 이어쓰기를 할 인원수 선택, 제목과 내용 입력 가능
- 소설을 쓰는 첫 주자는 AI를 통해 첫 화 줄거리 추천 제공
- 소설을 쓰는 첫 화에선 AI를 이용해 요약한 키워드로 검색 후 작품 이미지를 가져옴

<br/>
<br/>

### 작품 회차정보 페이지

<img width="800" alt="Image" src="https://github.com/user-attachments/assets/addebd4c-301c-46fb-8b87-7fb7b129d8b3" />

- 찜 버튼으로 관심있는 작품 표시
- 공유 버튼으로 카카오톡에 해당 사이트 공유 가능 (카카오톡 로그인 필요)
- 정렬 기능 : 작품의 회차를 최신순 또는 1화부터 정렬
- 댓글, 대댓글 입력 가능
- 댓글 신고 가능 (회원자에 한해서 가능, 중복 신고 불가)

<br/>
<br/>

![Image](https://github.com/user-attachments/assets/6c4a0cf9-fa9d-481d-8c74-7fc8a75a92ba)

- 함께하기 클릭 시 다음화 작성하는 페이지로 이동
- 한번 이어쓴 작품은 중복해서 참여 불가

<br/>
<br/>

![Image](https://github.com/user-attachments/assets/9f9efc20-b93c-461a-bb75-87faa0c8e8f8)

- 마지막 회차 작성시 관리자에게 출품 요청

<br/>
<br/>

![Image](https://github.com/user-attachments/assets/16532d0d-14e5-4db7-98e5-07fa9b44f0af)

- 해당 작품이 출품작일 경우 1화만 무료
- 해당 작품의 회차 구매시 구매한 회차 소장


<br/>
<br/>

### 회차 내용 보기 페이지

![Image](https://github.com/user-attachments/assets/58377f72-d256-4f4b-8e42-69daf9122962)

- 회차마다 내용, 작가, 댓글 확인 가능
- 댓글, 대댓글 입력 가능

<br/>
<br/>

![Image](https://github.com/user-attachments/assets/107b4cc7-63a1-4eff-b92c-4cbe17b96745)

- 해당 회차 신고 가능 (회원자에 한해서 가능, 중복 신고 불가)


<br/>
<br/>

![Image](https://github.com/user-attachments/assets/9e4fee3d-e5ef-4f92-9373-119fe53965c0)

- 댓글 신고 가능(작품의 전체 댓글, 작품의 상세 회차 댓글)


<br/>
<br/>

![Image](https://github.com/user-attachments/assets/f22d92f0-ee26-4267-b5e2-1f96154d588d)

- 댓글 삭제 가능(작품의 전체 댓글, 작품의 상세 회차 댓글)


<br/>
<br/>


### 댓글 내역 페이지

![Image](https://github.com/user-attachments/assets/c5cb36ea-1c6f-4cc2-8766-dcb29c343c44)

- 내가 쓴 댓글 표시
- 댓글 삭제 가능


<br/>
<br/>

### 팝콘 내역 페이지

![Image](https://github.com/user-attachments/assets/252bf394-8bfa-4b34-baa2-581b417cdd8b)

- 내가 결제, 사용한 내역 표시
- 팝콘 충전 버튼 : 토스API를 활용하여 선택한 팝콘 (사이트에서 통용되는 단위) 충전 가능


<br/>
<br/>

###  내 찜 & 내 글 페이지

![Image](https://github.com/user-attachments/assets/6af5f913-7076-4b70-95ff-0c560de0abeb)

- 내가 관심있는 작품 표시
- 내가 참여한 작품 표시
  
<br/>
<br/>

### 내 정보 페이지

<img width="1271" alt="Image" src="https://github.com/user-attachments/assets/be5b89cf-a8af-4104-ac46-ef4889795ed6" />

- 내 정보 확인
- 비밀번호, 전화번호 변경 가능
- 회원탈퇴, 로그아웃 가능

![Image](https://github.com/user-attachments/assets/50727a16-4638-42d3-8f5c-566634fc5193)

- 내 프로필 및 닉네임 수정 가능

<br/>
<br/>

### 회원가입
| 이용약관   | 회원가입                  |
|------------|-----------------------|
|   <img width="424" alt="Image" src="https://github.com/user-attachments/assets/9908b064-7601-4518-9bda-b03760bf0e33" />  |    <img width="403" alt="Image" src="https://github.com/user-attachments/assets/886ba8a4-ac87-4fe5-acff-c5927a2e4df4" />     |

- 이용약관 필수 항목 동의 후 회원가입 입력 창으로 이동
- 아이디, 닉네임 중복검사

<br/>
<br/>

### 로그인
<img width="800" alt="Image" src="https://github.com/user-attachments/assets/eb46775e-0dde-4aea-a880-a0bc10241865" />

- 로컬 로그인 : 입력한 ID, 비밀번호를 검증하여 로그인 접속 여부 확인
- SNS 로그인 : 네이버, 카카오, 구글 API활용

<br/>
<br/>

### ID 찾기

![Image](https://github.com/user-attachments/assets/f65f83e8-fe11-4875-9983-f58afe83864a)

- 가입 시 입력한 전화번호로 ID찾기 

<br/>
<br/>

### PW 찾기

![Image](https://github.com/user-attachments/assets/276632eb-c5e3-4397-81c8-21aa44c9c26c)

<br/>

![Image](https://github.com/user-attachments/assets/235c3d0a-8fc0-4bb0-b7b6-e535292764e5)

-  ID로 본인 인증 후 등록된 이메일로 비밀번호 재설정 링크를 통해 비밀번호 변경

<br/>
<br/>
<br/>


### 검색

![Image](https://github.com/user-attachments/assets/9aed038f-ee06-4ce3-ae9b-7ae0961bb98b)

- 검색 기능 제공 (제목에 키워드가 포함된 게시글 출력)

<br/>
<br/>

### 공지사항

![Image](https://github.com/user-attachments/assets/eca5ace5-3e3d-4917-ab5d-5413c543056e)

- 관리자에 등록된 공지사항을 우선순위, 최신순으로 표시
- 공지사항이 있다면 빨간점 표시
- antd 라이브러리의 dropdown을 활용하여 공지 내용 자세히 보기

<br/>
<br/>

### 알림

![Image](https://github.com/user-attachments/assets/7c62a613-db82-4416-a76c-60be082578ed)

- 사용자에 따라 출품한 작품이나 신고처리에 대한 알림을 표시
- 알림의 갯수 표시
- antd 라이브러리의 dropdown을 활용하여 공지 내용 자세히 보기

<br/>
<br/>

### 다크모드

<img width="800" alt="Image" src="https://github.com/user-attachments/assets/40fde156-be1f-4e46-9d36-66a67c91ac21" />

- 화면의 색상 반전

<br/>
<br/>
<br/>

## 💡 반응형

| 반응형   | 반응형 메뉴                  |
|------------|-----------------------|
|  <img width="317" alt="Image" src="https://github.com/user-attachments/assets/84ba6ecb-f7ab-4a35-b37e-079fb68df539" />  | <img width="320" alt="Image" src="https://github.com/user-attachments/assets/d755e79d-8c53-4167-b076-9280e7bc848b" />   |

- 768px(테블릿크기)부터 모바일 반응형
- TOP버튼 -> 새로쓰기 버튼으로 교체
- 네비게이션바가 하단에 생성
- 모바일용 메뉴 생성

<br/>
<br/>
<br/>

## 📑사용된 라이브러리 및 API
**라이브러리**
- Ant Design & Material UI: UI 컴포넌트
- Swiper: 슬라이더
- Axios: HTTP 요청
- JS-Cookie: 쿠키 처리
- Bcrypt: 비밀번호 해싱
- Multer: 파일 업로드
- Passport: 인증 미들웨어
- react-responsive: 반응형 웹
- Swagger: API 문서화
- formik: 폼 관리

**API**
- 토스페이먼츠 API: 결제
- 소셜로그인 API: 카카오, 구글, 네이버
- 카카오톡공유 API
- Unsplash: 이미지 제공
- Nodemailer: 이메일 발송
- Gemini: 글 작성 및 요약

