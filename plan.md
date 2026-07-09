# Next.js 구현 계획

## 1. 목표

`prd.md`의 원페이지 주식투자앱 랜딩페이지를 Next.js로 구현한다. 사용자는 첫 화면에서 앱의 핵심 가치인 "흩어진 투자 정보를 한 화면에서 보고 더 빠르게 판단한다"를 이해해야 하며, 페이지 전반에서 앱 다운로드 또는 사전예약으로 자연스럽게 이동해야 한다.

디자인은 `_ds/kakaobank-design-system-b05144fa-0352-4b3a-bfb7-e64e100aa44b`의 카카오뱅크형 핀테크 톤을 참고한다. 단, 실제 카카오뱅크 로고나 브랜드 자산이 제공되지 않았으므로 색상, 타이포그래피, 간격, 반경, 플랫한 UI 원칙만 활용하고 서비스 자체의 독립적인 이름과 화면으로 구성한다.

## 2. 기술 방향

- Framework: Next.js App Router
- Language: TypeScript
- Styling: CSS Modules 또는 전역 CSS + CSS custom properties
- Font: Pretendard Variable
- Icons: 실제 아이콘셋이 없으므로 `lucide-react` 사용 검토
- Image: 외부 이미지 의존 없이 CSS/HTML 기반 앱 목업 우선 구현
- Analytics: CTA 클릭, 스크롤 깊이, FAQ 도달 이벤트를 연결할 수 있도록 이벤트 훅 구조만 준비

## 3. 디자인 시스템 적용 원칙

### 사용할 토큰

- 색상
  - Brand CTA: `--kb-yellow: #ffe300`
  - Text: `--kb-black: #1e1e1e`
  - Surface: `--kb-white`, `--kb-surface-fill: #f7f7f7`, `--kb-surface-subtle: #f9f9f9`
  - Border: `--kb-border-subtle: #e6e6e6`
  - 상승/하락: `--kb-error`, `--kb-link` 또는 별도 의미 토큰으로 분리
- 타이포그래피
  - Pretendard Variable 단일 폰트
  - Hero만 800 weight 사용
  - 본문은 14~16px 기준, 모바일 가독성 우선
- 간격
  - 4px base unit
  - 모바일 gutter 20px
  - 데스크톱 최대 폭 1360px
  - 섹션 간격 80px 기준
- 반경
  - 버튼, 입력, 카드 기본 12px
  - 앱 목업/큰 패널 16~20px
  - 원형 아바타 대신 rounded square 사용
- 모션
  - 150~350ms cubic-bezier 기반
  - 과한 bounce/spring 금지

### 지켜야 할 시각 규칙

- 배경은 화이트/밝은 그레이 중심의 플랫한 톤으로 구성한다.
- 카드에는 강한 그림자 대신 얇은 border와 surface fill을 사용한다.
- CTA는 노란색 primary와 검정 secondary 조합으로 명확히 구분한다.
- 금융 서비스처럼 신뢰감 있게 보이도록 과장된 수익 표현, 급등주 추천 느낌의 문구, 자극적 색 대비를 피한다.
- 모바일 360px에서도 CTA와 앱 목업이 겹치지 않도록 hero 레이아웃을 세로 우선으로 설계한다.

## 4. 콘텐츠 구조

### 4.1 Header

- 좌측: 서비스명 또는 임시 워드마크
- 우측: `기능`, `사용 흐름`, `FAQ`, `사전예약`
- 모바일: 메뉴를 단순화하거나 CTA만 노출
- CTA: `사전예약하기`

### 4.2 Hero Section

- Headline: `흩어진 투자 정보를 한 화면에`
- Sub headline: `관심종목, 시세, 뉴스, 포트폴리오 변화를 한눈에 확인하고 중요한 순간을 알림으로 받아보세요.`
- Primary CTA: `앱 다운로드` 또는 `사전예약하기`
- Secondary CTA: `기능 둘러보기`
- 신뢰 지표 3개:
  - `관심종목 알림`
  - `실시간 뉴스 요약`
  - `포트폴리오 분석`
- 우측/하단 비주얼:
  - 모바일 앱 목업
  - 관심종목 리스트, 포트폴리오 요약, 알림 카드가 실제 앱 화면처럼 보이게 구성

### 4.3 Problem Section

- 핵심 질문:
  - `뉴스는 따로, 차트는 따로, 내 종목은 또 따로 보고 있나요?`
  - `중요한 공시와 가격 변동을 뒤늦게 확인하고 있나요?`
- 문제 카드 3개:
  - 정보가 여러 앱에 흩어짐
  - 종목 변동을 실시간으로 확인하기 어려움
  - 포트폴리오 상태를 직관적으로 보기 어려움

### 4.4 Solution Section

- 관심종목 통합 대시보드
- 실시간 가격 변동 및 목표가 알림
- 종목별 뉴스/공시 요약
- 포트폴리오 수익률 및 비중 시각화
- 각 항목은 앱 목업 일부와 함께 "사용자가 무엇을 쉽게 할 수 있는지" 중심으로 작성

### 4.5 Feature Highlights

기능 카드 4개:

1. 내 종목 한눈에 보기
2. 중요한 순간만 알림
3. 포트폴리오 자동 분석
4. 시장 흐름 요약

각 카드에는 짧은 설명, 보조 수치 또는 UI 미니 프리뷰를 포함한다.

### 4.6 How It Works

4단계 흐름:

1. 관심종목을 추가해요
2. 목표가와 알림 조건을 정해요
3. 뉴스와 시세 변화를 한 화면에서 봐요
4. 중요한 변화가 생기면 알림을 받고 판단해요

