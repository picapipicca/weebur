### 배포주소 : 

### 📁 프로젝트 폴더 구조

```bash
.
├── README.md               # 프로젝트 소개 및 실행 방법 문서
├── **mocks**               # Jest용 목(mock) 파일 모음
│ └── next
│ └── navigation.js         # App Router용 next/navigation 모킹 파일
├── babel.config.backup.js  # Babel 백업 설정 파일
├── eslint.config.mjs       # ESLint 설정 (MJS 포맷)
├── jest.config.js          # Jest 메인 설정 파일
├── jest.setup.js           # Jest 초기 셋업 파일
├── jest.vscode.config.js   # VSCode에서 Jest 테스트용 설정 파일
├── next-env.d.ts           # Next.js 타입 지원용 선언 파일
├── next.config.js          # Next.js 전반적인 설정
├── package-lock.json       # 의존성 lock 파일
├── package.json            # 프로젝트 의존성 및 스크립트 정의
├── postcss.config.mjs      # Tailwind PostCSS 설정
├── public/                 # 정적 파일
│ ├── file.svg
│ ├── globe.svg
│ ├── next.svg
│ ├── vercel.svg
│ └── window.svg
├── src/                     # 실제 애플리케이션 소스 폴더
│ ├── app/                   # Next.js App Router 기반 폴더 (라우팅 중심)
│ │ ├── globals.css          # 전역 스타일 정의
│ │ ├── layout.tsx           # 공통 레이아웃 (헤더/푸터 등)
│ │ ├── not-found.tsx        # 404 Not Found 페이지
│ │ ├── page.tsx             # 루트 페이지 (/)
│ │ └── products/            # /products 라우트 전용 페이지
│ │ └── page.tsx             # 상품 리스트 페이지 컴포넌트
│
│ ├── features/              # 기능 단위 모듈 집합 (도메인 중심 UI/로직)
│ │ └── products/            # 상품 기능 관련 모듈
│ │ ├── api/                 # 상품 관련 API 호출 함수
│ │ ├── components/          # 상품 관련 컴포넌트
│ │ └── hooks/               # 상품 기능 전용 커스텀 훅
│
│ └── shared/                # 전역에서 공통으로 사용하는 유틸/컴포넌트 모음
│ ├── api/
│ │ └── ApiInstance.ts       # Axios 인스턴스 공통 설정
│ ├── assets/
│ │ └── icons/               # SVG 등 아이콘 파일 모음
│ ├── hooks/                 # 공통 커스텀 훅
│ │ ├── useLocalStorage.ts
│ │ └── useSearchController.ts
│ ├── lib/                     # 전역 유틸성 로직 
│ │ ├── PrefetchBoundary.tsx
│ │ ├── queryClient.ts         # React Query 클라이언트 설정
│ │ ├── searchController.ts    # URLSearchParams 기반 검색 컨트롤러
│ │ └── type.ts                # 공통 타입 유틸
│ ├── provider/
│ │ └── QueryProvider.tsx      # React Query Provider
│ └── ui/                      # 공통 UI 컴포넌트 (Atomic, 재사용 단위)
│ ├── Button.tsx
│ ├── Input.tsx
│ ├── RatingStars.tsx
│ ├── ScrollToBottomUpButton.tsx
│ ├── SelectBox.tsx
│ ├── Spinner.tsx
│ └── index.tsx                 # UI 컴포넌트 export 집합
├── tailwind.config.ts          # Tailwind CSS 설정 파일
└── tsconfig.json               # TypeScript 전역 설정
```


### 🚀 실행 방법 (Getting Started)

1. 의존성 설치 : npm install

2. 개발 서버 실행 : npm run dev

3. 프로덕션 빌드 : npm run build

4. 프로덕션 서버 실행 : npm run start

</br>

### 🧱 사용 기술 스택 (Tech Stack)

- 프레임워크 & 언어
Next.js 15.3.0 (App Router 기반)
React 19
TypeScript 5.8.3

- 스타일링
Tailwind CSS 4.1.4

- 상태 관리 & API
@tanstack/react-query 5.74.3
React Query Devtools
Axios

- Form
React Hook Form 7.55.0

- 테스트
Jest
Testing Library

