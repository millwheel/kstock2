# 회원가입 · 로그인 · 후기 기능 구현 설계 (Supabase DB + 자체 인증)

## 목표

랜딩 사이트에 **회원 인증**과 **후기(리뷰)** 기능을 추가한다.

- 방문자는 **회원가입 / 로그인**을 할 수 있다 (이메일 + 비밀번호).
- **후기 목록은 누구나** 조회할 수 있다.
- **후기 작성은 로그인한 사용자만** 가능하다. (요구사항 핵심)
- 사용자는 **본인이 쓴 후기만 수정/삭제**할 수 있다.
- 데이터 저장소로 **Supabase(Postgres)** 만 사용한다. **Supabase Auth는 사용하지 않는다.**
- 로그인은 자체 **`public.users` 테이블** 기반이며, 비밀번호 해시·세션을 직접 관리한다.
- **RLS는 사용하지 않는다.** 모든 DB 접근은 **서버(Server Action / Route Handler)** 에서 `service_role` 키로 수행한다.

---

## 전제 / 현재 상태

- 프레임워크: Next.js `15.5.20` (App Router), React 19, TypeScript
- 스타일링: **CSS Modules** (`*.module.css`) — 기존 `components/ui`, `components/landing` 패턴을 따른다.
- 경로 별칭: `@/*` → 프로젝트 루트 (`tsconfig.json`)
- 기존 API Route 패턴 존재: `app/api/contact/route.ts`, `app/api/news/route.ts`
- 아직 없는 것: DB 클라이언트, 인증 로직, 후기 UI/API
- DB 스키마: [supabase/migrations/0001_reviews.sql](../supabase/migrations/0001_reviews.sql) 에 작성됨 (`users`, `sessions`, `reviews`)

---

## 아키텍처 개요

Supabase는 **Postgres DB로만** 쓴다. 인증(회원가입/로그인/세션)은 애플리케이션 서버가 직접 구현한다.

```
[브라우저]
   │  httpOnly 쿠키(session=원본토큰)만 주고받음. DB엔 직접 접근하지 않음
   ▼
[Next.js Server (Server Action / Route Handler)]
   │  (1) 비밀번호 해시/검증 (bcrypt)
   │  (2) 세션 토큰 발급·검증 (sessions 테이블)
   │  (3) service_role 키로 DB read/write
   ▼
[Supabase Postgres]  ── users / sessions / reviews  (anon 롤 접근은 revoke로 차단)
```

**인증 흐름 요약**
- **회원가입**: 이메일 중복 확인 → 비밀번호 bcrypt 해시 → `users`에 insert → 세션 발급(자동 로그인)
- **로그인**: 이메일로 사용자 조회 → 비밀번호 해시 검증 → 세션 발급
- **세션 유지**: 발급 시 랜덤 토큰을 만들어 **쿠키엔 원본**, **DB엔 토큰 해시**를 저장. 요청마다 쿠키의 토큰을 해시해 `sessions`에서 조회 → 사용자 식별
- **로그아웃**: `sessions`에서 해당 행 삭제 + 쿠키 제거

**권한(후기 작성)** 은 서버 코드가 담당한다:
1. Server Action에서 현재 세션의 사용자를 확인. 없으면 거부.
2. 수정/삭제 시 `review.user_id === currentUser.id` 를 서버에서 명시적으로 비교.
3. `anon`/`authenticated` 롤 권한을 회수해, 공개 값으로 DB에 직접 접근하는 경로 자체를 차단.

---

## 사전 준비

### 1) Supabase 프로젝트 생성

