/**
 * 네이버 뉴스 검색 API 서버 유틸.
 *
 * 클라이언트 시크릿이 필요하므로 반드시 서버(라우트 핸들러/서버 컴포넌트)에서만
 * 호출합니다. 응답 title/description에는 <b> 태그와 HTML 엔티티가 섞여 오므로
 * 정제한 뒤, 간단한 감성 태그를 붙여 돌려줍니다.
 *
 * 참고: https://developers.naver.com/docs/serviceapi/search/news/news.md
 */

import { classifySentiment, type Sentiment } from "./sentiment";

const ENDPOINT = "https://openapi.naver.com/v1/search/news.json";

/** API 쿼터 보호를 위해 결과 캐시 유지 시간(초) — 종목 쿼리별로 캐시된다. */
const REVALIDATE_SECONDS = 600;

export type NewsItem = {
  title: string;
  description: string;
  /** 네이버 뉴스 상세 링크(없으면 원문 링크) */
  link: string;
  /** 발행 시각 ISO 문자열 */
  pubDate: string;
  /** 도메인 표기 (예: news.example.com) */
  source: string;
  sentiment: Sentiment;
};

export type NewsResult =
  | { ok: true; query: string; items: NewsItem[] }
  | { ok: false; error: string };

type NaverRawItem = {
  title: string;
  originallink: string;
  link: string;
  description: string;
  pubDate: string;
};

const HTML_ENTITIES: Record<string, string> = {
  "&quot;": '"',
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&#39;": "'",
  "&nbsp;": " ",
  "&apos;": "'",
};

/** <b> 등 태그 제거 + 주요 HTML 엔티티 복원 */
function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/&#?\w+;/g, (m) => HTML_ENTITIES[m] ?? m)
    .trim();
}

function hostFrom(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/**
 * 네이버 뉴스 검색. display는 최대 100, sort는 sim(정확도)|date(최신).
 * 데모에서는 최신순으로 소량만 가져온다.
 */
export async function searchStockNews(
  query: string,
  display = 8
): Promise<NewsResult> {
  const clientId = process.env.NAVER_API_CLIENT_ID;
  const clientSecret = process.env.NAVER_API_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return { ok: false, error: "뉴스 API 자격 증명이 설정되지 않았습니다." };
  }

  const url = `${ENDPOINT}?query=${encodeURIComponent(query)}&display=${display}&sort=date`;

  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
      },
      // 종목 쿼리별로 캐시해 쿼터를 아끼고 응답을 즉시 제공한다.
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch {
    return { ok: false, error: "뉴스를 불러오는 중 네트워크 오류가 발생했습니다." };
  }

  if (!res.ok) {
    return { ok: false, error: "뉴스를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요." };
  }

  let data: { items?: NaverRawItem[] };
  try {
    data = (await res.json()) as { items?: NaverRawItem[] };
  } catch {
    return { ok: false, error: "뉴스 응답을 해석할 수 없습니다." };
  }

  const items: NewsItem[] = (data.items ?? []).map((raw) => {
    const title = stripHtml(raw.title);
    const description = stripHtml(raw.description);
    const link = raw.link || raw.originallink;
    return {
      title,
      description,
      link,
      pubDate: new Date(raw.pubDate).toISOString(),
      source: hostFrom(raw.originallink || raw.link),
      sentiment: classifySentiment(`${title} ${description}`),
    };
  });

  return { ok: true, query, items };
}