카카오뱅크 톤을 참고해 제품 설명은 `해요체`로 부드럽게 작성한다.

### 4.7 Trust Section

- 투자 판단 보조 서비스 안내
- 개인정보 및 계좌 연동 정보 보호 요약
- 데이터 출처와 알림 기준의 투명성
- 베타테스터 피드백 또는 신뢰 문구
- 투자 유의 문구는 `합니다체`로 명확하게 작성

필수 문구:

> 본 서비스는 투자 정보를 제공하고 투자 판단을 보조하기 위한 서비스입니다. 특정 금융상품의 매수 또는 매도를 권유하지 않으며, 투자 결과에 대한 책임은 투자자 본인에게 있습니다.

### 4.8 Final CTA Section

- 카피: `내 종목의 중요한 순간을 놓치지 마세요`
- CTA: `지금 시작하기`, `앱 다운로드`, `사전예약하기`
- 앱스토어/구글플레이 링크 또는 사전예약 폼 영역

### 4.9 FAQ Section

- 이 앱은 주식 매매 기능을 제공하나요?
- 국내주식과 해외주식을 모두 지원하나요?
- 알림 조건은 직접 설정할 수 있나요?
- 포트폴리오 연동 시 개인정보는 안전한가요?
- 무료로 사용할 수 있나요?

## 5. 권장 파일 구조

```txt
app/
  layout.tsx
  page.tsx
  globals.css
components/
  landing/
    Header.tsx
    HeroSection.tsx
    ProblemSection.tsx
    SolutionSection.tsx
    FeatureHighlights.tsx
    HowItWorks.tsx
    TrustSection.tsx
    FinalCtaSection.tsx
    FaqSection.tsx
    AppMockup.tsx
  ui/
    Button.tsx
    Card.tsx
    Badge.tsx
    Section.tsx
    Container.tsx
lib/
  analytics.ts
  landing-content.ts
styles/
  tokens.css
```

## 6. 구현 단계

### Phase 1. 프로젝트 초기화

- Next.js + TypeScript 프로젝트 생성
- ESLint, Prettier 설정 확인
- `globals.css`에 reset, base style, focus style 추가
- `_ds`의 토큰 CSS를 `styles/tokens.css`로 가져오거나 필요한 토큰만 전역 CSS 변수로 재정의

### Phase 2. 공통 UI 구축

- `Container`: 최대 폭 1360px, 모바일 gutter 20px
- `Section`: 기본 vertical rhythm 80px
- `Button`: yellow, black, outline variants
- `Card`: border 기반 flat card
- `Badge`: 상태/신뢰 지표용 pill
- 모든 interactive element에 focus-visible 스타일 적용

### Phase 3. 랜딩 섹션 구현

- Header와 anchor navigation 구현
- Hero 구현 및 앱 목업 제작
- Problem, Solution, Feature, How it works, Trust, Final CTA, FAQ 순서로 구현
- CTA 클릭 이벤트 연결을 위해 `data-analytics-id` 또는 함수 훅 준비

### Phase 4. 앱 목업 구현

- 실제 이미지가 없으므로 HTML/CSS 기반 모바일 목업 제작
- 포함 화면:
  - 관심종목 리스트
  - 오늘의 시장 요약
  - 포트폴리오 비중
  - 목표가 알림 카드
- 숫자 영역은 tabular number 스타일 적용
- 상승/하락 색은 과하지 않게 사용

### Phase 5. 반응형 및 접근성

- 360px, 390px, 768px, 1024px, 1440px 기준 확인
- 모바일에서 CTA와 앱 목업 겹침 방지
- 버튼 대비 확인
- FAQ accordion 사용 시 `aria-expanded`, `aria-controls` 적용
- 이미지/목업 대체 텍스트 또는 접근성 숨김 처리 기준 적용
- 키보드 탭 이동 순서 확인

### Phase 6. 성능 및 SEO

- `metadata` 설정
- 섹션별 불필요한 클라이언트 컴포넌트 최소화
- 폰트 로딩 최적화
- 정적 렌더링 우선
- Lighthouse 기준:
  - Performance 90+
  - Accessibility 95+
  - Best Practices 95+
  - SEO 90+

### Phase 7. 검증

- `npm run lint`
- `npm run build`
- Playwright 또는 브라우저 수동 확인
- 주요 뷰포트 스크린샷 확인
- CTA/FAQ/anchor navigation 동작 확인

## 7. 구현 시 주의사항

- 특정 종목 추천, 수익 보장, 급등주 표현을 사용하지 않는다.
- 앱이 매매 기능을 제공하는지 불명확하므로 FAQ에서 "현재 페이지에서는 투자 정보 확인과 판단 보조 중심"으로 표현한다.
- 실제 앱스토어/구글플레이 URL이 없으면 임시 링크는 `#reservation` 또는 환경변수로 분리한다.
- 공식 로고/아이콘 자산이 없으므로 임의로 카카오뱅크 로고를 만들지 않는다.
- `_ds`의 노란색은 brand/CTA 중심으로만 사용하고 상태 색으로 쓰지 않는다.
- 카드 중첩을 피하고, 섹션은 full-width band 또는 unframed layout으로 구성한다.

## 8. 완료 기준

- 첫 화면에서 서비스 가치, CTA, 앱 목업이 모두 보인다.
- 모든 PRD 섹션이 원페이지 흐름 안에 구현되어 있다.
- 모바일 360px에서 레이아웃 겹침이 없다.
- 투자 유의 문구가 페이지 하단 또는 CTA 인근에 포함되어 있다.
- `_ds`의 색상, 폰트, 간격, 반경 원칙이 CSS에 반영되어 있다.
- lint/build가 통과한다.