1. [supabase.com](https://supabase.com)에서 프로젝트 생성
2. **Project Settings → API** 에서 아래 값 확인
   - `Project URL`
   - `service_role` key (서버 전용 DB 접근용 — **절대 클라이언트 노출 금지**, **필수**)
3. **SQL Editor** 에서 [supabase/migrations/0001_reviews.sql](../supabase/migrations/0001_reviews.sql) 실행
4. Supabase Auth 관련 설정(Email provider 등)은 **건드릴 필요 없음** — 사용하지 않는다.

> anon key는 이 구조에서 쓰지 않는다. 클라이언트가 Supabase에 직접 접근하지 않기 때문이다.

### 2) 패키지 설치

```bash
npm install @supabase/supabase-js bcryptjs server-only
npm install -D @types/bcryptjs
```

- `@supabase/supabase-js` — service_role 키로 Postgres에 접근하는 DB 클라이언트
- `bcryptjs` — 비밀번호 해시/검증 (네이티브 빌드 불필요한 순수 JS 구현)
- `server-only` — service_role 키가 클라이언트 번들에 새어 나가는 것을 빌드 타임에 차단

> `@supabase/ssr`은 **필요 없다.** (Supabase Auth 세션을 쓰지 않으므로) 세션 쿠키는 `next/headers`의 `cookies()`로 직접 다룬다.

### 3) 환경변수 (`.env.local`)

```bash
SUPABASE_URL=https://xxxxxxxx.supabase.co        # 서버 전용 (NEXT_PUBLIC_ 아님)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...          # 서버 전용, 필수
```

- 둘 다 **서버에서만** 쓰므로 `NEXT_PUBLIC_` 접두사를 붙이지 않는다. 클라이언트 번들에 포함되지 않는다.
- `SUPABASE_SERVICE_ROLE_KEY`는 RLS를 우회하는 관리자 권한이므로 유출 시 DB 전체가 노출된다. `.env.local`은 반드시 `.gitignore`에 포함(Next.js 기본 포함).

---

## 데이터베이스 스키마

전체 SQL은 [supabase/migrations/0001_reviews.sql](../supabase/migrations/0001_reviews.sql) 참고. 핵심 요약:

| 테이블 | 주요 컬럼 | 용도 |
|--------|-----------|------|
| `public.users` | `id`, `email`(citext unique), `password_hash`, `name`, `created_at` | 회원 계정. 비밀번호는 **해시만** 저장 |
| `public.sessions` | `id`, `user_id`(FK), `token_hash`(unique), `expires_at`, `created_at` | 로그인 세션. 쿠키 토큰의 **해시** 저장 |
| `public.reviews` | `id`, `user_id`(FK), `author_name`, `rating`(1~5), `content`, `created_at` | 후기 |

**설계 포인트**
- `email`은 `citext`로 대소문자 무시 unique. 회원가입 시 중복 이메일 방지.
- `password_hash`에는 bcrypt 해시만 저장(평문 금지). 해싱은 **서버 코드**가 담당(SQL 아님).
- `sessions.token_hash`에는 쿠키 원본 토큰이 아니라 그 **해시**를 저장 → DB가 유출돼도 세션 탈취 불가.
- 세 테이블 모두 `revoke all ... from anon, authenticated` 로 공개 접근 차단. 오직 `service_role`(서버)만 접근.
- `on delete cascade`로 회원 삭제 시 세션·후기 자동 정리.

---

## 파일 구조

```
lib/
  supabase/
    admin.ts         # service_role 클라이언트. 모든 테이블 read/write 전용 (서버 한정)
  auth/
    password.ts      # bcrypt 해시/검증
    session.ts       # 세션 발급/조회/삭제 + 현재 사용자 조회 (getCurrentUser)
app/
  (auth)/
    login/
      page.tsx       # 로그인 + 회원가입 화면
      LoginForm.tsx  # 폼 (Client Component)
      actions.ts     # signIn / signUp Server Action
  auth/
    signout/
      route.ts       # 로그아웃 (POST) → 세션 삭제 후 리다이렉트
  reviews/
    page.tsx         # 후기 목록 + (로그인 시) 작성 폼
    ReviewForm.tsx   # 후기 작성 폼 (Client Component)
    actions.ts       # createReview / deleteReview Server Action
components/
  auth/
    AuthButton.tsx   # 헤더용 로그인/로그아웃 버튼 (세션 상태 표시)
```

> `@supabase/ssr`·`middleware.ts`·브라우저 Supabase 클라이언트는 없다. 세션은 쿠키로 직접 관리하므로 미들웨어가 필요 없다.

---

## 구현 상세

### 1) Admin 클라이언트 (DB 접근) — `lib/supabase/admin.ts`

`service_role` 키를 사용하는 서버 전용 클라이언트. **모든 테이블 접근은 이 클라이언트로** 한다.

```ts
import "server-only";
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } }
);
```

> `import "server-only"` 덕분에 실수로 클라이언트 컴포넌트에서 import하면 빌드가 실패한다 → service_role 키 유출 방지.

### 2) 비밀번호 해시 — `lib/auth/password.ts`

```ts
import "server-only";
import bcrypt from "bcryptjs";

const ROUNDS = 12;

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, ROUNDS);
}

export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
```

### 3) 세션 관리 — `lib/auth/session.ts`

랜덤 토큰을 만들어 **쿠키엔 원본**, **DB엔 sha-256 해시**를 저장한다. 요청 시 쿠키 토큰을 해시해 조회.

```ts
import "server-only";
import { cookies } from "next/headers";
import { randomBytes, createHash } from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";

const COOKIE = "session";
const MAX_AGE_SEC = 60 * 60 * 24 * 30; // 30일

function sha256(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

// 로그인/회원가입 성공 시 호출: 세션 발급 + 쿠키 설정
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

// 현재 요청의 로그인 사용자 조회 (없으면 null)
export async function getCurrentUser() {
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

// 로그아웃: 세션 삭제 + 쿠키 제거
export async function destroySession(): Promise<void> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (token) {
    await supabaseAdmin.from("sessions").delete().eq("token_hash", sha256(token));
  }
  store.delete(COOKIE);
}
```

### 4) 로그인 / 회원가입 Server Action — `app/(auth)/login/actions.ts`

```ts
"use server";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function signUp(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "").trim();

  if (!EMAIL_RE.test(email)) return { error: "올바른 이메일을 입력해 주세요." };
  if (password.length < 8) return { error: "비밀번호는 8자 이상이어야 합니다." };
  if (name.length < 1) return { error: "이름을 입력해 주세요." };

  // 이메일 중복 확인
  const { data: existing } = await supabaseAdmin
    .from("users").select("id").eq("email", email).maybeSingle();
  if (existing) return { error: "이미 가입된 이메일입니다." };

  const { data: user, error } = await supabaseAdmin
    .from("users")
    .insert({ email, password_hash: await hashPassword(password), name })
    .select("id")
    .single();
  if (error || !user) return { error: "회원가입에 실패했습니다." };

  await createSession(user.id); // 자동 로그인
  redirect("/reviews");
}

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const { data: user } = await supabaseAdmin
    .from("users")
    .select("id, password_hash")
    .eq("email", email)
    .maybeSingle();

  // 사용자 없음/비밀번호 불일치를 동일 메시지로 처리 (계정 존재 여부 노출 방지)
  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  await createSession(user.id);
  redirect("/reviews");
}
```

**설계 포인트**
- 이메일은 `toLowerCase()`로 정규화(citext와 일관).
- 로그인 실패 시 "이메일 없음"과 "비밀번호 틀림"을 **구분하지 않음** → 계정 열거(enumeration) 공격 방지.
- `redirect()`는 성공 시에만. 에러는 `{ error }`로 반환해 폼에서 표시.

### 5) 로그인 폼 — `app/(auth)/login/LoginForm.tsx`

```tsx
"use client";
import { useState } from "react";
import { signIn, signUp } from "./actions";

export function LoginForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);

  async function handle(formData: FormData) {
    setError(null);
    const result = await (mode === "signin" ? signIn : signUp)(formData);
    if (result?.error) setError(result.error); // 성공 시 서버에서 redirect
  }

  return (
    <form action={handle}>
      {mode === "signup" && <input name="name" placeholder="이름" required />}
      <input name="email" type="email" placeholder="이메일" required />
      <input name="password" type="password" placeholder="비밀번호 (8자 이상)" required minLength={8} />
      <button type="submit">{mode === "signin" ? "로그인" : "회원가입"}</button>
      {error && <p role="alert">{error}</p>}
      <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>
        {mode === "signin" ? "계정이 없으신가요? 회원가입" : "이미 계정이 있으신가요? 로그인"}
      </button>
    </form>
  );
}
```

### 6) 로그아웃 — `app/auth/signout/route.ts`

```ts
import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth/session";

export async function POST(request: Request) {
  await destroySession();
  return NextResponse.redirect(new URL("/", request.url), { status: 303 });
}
```

### 7) 헤더 인증 버튼 — `components/auth/AuthButton.tsx` (Server Component)

```tsx
import { getCurrentUser } from "@/lib/auth/session";

export async function AuthButton() {
  const user = await getCurrentUser();
  if (!user) return <a href="/login">로그인</a>;

  return (
    <form action="/auth/signout" method="post">
      <span>{user.name}</span>
      <button type="submit">로그아웃</button>
    </form>
  );
}
```

> `Header.tsx`는 현재 `"use client"`이므로, 서버 컴포넌트인 `AuthButton`을 직접 넣으려면 `children`/`slot`으로 주입하거나 헤더를 서버 래퍼로 감싸는 리팩터가 필요하다.

### 8) 후기 목록 + 작성 — `app/reviews/page.tsx` (Server Component)

```tsx
import { getCurrentUser } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { ReviewForm } from "./ReviewForm";

export default async function ReviewsPage() {
  const user = await getCurrentUser();

  const { data: reviews } = await supabaseAdmin
    .from("reviews")
    .select("id, author_name, rating, content, created_at, user_id")
    .order("created_at", { ascending: false });

  return (
    <main>
      <h1>고객 후기</h1>

      {user ? (
        <ReviewForm />
      ) : (
        <p>후기를 작성하려면 <a href="/login">로그인</a>이 필요합니다.</p>
      )}

      <ul>
        {reviews?.map((r) => (
          <li key={r.id}>
            <strong>{r.author_name}</strong> · {"★".repeat(r.rating)}
            <p>{r.content}</p>
            <time>{new Date(r.created_at).toLocaleDateString("ko-KR")}</time>
            {r.user_id === user?.id && (
              /* 본인 글이면 삭제 버튼. 실제 권한은 서버 Action이 검증 */
              <form action={/* deleteReview(r.id) 바인딩 */ undefined}>
                <button type="submit">삭제</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
```

### 9) 후기 Server Action — `app/reviews/actions.ts`

```ts
"use server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createReview(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) return { error: "로그인이 필요합니다." };

  const rating = Number(formData.get("rating"));
  const content = String(formData.get("content") ?? "").trim();
  if (!(rating >= 1 && rating <= 5)) return { error: "별점을 선택해 주세요." };
  if (content.length < 5) return { error: "후기를 5자 이상 입력해 주세요." };

  // user_id는 클라이언트 입력이 아니라 서버가 확인한 세션에서 취한다 — 명의 위조 방지
  const { error } = await supabaseAdmin.from("reviews").insert({
    user_id: user.id,
    author_name: user.name,
    rating,
    content,
  });
  if (error) return { error: "후기 저장에 실패했습니다." };

  revalidatePath("/reviews");
  return { ok: true };
}

export async function deleteReview(id: string) {
  const user = await getCurrentUser();
  if (!user) return { error: "로그인이 필요합니다." };

  // 소유권을 서버에서 명시적으로 강제. user_id 조건을 반드시 함께 건다.
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
```

> **핵심 주의**: admin 클라이언트는 무엇이든 지울 수 있으므로 **소유권 검증(`.eq("user_id", user.id)`)을 서버 코드가 반드시 직접** 해야 한다. 이걸 빠뜨리면 아무 후기나 삭제 가능해진다. 수정도 동일.

---

## 권한 흐름 정리 ("로그인 사용자만 후기 작성")

RLS·Supabase Auth를 쓰지 않으므로 **권한 방어선은 서버 코드 한 곳**이다. 서버 로직을 빠짐없이 작성하는 것이 중요하다.

| 계층 | 어떻게 막는가 |
|------|--------------|
| **UI** | 비로그인 시 작성 폼 대신 "로그인 필요" 안내만 렌더 (UX용, 방어선 아님) |
| **Server Action (핵심)** | `getCurrentUser()`로 세션 확인, 없으면 거부. `user_id`는 세션에서만 취하고, 수정/삭제는 `.eq("user_id", user.id)`로 소유권 강제 |
| **DB 접근 경계** | `anon`/`authenticated` 롤 권한 회수로 브라우저의 직접 접근 차단. 테이블은 서버의 `service_role`로만 접근 |

---

## 테스트 체크리스트

- [ ] SQL 실행 후 Supabase **Table Editor**에 `users`, `sessions`, `reviews` 3개 테이블 생성 확인
- [ ] `.env.local`(`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) 설정 후 `npm run dev`
- [ ] 회원가입 → `users`에 행 추가, `password_hash`가 **평문이 아님** 확인, 자동 로그인됨
- [ ] 같은 이메일 재가입 → "이미 가입된 이메일" 오류
- [ ] 로그아웃 후 로그인 → 정상. 틀린 비밀번호 → "이메일 또는 비밀번호가 올바르지 않습니다"
- [ ] 로그인 후 새로고침 → 세션 유지(쿠키 `session` httpOnly 확인)
- [ ] 로그아웃 → `sessions` 행 삭제 + 쿠키 제거, 작성 폼이 "로그인 필요"로 바뀜
- [ ] **비로그인** `/reviews`: 목록은 보이나 작성 폼 안 보임
- [ ] 로그인 후 후기 작성 → 목록 최상단 즉시 반영 / 5자 미만·별점 미선택 → 검증 오류
- [ ] **다른 사용자의 후기 삭제 시도 → "권한 없음"** (서버 `.eq("user_id", ...)` 검증)
- [ ] `SUPABASE_SERVICE_ROLE_KEY`가 클라이언트 번들에 없는지 확인 (브라우저 DevTools 소스 검색)

---

## 보안 체크리스트 (자체 인증이라 특히 중요)

- [ ] 비밀번호는 bcrypt(cost 12+) 해시로만 저장. 평문·단순 해시 금지
- [ ] 세션 토큰은 `crypto.randomBytes`로 생성, DB엔 **해시만** 저장
- [ ] 세션 쿠키는 `httpOnly` + `sameSite=lax` + 운영 시 `secure`
- [ ] 로그인 실패 메시지로 계정 존재 여부를 노출하지 않음
- [ ] (권장) 로그인 시도 **레이트 리밋** — 무차별 대입 방지
- [ ] (권장) 만료 세션 정리 — 로그인 시 `expires_at < now()` 삭제 또는 pg_cron

---

## 향후 확장 (선택)

- **이메일 인증**: 가입 시 인증 토큰 메일 발송(기존 Resend 재사용) → 확인 후 활성화 컬럼 `email_verified` 토글
- **비밀번호 재설정**: 재설정 토큰 테이블 + 메일 링크
- **세션 갱신/슬라이딩 만료**: 접근 시 `expires_at` 연장
- **프로필 확장**: `users`에 아바타·bio 추가 또는 `profiles` 분리
- **후기 평점 집계/신고/페이지네이션**: 평균 별점, 신고 테이블, `range()` 커서 페이지네이션
- **CSRF 방어**: Server Action은 기본적으로 same-origin이지만, 민감 작업엔 토큰 추가 고려

---

## 요약

| 파일 | 역할 |
|------|------|
| `supabase/migrations/0001_reviews.sql` | `users` + `sessions` + `reviews` 테이블, 공개 롤 권한 회수 |
| `lib/supabase/admin.ts` | **service_role 클라이언트** — 모든 테이블 접근 (서버 한정) |
| `lib/auth/password.ts` | bcrypt 해시/검증 |
| `lib/auth/session.ts` | 세션 발급/조회/삭제, `getCurrentUser` |
| `app/(auth)/login/*` | 로그인·회원가입 화면 및 Server Action |
| `app/auth/signout/route.ts` | 로그아웃 |
| `app/reviews/*` | 후기 목록(admin 읽기) + (로그인 시) 작성/삭제 |
| `components/auth/AuthButton.tsx` | 헤더 로그인/로그아웃 표시 |

핵심은 **Supabase는 DB로만** 쓰고, 인증(비밀번호 해시·세션)은 **자체 `users`/`sessions` 테이블**로 구현하며, 모든 DB 접근을 서버의 `service_role`로 통일하는 것이다. "후기 작성은 로그인 사용자 본인만"은 **Server Action에서 명시적으로 검증**한다. 환경변수는 서버 전용 `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` 두 개다.
