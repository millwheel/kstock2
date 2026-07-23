"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type ReviewResult = { ok: true } | { error: string };

export async function createReview(formData: FormData): Promise<ReviewResult> {
  const user = await getCurrentUser();
  if (!user) return { error: "로그인이 필요합니다." };

  const rating = Number(formData.get("rating"));
  const content = String(formData.get("content") ?? "").trim();

  if (!(rating >= 1 && rating <= 5)) return { error: "별점을 선택해 주세요." };
  if (content.length < 5) return { error: "후기를 5자 이상 입력해 주세요." };
  if (content.length > 2000) return { error: "후기는 2000자 이하로 입력해 주세요." };

  // user_id는 클라이언트 입력이 아니라 서버가 확인한 세션에서 취한다 (명의 위조 방지).
  const { error } = await supabaseAdmin.from("reviews").insert({
    user_id: user.id,
    author_name: user.name,
    rating,
    content,
  });
  if (error) return { error: "후기 저장에 실패했습니다. 잠시 후 다시 시도해 주세요." };

  revalidatePath("/reviews");
  return { ok: true };
}

export async function deleteReview(id: string): Promise<ReviewResult> {
  const user = await getCurrentUser();
  if (!user) return { error: "로그인이 필요합니다." };

  // 소유권을 서버에서 명시적으로 강제한다. user_id 조건을 반드시 함께 건다.
  const { error, count } = await supabaseAdmin
    .from("reviews")
    .delete({ count: "exact" })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: "삭제에 실패했습니다." };
  if (!count) return { error: "삭제 권한이 없거나 이미 삭제된 후기입니다." };

  revalidatePath("/reviews");
  return { ok: true };
}

/**
 * `<form action>` 바인딩용 void 래퍼.
 * id를 bind로 고정하고 formData는 사용하지 않는다.
 */
export async function deleteReviewForm(id: string, _formData: FormData): Promise<void> {
  await deleteReview(id);
}
