import "server-only";
import { cookies } from "next/headers";
import { randomBytes, createHash } from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";

const COOKIE = "session";
const MAX_AGE_SEC = 60 * 60 * 24 * 30; // 30일

export interface SessionUser {
  id: string;
  email: string;
  name: string;
}

function sha256(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * 로그인/회원가입 성공 시 호출한다.
 * 랜덤 토큰을 발급해 쿠키에는 원본을, DB에는 그 해시만 저장한다.
 */
export async function createSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + MAX_AGE_SEC * 1000);

  await supabaseAdmin.from("sessions").insert({
    user_id: userId,
    token_hash: sha256(token),
    expires_at: expiresAt.toISOString(),
  });

  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SEC,
  });
}

/** 현재 요청의 로그인 사용자를 반환한다. 없으면 null. */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;

  const { data: session } = await supabaseAdmin
    .from("sessions")
    .select("user_id, expires_at")
    .eq("token_hash", sha256(token))
    .maybeSingle();

  if (!session || new Date(session.expires_at) < new Date()) return null;

  const { data: user } = await supabaseAdmin
    .from("users")
    .select("id, email, name")
    .eq("id", session.user_id)
    .maybeSingle();

  return user ?? null;
}

/** 로그아웃: DB의 세션 행을 삭제하고 쿠키를 제거한다. */
export async function destroySession(): Promise<void> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (token) {
    await supabaseAdmin.from("sessions").delete().eq("token_hash", sha256(token));
  }
  store.delete(COOKIE);
}
