"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./FeatureChart.module.css";

export type FeatureChartKind = "watchlist" | "alerts" | "portfolio" | "market";

type FeatureChartProps = {
  kind: FeatureChartKind;
};

const watchlistData = [
  { name: "삼성전자", value: 82 },
  { name: "SK하이닉스", value: 68 },
  { name: "NAVER", value: 54 },
];

const alertData = [
  { day: "월", count: 2 },
  { day: "화", count: 4 },
  { day: "수", count: 3 },
  { day: "목", count: 7 },
  { day: "금", count: 5 },
  { day: "토", count: 8 },
  { day: "일", count: 6 },
];

const portfolioData = [
  { name: "반도체", value: 42, color: "#1e1e1e" },
  { name: "인터넷", value: 28, color: "#6f6f6f" },
  { name: "2차전지", value: 18, color: "#a3a3a3" },
  { name: "현금", value: 12, color: "#e6e6e6" },
];

const marketData = [
  { time: "09", value: 100 },
  { time: "10", value: 104 },
  { time: "11", value: 102 },
  { time: "12", value: 108 },
  { time: "13", value: 107 },
  { time: "14", value: 113 },
  { time: "15", value: 116 },
];

function ChartTooltip({
  active,
  payload,
  label,
  suffix = "",
}: {
  active?: boolean;
  payload?: Array<{ value?: number | string }>;
  label?: string;
  suffix?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className={styles.tooltip}>
      <span>{label}</span>
      <b>
        {payload[0]?.value}
        {suffix}
      </b>
    </div>
  );
}

function TremorBarList() {
  return (
    <div
      className={styles.barList}
      tremor-id="tremor-raw"
      aria-hidden="true"
    >
      {watchlistData.map((item) => (
        <div key={item.name} className={styles.barRow}>
          <span className={styles.barTrack}>
            <span className={styles.barFill} style={{ width: `${item.value}%` }} />
            <span className={styles.barName}>{item.name}</span>
          </span>
          <span className={styles.barValue}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function WatchlistChart() {
  return (
    <div
      className={styles.chart}
      role="img"
      aria-label="관심종목 세 개가 원하는 순서로 정리된 목록 차트 예시"
    >
      <div className={styles.chartHead}>
        <span>관심 목록</span>
        <strong>3개 종목</strong>
      </div>
      <TremorBarList />
    </div>
  );
}

function AlertsChart() {
  return (
    <div
      className={styles.chart}
      role="img"
      aria-label="최근 일주일 동안 조건에 맞는 알림만 모아 보여주는 막대 차트 예시"
    >
      <div className={styles.chartHead}>
        <span>최근 7일 알림</span>
        <strong>35건</strong>
      </div>
      <div className={styles.plot} aria-hidden="true" tremor-id="tremor-raw">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={alertData} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888888", fontSize: 11 }}
            />
            <YAxis hide domain={[0, 10]} />
            <Tooltip
              cursor={{ fill: "rgba(30, 30, 30, 0.04)" }}
              content={<ChartTooltip suffix="건" />}
            />
            <Bar dataKey="count" fill="#1e1e1e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function PortfolioChart() {
  return (
    <div
      className={styles.chart}
      role="img"
      aria-label="반도체 42퍼센트, 인터넷 28퍼센트, 이차전지 18퍼센트, 현금 12퍼센트의 포트폴리오 비중 차트 예시"
    >
      <div className={styles.chartHead}>
        <span>보유 비중</span>
        <strong>4개 자산</strong>
      </div>
      <div className={styles.donutWrap}>
        <div className={styles.donut} aria-hidden="true" tremor-id="tremor-raw">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolioData}
                dataKey="value"
                nameKey="name"
                innerRadius="68%"
                outerRadius="96%"
                paddingAngle={2}
                stroke="none"
                isAnimationActive={false}
              >
                {portfolioData.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip suffix="%" />} />
            </PieChart>
          </ResponsiveContainer>
          <span className={styles.donutLabel}>100%</span>
        </div>
        <ul className={styles.legend} aria-hidden="true">
          {portfolioData.slice(0, 3).map((item) => (
            <li key={item.name}>
              <span className={styles.legendDot} style={{ background: item.color }} />
              <span>{item.name}</span>
              <b>{item.value}%</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MarketChart() {
  return (
    <div
      className={styles.chart}
      role="img"
      aria-label="장중 시장 지수가 100에서 116으로 상승하는 흐름 요약 차트 예시"
    >
      <div className={styles.chartHead}>
        <span>오늘의 시장</span>
        <strong className={styles.positive}>+1.16%</strong>
      </div>
      <div className={styles.plot} aria-hidden="true" tremor-id="tremor-raw">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={marketData} margin={{ top: 8, right: 2, bottom: 0, left: 2 }}>
            <defs>
              <linearGradient id="market-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0fbe6c" stopOpacity={0.24} />
                <stop offset="100%" stopColor="#0fbe6c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              tick={{ fill: "#888888", fontSize: 11 }}
              tickFormatter={(value) => `${value}시`}
            />
            <YAxis hide domain={["dataMin - 3", "dataMax + 3"]} />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0fbe6c"
              strokeWidth={2}
              fill="url(#market-fill)"
              dot={false}
              activeDot={{ r: 3, fill: "#0fbe6c", stroke: "#ffffff", strokeWidth: 2 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function FeatureChart({ kind }: FeatureChartProps) {
  if (kind === "watchlist") return <WatchlistChart />;
  if (kind === "alerts") return <AlertsChart />;
  if (kind === "portfolio") return <PortfolioChart />;
  return <MarketChart />;
}
