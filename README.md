# 🤝 Coworkers

```
팀별 업무 공유와 사내 커뮤니케이션이 모두 가능한 To-do 리스트 기반 협업 툴
```
<img width="1837" height="3806" alt="screencapture-coworkers-three-vercel-app-2025-12-01-15_49_13" src="https://github.com/user-attachments/assets/87063286-3d2e-4c89-81ee-9ac0f7ce39f1" />

 
---

## 🔗 배포 링크

https://coworkers-three.vercel.app

---

## ✨ 주요 기능 (Features)

- 업무 생성 및 공유
![업무 등록 및 공유](https://github.com/user-attachments/assets/0b1ab244-ee82-4708-9e9d-06810c94bd44)
- 팀 생성, 팀 초대, 팀 관리
  - 팀 생성
  ![팀 생성](https://github.com/user-attachments/assets/8534d37f-81a5-43a1-b674-58729832cd40)
  - 팀 초대/가입
  ![팀 초대 + 가입](https://github.com/user-attachments/assets/8cd97ff3-4998-4977-a713-7cba0d7fe977)
  - 팀 관리
  ![팀 관리](https://github.com/user-attachments/assets/28abba8c-1967-4763-acaa-e1eb32d87c1c)
- 인증 시스템
  ![카카오 간편 로그인](https://github.com/user-attachments/assets/19aa704d-1e48-4f7e-8bbf-9a53971945ee)
- 데이터 시각화
  ![데이터 시각화](https://github.com/user-attachments/assets/93a214d6-17b2-4fdf-98ec-8ecd9dbd8d2b)
- 자유게시판
  ![글 등록](https://github.com/user-attachments/assets/de471477-8291-4540-a55b-9c2bd17b7866)




---

## 📚 기술 스택 

- **Frontend:**
  
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/react rouder dom-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/zod-408AFF?style=for-the-badge&logo=zod&logoColor=white"> <img src="https://img.shields.io/badge/react hook form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=black"> <img src="https://img.shields.io/badge/jotai-171717?style=for-the-badge&logoColor=white"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/react query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white"> <img src="https://img.shields.io/badge/swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white">
- **Build:**
  <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
- **Deploy:**
   <img src="https://img.shields.io/badge/vercel-000?style=for-the-badge&logo=vercel&logoColor=white">
- **Style:**
   <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white"> <img src="https://img.shields.io/badge/framer motion-0055FF?style=for-the-badge&logo=framer&logoColor=white">
- **Etc:**
   <img src="https://img.shields.io/badge/immer-00E7C3?style=for-the-badge&logo=immer&logoColor=black"> <img src="https://img.shields.io/badge/date fns-770C56?style=for-the-badge&logo=datefns&logoColor=white">

---

## 📁 프로젝트 구조 

```
src
 ┣ api/
 ┃  ┣ mutations.ts    // 뮤테이션 팩토리
 ┃  ┗ queries.ts      // 쿼리 팩토리
 ┣ assets/
 ┃  ┣ fonts/
 ┃  ┣ icons/
 ┃  ┗ images/
 ┣ components/
 ┃  ┣ feature/
 ┃  ┣ layout/
 ┃  ┗ ui/             // 공용 컴포넌트
 ┣ constants/         // 상수 선언
 ┣ hooks/
 ┣ lib/               // 라이브러리 관련 유틸 함수 (axios, shadcn/ui)
 ┣ pages/
 ┣ store/             // jotai atoms
 ┣ stories/           // 스토리북 stories
 ┣ styles/
 ┣ types/             // 타입, rhf 스키마 선언
 ┣ utils/             // 공용 유틸 함수
 ┣ App.tsx            // QueryProvider, RouterProvider 적용
 ┣ main.tsx
 ┗ routes.tsx         // 라우팅
```

---

## 📐 아키텍처 설계

### 6-1. React Query 쿼리 팩토리 적용 (캐싱 전략 최적화)

**문제 상황**
- 동일한 API 호출이 여러 컴포넌트에서 중복 발생
- 쿼리 키 관리가 일관성 없이 산재되어 유지보수 어려움

**해결 방법**
- Query Factory 패턴 도입으로 쿼리 키 중앙 관리
- `queries.ts` 내에서 도메인별로 query key 분리 및 구조화

**결과**
- 캐시 무효화 로직이 명확해져 버그 감소
- 쿼리 키들이 하나의 파일에 모여있어 유지보수성 증가
- UI로부터 리액트 쿼리 로직 분리 → 컴포넌트 가독성 개선

### 6-2. 가벼운 전역 상태 관리 라이브러리 채택: Jotai
| 기준 | Redux Toolkit | Zustand | Jotai |
|------|--------------|---------|-------|
| 번들 사이즈 | ❌ 큼 | ✅ 작음 | ✅ 매우 작음 |
| 학습 곡선 | ❌ 가파름 | ✅ 완만 | ⚠️ 중간 |
| React Query 호환 | ⚠️ 보통 | ✅ 좋음 | ✅ 매우 좋음 |

→ 서버 상태는 React Query, 클라이언트 전역 상태는 atom으로 관리

### 6-3. UI 컴포넌트 생산성 향상: Storybook
- Storybook을 통한 공용 컴포넌트 문서화
  - 동일한 컴포넌트를 새로 만드는 상황 방지
  - 버그 발견 시점 조기화 (UI 테스트를 Storybook에서 선행)
  - 공용 컴포넌트 관련 커뮤니케이션 비용 감소 (Storybook URL 공유로 실시간 확인)
  <img width="1920" height="1164" alt="screencapture-68ef91e772aea43f738ab7f2-kihlgfhrwc-chromatic-2025-12-01-15_27_59" src="https://github.com/user-attachments/assets/1febebc7-7c21-486c-9a63-3ac9d5d732c8" />


---


## ⚙ 설치 및 실행

```
git clone https://github.com/asksa1256/coworkers.git .
pnpm i
pnpm run dev
```

---

## 🎯 트러블슈팅 
- [트러블슈팅 모음](./docs/TROUBLESHOOTING.md)

---

## 📈 개선 계획

- 다크모드 추가
- 성능 최적화 (Lighthouse 지표 개선 등): [성능 최적화 과정](./docs/PERFORMANCE.md)

---

## 👥 팀원 소개 
| Member | Role | 
|--------|------|
| **윤정환**<br/>Frontend Developer<br/>[@khuyjh](https://github.com/khuyjh) | 팀 페이지, 할 일 목록 등록/수정/삭제, 팀 초대/관리, 데이터 시각화, 계정 설정 | 
| **이상달**<br/>Frontend Developer<br/>[@asksa1256](https://github.com/asksa1256) | 인증 시스템, 자유게시판, 댓글 시스템, 랜딩페이지, 배포 | 
| **이태경**<br/>Frontend Developer<br/>[@LeeTaegyung](https://github.com/LeeTaegyung) | 팀 생성, 할 일 등록/수정/삭제, 할 일 상세, 마이 히스토리, 댓글 시스템, 페이지 레이아웃(사이드바 포함) |
