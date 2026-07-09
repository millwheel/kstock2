import styles from "./AppMockup.module.css";

/** Watchlist rows — figures use tabular numerals, up/down uses semantic color only. */
const watchlist = [
  { name: "삼성전자", ticker: "005930", price: "71,200", change: "+1.8%", dir: "up" as const },
  { name: "SK하이닉스", ticker: "000660", price: "183,500", change: "+2.4%", dir: "up" as const },
  { name: "NAVER", ticker: "035420", price: "218,000", change: "-0.6%", dir: "down" as const },
  { name: "카카오", ticker: "035720", price: "42,150", change: "-1.2%", dir: "down" as const },
];

const allocation = [
  { name: "반도체", pct: 42, dir: "up" as const },
  { name: "인터넷", pct: 28, dir: "down" as const },
  { name: "2차전지", pct: 18, dir: "up" as const },
  { name: "현금", pct: 12, dir: "flat" as const },
];

/**
 * Pure HTML/CSS mobile app mockup — no external image dependency.
 * Decorative for AT: labeled once via sr-only, inner detail hidden.
 */
export function AppMockup() {
  return (
    <div className={styles.phone} role="img" aria-label="관심종목 리스트, 시장 요약, 포트폴리오 비중, 목표가 알림을 한 화면에서 보여주는 앱 화면 예시">
      <div className={styles.notch} aria-hidden="true" />
      <div className={styles.screen} aria-hidden="true">
        {/* status / app bar */}
        <div className={styles.appbar}>
          <span className={styles.appTitle}>한눈</span>
          <span className={styles.bell}>🔔</span>
        </div>

        {/* market summary */}
        <div className={styles.market}>
          <div className={styles.marketRow}>
            <span className={styles.marketLabel}>KOSPI</span>
            <span className={`${styles.marketVal} tabular`}>2,684.30</span>
            <span className={`${styles.up} tabular`}>+0.72%</span>
          </div>
          <div className={styles.marketRow}>
            <span className={styles.marketLabel}>KOSDAQ</span>
            <span className={`${styles.marketVal} tabular`}>862.14</span>
            <span className={`${styles.down} tabular`}>-0.31%</span>
          </div>
        </div>

        {/* watchlist */}
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span>관심종목</span>
            <span className={styles.cardMore}>전체</span>
          </div>
          <ul className={styles.list}>
            {watchlist.map((s) => (
              <li key={s.ticker} className={styles.row}>
                <span className={styles.avatar} aria-hidden="true">
                  {s.name.charAt(0)}
                </span>
                <span className={styles.stockName}>
                  {s.name}
                  <span className={styles.ticker}>{s.ticker}</span>
                </span>
                <span className={styles.stockPrice}>
                  <span className={`${styles.price} tabular`}>{s.price}</span>
                  <span className={`${styles[s.dir]} ${styles.changePill} tabular`}>{s.change}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* portfolio allocation */}
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span>포트폴리오 비중</span>
            <span className={`${styles.up} tabular`}>+3.4%</span>
          </div>
          <div className={styles.bar} aria-hidden="true">
            {allocation.map((a) => (
              <span
                key={a.name}
                className={styles.barSeg}
                style={{ width: `${a.pct}%` }}
                data-seg={a.name}
              />
            ))}
          </div>
          <ul className={styles.legend}>
            {allocation.map((a) => (
              <li key={a.name} className={styles.legendItem}>
                <span className={styles.legendDot} data-seg={a.name} aria-hidden="true" />
                <span className={styles.legendName}>{a.name}</span>
                <span className={`${styles.legendPct} tabular`}>{a.pct}%</span>
              </li>
            ))}
          </ul>
        </div>

        {/* target-price alert */}
        <div className={styles.alert}>
          <span className={styles.alertIcon} aria-hidden="true">
            🔔
          </span>
          <div className={styles.alertText}>
            <span className={styles.alertTitle}>목표가 알림</span>
            <span className={styles.alertDesc}>
              SK하이닉스가 목표가 <b className="tabular">180,000</b>원에 도달했어요
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
