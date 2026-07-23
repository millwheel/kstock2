import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";

export interface Review {
  id: string;
  user_id: string;
  author_name: string;
  rating: number;
  content: string;
  created_at: string;
}

/**
 * 최신순 후기를 조회한다. limit을 주면 그 개수만 반환.
 * DB 접근 실패 시(빌드 시점에 DB 미연결 등) 빈 배열을 반환해 페이지 렌더가 깨지지 않게 한다.
 */
export async function getReviews(limit?: number): Promise<Review[]> {
  noStore();

  try {
    let query = supabaseAdmin
      .from("reviews")
      .select("id, user_id, author_name, rating, content, created_at")
      .order("created_at", { ascending: false });
    if (limit) query = query.limit(limit);

    const { data, error } = await query;
    if (error) return [];
    return (data ?? []) as Review[];
  } catch {
    return [];
  }
}
