## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

\*\* folder structure
src/
├── app/ # 애플리케이션 초기화 및 글로벌 설정
│ ├── \_providers/ # 애플리케이션 레벨에서 제공되는 프로바이더
├── widgets/ # 비즈니스 로직이 포함된 독립적인 컴포넌트
├── features/ # 기능 단위로 분리된 기능별 코드
├── entities/ # 핵심 비즈니스 로직과 데이터 모델
├── shared/ # 재사용 가능한 컴포넌트와 유틸리티
