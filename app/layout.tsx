import type { Metadata, Viewport } from "next";
import { brand } from "@/lib/landing-content";
import "./globals.css";

const description =
  "관심종목, 시세, 뉴스, 포트폴리오 변화를 한 화면에서 확인하고 중요한 순간을 알림으로 받아보세요. 흩어진 투자 정보를 한눈에 모아 판단을 돕는 투자 정보 서비스입니다.";

export const metadata: Metadata = {
  metadataBase: new URL("https://han-nun.example.com"),
  title: {
    default: `${brand.name} — 흩어진 투자 정보를 한 화면에`,
    template: `%s | ${brand.name}`,
  },
  description,
  keywords: ["관심종목", "포트폴리오", "주식 알림", "투자 정보", "시세", "뉴스 요약"],
  applicationName: brand.name,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: brand.name,
    title: `${brand.name} — 흩어진 투자 정보를 한 화면에`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — 흩어진 투자 정보를 한 화면에`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
