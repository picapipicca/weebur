### 배포주소 : [과제 배포 url](weebur-coding-test.vercel.app)

### 📁 프로젝트 폴더 구조

```bash
.
├── public/
├── src/                         # 실제 애플리케이션 소스 폴더
│   ├── app/                     # 애플리케이션 초기화 및 글로벌 설정
│   │   ├── layout.tsx           # 공통 레이아웃
│   │   ├── not-found.tsx        # 404 Not Found 페이지
│   │   ├── page.tsx             # 루트 페이지 (/)
│   │   └── products/            # /products 페이지
│   │       └── page.tsx         # 상품 리스트 페이지 컴포넌트
│   ├── features/                # 기능별로 구성된 폴더 (독립적인 비즈니스 로직과 UI 포함)
│   │   └── products/            # 상품 기능 관련 모듈
│   │       ├── api/             # 상품 관련 API 통신 모듈
│   │       ├── components/      # 상품 관련 UI 컴포넌트
│   │       └── hooks/           # 상품 관련 커스텀 훅
│
│   └── shared/                        # 전역에서 공통으로 사용하는 유틸/컴포넌트 모음
│       ├── api/
│       │   └── ApiInstance.ts         # Axios 인스턴스 공통 설정
│       ├── assets/                    # SVG 등 파일 모음
│       ├── hooks/                     # 공통 커스텀 훅
│       │   ├── useLocalStorage.ts     # 로컬 스토리지 동기화 훅
│       │   └── useSearchController.ts # URLSearchParams 기반 검색 상태 관리 훅
│       ├── lib/                       # 전역 유틸성 로직
│       │   ├── PrefetchBoundary.tsx   # React Query prefetch + Suspense 래퍼 컴포넌트
│       │   ├── queryClient.ts         # React Query 클라이언트 설정
│       │   ├── searchController.ts    # URLSearchParams 기반 검색 컨트롤러
│       │   └── prefetchType.ts
│       ├── provider/
│       │   └── QueryProvider.tsx      # React Query Provider
│       └── ui/                        # 공통 컴포넌트 (Button, Input 등)
└── tailwind.config.ts                 # Tailwind CSS 설정 파일
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
  Axios

- Form
  React Hook Form 7.55.0

- 테스트
  Jest
  Testing Library
