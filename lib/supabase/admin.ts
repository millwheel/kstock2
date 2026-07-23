import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) {
  throw new Error("SUPABASE_URL 환경변수가 설정되지 않았습니다.");
}
if (!serviceRoleKey) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY 환경변수가 설정되지 않았습니다.");
}

/**
 * service_role 키를 사용하는 서버 전용 Supabase 클라이언트.
 * 모든 테이블(users/sessions/reviews) 접근은 이 클라이언트로만 수행한다.
 * RLS/권한 회수를 우회하므로, 권한·소유권 검증은 반드시 애플리케이션 코드가 담당한다.
 */
export const supabaseAdmin = createClient(url, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
