import { NextResponse } from "next/server";
import { searchStockNews } from "@/lib/news/naver";

/** 검색어 길이 상한 — 남용/과도한 쿼리 방지 */
const MAX_QUERY_LENGTH = 40;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("q") ?? "";
  const query = raw.trim();

  if (query.length === 0) {
    return NextResponse.json(
      { ok: false, error: "종목명을 입력해 주세요." },
      { status: 400 }
    );
  }
  if (query.length > MAX_QUERY_LENGTH) {
    return NextResponse.json(
      { ok: false, error: "검색어가 너무 깁니다." },
      { status: 400 }
    );
  }

  const result = await searchStockNews(query);

  if (!result.ok) {
    return NextResponse.json(result, { status: 502 });
  }

  return NextResponse.json(result, {
    // 종목 쿼리별 결과를 엣지/브라우저 단에서도 잠시 캐시
    headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200" },
  });
}
