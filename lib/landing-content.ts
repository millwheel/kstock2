/**
 * All landing copy in one place. Product/marketing copy uses 해요체 (warm);
 * legal / investment-notice copy uses 합니다체 (precise). No stock-recommendation,
 * profit-guarantee, or hot-stock phrasing anywhere.
 */

export const RESERVATION_HREF = process.env.NEXT_PUBLIC_RESERVATION_URL || "#reservation";
export const APP_STORE_HREF = process.env.NEXT_PUBLIC_APP_STORE_URL || "#reservation";
export const PLAY_STORE_HREF = process.env.NEXT_PUBLIC_PLAY_STORE_URL || "#reservation";

export const brand = {
  name: "한눈",
  wordmark: "한눈",
  tagline: "흩어진 투자 정보를 한 화면에",
};

export const nav = [
  { label: "기능", href: "#features" },
  { label: "사용 흐름", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "사전예약", href: "#reservation" },
];

export const hero = {
  eyebrow: "투자 정보 통합 대시보드",
  headline: "흩어진 투자 정보를\n한 화면에",
  subheadline:
    "관심종목, 시세, 뉴스, 포트폴리오 변화를 한눈에 확인하고 중요한 순간을 알림으로 받아보세요.",
  primaryCta: { label: "사전예약하기", href: RESERVATION_HREF, id: "hero_primary" },
  secondaryCta: { label: "기능 둘러보기", href: "#features", id: "hero_secondary" },
  trust: [
    { title: "관심종목 알림", desc: "목표가·급변동을 놓치지 않아요" },
    { title: "실시간 뉴스 요약", desc: "종목별 뉴스·공시를 한 줄로" },
    { title: "포트폴리오 분석", desc: "수익률과 비중을 직관적으로" },
  ],
};

export const problem = {
  title: "이렇게 보고 있지 않나요?",
  questions: [
    "뉴스는 따로, 차트는 따로, 내 종목은 또 따로 보고 있나요?",
    "중요한 공시와 가격 변동을 뒤늦게 확인하고 있나요?",
  ],
  cards: [
    {
      title: "정보가 여러 앱에 흩어져요",
      desc: "시세 앱, 뉴스 앱, 메모장을 오가며 매번 같은 종목을 다시 찾고 있어요.",
    },
    {
      title: "변동을 실시간으로 보기 어려워요",
      desc: "가격이 크게 움직이거나 공시가 떠도 한참 뒤에야 알게 되는 경우가 많아요.",
    },
    {
      title: "포트폴리오 상태가 한눈에 안 와요",
      desc: "수익률과 비중이 앱마다 다르게 보여서 지금 상태를 파악하기 번거로워요.",
    },
  ],
};

export const solution = {
  title: "한 화면에서 다 봐요",
  subtitle: "필요한 정보를 한곳에 모아, 판단에 쓰는 시간을 아껴줘요.",
  items: [
    {
      title: "관심종목 통합 대시보드",
      desc: "여러 앱을 오갈 필요 없이 관심종목의 시세와 변화를 한 화면에서 확인해요.",
    },
    {
      title: "실시간 가격 변동·목표가 알림",
      desc: "직접 정한 목표가나 급변동 조건에 도달하면 바로 알림으로 알려드려요.",
    },
    {
      title: "종목별 뉴스·공시 요약",
      desc: "내 종목과 관련된 뉴스와 공시를 짧게 요약해 흐름을 빠르게 파악해요.",
    },
    {
      title: "포트폴리오 수익률·비중 시각화",
      desc: "보유 종목의 수익률과 비중을 그래프로 보여줘 상태를 직관적으로 이해해요.",
    },
  ],
};

export const features = {
  title: "핵심 기능",
  subtitle: "판단에 필요한 것만, 군더더기 없이.",
  cards: [
    {
      title: "내 종목 한눈에 보기",
      desc: "관심종목의 시세와 등락을 한 리스트에서 확인하고 원하는 순서로 정리해요.",
      metric: "관심종목 무제한",
    },
    {
      title: "중요한 순간만 알림",
      desc: "목표가, 급변동, 공시 등 내가 정한 조건에서만 알림을 받아 피로를 줄여요.",
      metric: "조건별 맞춤 알림",
    },
    {
      title: "포트폴리오 자동 분석",
      desc: "보유 비중과 수익률을 자동으로 계산해 지금 상태를 그래프로 보여줘요.",
      metric: "비중·수익률 자동 집계",
    },
    {
      title: "시장 흐름 요약",
      desc: "오늘의 지수와 관심 섹터 움직임을 짧게 요약해 흐름을 빠르게 파악해요.",
      metric: "매일 아침 요약",
    },
  ],
};

