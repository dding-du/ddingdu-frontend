# 띵듀로이드 (ddingduroid)

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)

**명지대학교 학생들을 위한 강의 정보 챗봇 서비스**

<br/>

## 프로젝트 소개

`띵듀로이드`는 명지대학교 학생들을 위해 만들어진 AI 기반 강의 정보 제공 챗봇입니다. 복잡하고 흩어져 있는 강의 정보를 손쉽게 얻을 수 있도록, 대화형 인터페이스를 통해 맞춤형 정보를 제공하는 것을 목표로 합니다.

<br/>

## 주요 기능

- **💬 AI 챗봇:** 자연어 질문을 통해 원하는 강의 정보를 얻을 수 있습니다. (예: "중간고사 없는 융소 전공 알려줘")
- **🔍 강의 검색:** 키워드를 통해 원하는 강의를 빠르게 검색할 수 있습니다.
- **📚 강의 보관함:** 관심 있는 강의를 개인 보관함에 저장하고 관리할 수 있습니다.
- **👤 마이페이지:** 사용자 정보 수정 및 계정 관리를 할 수 있습니다.

<br/>

## 기술 스택

- **Framework:** Next.js
- **Library:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Font:** Pretendard, Gmarket Sans

<br/>

## 시작하기

### 사전 준비

- Node.js (v20 이상 권장)
- npm, yarn, or pnpm

### 설치 및 실행

1.  **레포지토리 클론:**

    ```bash
    git clone https://github.com/your-username/ddingduroid.git
    cd ddingduroid
    ```

2.  **의존성 설치:**

    ```bash
    npm install
    ```

3.  **개발 서버 실행:**

    ```bash
    npm run dev
    ```

4.  브라우저에서 `http://localhost:3000`으로 접속하여 결과를 확인합니다.

<br/>

## 주요 스크립트

- `npm run dev`: 개발 모드로 프로젝트를 실행합니다.
- `npm run build`: 프로덕션용으로 프로젝트를 빌드합니다.
- `npm run start`: 빌드된 프로덕션 서버를 시작합니다.
- `npm run lint`: ESLint를 사용하여 코드 스타일을 검사합니다.

<br/>

## 프로젝트 구조

```
/
├── public/              # 정적 에셋 (이미지, 폰트 등)
├── src/
│   ├── app/             # Next.js App Router 기반 라우팅
│   │   ├── (auth)/      # 인증 관련 페이지 그룹
│   │   ├── archive/     # 강의 보관함 페이지
│   │   ├── mypage/      # 마이페이지
│   │   └── page.tsx     # 메인 채팅 페이지
│   ├── components/      # 공용 및 기능별 컴포넌트
│   │   ├── chat/        # 채팅 관련 컴포넌트
│   │   └── common/      # 헤더 등 공용 컴포넌트
│   └── globals.css      # 전역 스타일 및 Tailwind CSS 설정
├── next.config.ts       # Next.js 설정
└── package.json         # 프로젝트 의존성 및 스크립트
```