export const howItWorks = {
  title: "이렇게 사용해요",
  steps: [
    { title: "관심종목을 추가해요", desc: "보고 싶은 종목을 검색해 관심 목록에 담아요." },
    { title: "목표가와 알림 조건을 정해요", desc: "원하는 가격과 변동 조건을 직접 설정해요." },
    {
      title: "뉴스와 시세 변화를 한 화면에서 봐요",
      desc: "관심종목의 시세, 뉴스, 포트폴리오를 한곳에서 확인해요.",
    },
    {
      title: "중요한 변화가 생기면 알림을 받고 판단해요",
      desc: "조건에 도달하면 알림으로 알려드려요. 판단은 직접 내려요.",
    },
  ],
};

export const trust = {
  title: "믿고 쓸 수 있도록",
  points: [
    {
      title: "투자 판단을 돕는 서비스예요",
      desc: "매매를 대신하지 않아요. 흩어진 정보를 모아 판단을 보조하는 데 집중해요.",
    },
    {
      title: "개인정보·연동 정보를 보호해요",
      desc: "계좌 연동 정보는 조회 목적에 한해 사용하고 안전하게 관리해요.",
    },
    {
      title: "데이터 출처와 알림 기준을 밝혀요",
      desc: "시세·뉴스의 출처와 알림이 울리는 기준을 투명하게 안내해요.",
    },
  ],
  betaNote: "현재 베타테스터와 함께 화면 구성과 알림 기준을 다듬고 있어요.",
  disclaimer:
    "본 서비스는 투자 정보를 제공하고 투자 판단을 보조하기 위한 서비스입니다. 특정 금융상품의 매수 또는 매도를 권유하지 않으며, 투자 결과에 대한 책임은 투자자 본인에게 있습니다.",
};

export const finalCta = {
  title: "내 종목의 중요한 순간을\n놓치지 마세요",
  subtitle: "사전예약하고 정식 출시 소식을 가장 먼저 받아보세요.",
  primary: { label: "지금 시작하기", href: RESERVATION_HREF, id: "final_primary" },
  appStore: { label: "App Store", href: APP_STORE_HREF, id: "final_appstore" },
  playStore: { label: "Google Play", href: PLAY_STORE_HREF, id: "final_playstore" },
};

export const faq = {
  title: "자주 묻는 질문",
  items: [
    {
      q: "이 앱은 주식 매매 기능을 제공하나요?",
      a: "현재는 투자 정보 확인과 판단 보조에 집중하고 있어요. 관심종목 관리, 시세·뉴스 확인, 알림 중심으로 사용할 수 있어요.",
    },
    {
      q: "국내주식과 해외주식을 모두 지원하나요?",
      a: "국내주식을 우선 지원하며, 해외주식은 순차적으로 확대할 예정이에요. 지원 범위는 출시 시점에 안내해 드려요.",
    },
    {
      q: "알림 조건은 직접 설정할 수 있나요?",
      a: "네, 목표가나 급변동 폭 등 알림이 울리는 조건을 종목별로 직접 정할 수 있어요.",
    },
    {
      q: "포트폴리오 연동 시 개인정보는 안전한가요?",
      a: "연동 정보는 조회 목적에 한해 사용하고 안전하게 관리합니다. 데이터 보관과 이용 기준은 정식 출시 시 명확히 안내합니다.",
    },
    {
      q: "무료로 사용할 수 있나요?",
      a: "핵심 기능은 무료로 사용할 수 있도록 준비하고 있어요. 세부 요금 정책은 출시 시점에 공지해 드려요.",
    },
  ],
};

export const footer = {
  disclaimerShort:
    "본 서비스는 투자 판단을 보조하기 위한 정보 제공 서비스이며, 투자 결과에 대한 책임은 투자자 본인에게 있습니다.",
};
