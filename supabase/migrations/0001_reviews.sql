-- ============================================================================
-- 0001_init.sql
-- 자체 인증(users) + 세션(sessions) + 후기(reviews) 스키마
--
-- 설계:
--   * Supabase Auth를 사용하지 않는다. 로그인은 자체 public.users 테이블 기반.
--   * 비밀번호는 서버(Node)에서 해시(bcrypt/argon2)한 값만 저장한다. 평문 저장 금지.
--   * 로그인 상태는 sessions 테이블 + httpOnly 쿠키(불투명 토큰)로 유지한다.
--     쿠키에는 원본 토큰을, DB에는 그 토큰의 해시만 저장한다(유출 대비).
--   * 모든 DB 접근은 서버의 service_role 키로만 수행한다. RLS는 사용하지 않고,
--     공개 롤(anon/authenticated)의 접근은 revoke로 차단한다.
--
-- 실행: Supabase 대시보드 → SQL Editor 에 붙여넣고 Run.
--       (또는 Supabase CLI: `supabase db push`)
-- 참고 문서: docs/auth-and-reviews.md
-- ============================================================================

-- 이메일을 대소문자 구분 없이 unique 처리하기 위한 확장
create extension if not exists citext;

-- 1) 사용자 테이블 ----------------------------------------------------------
create table if not exists public.users (
  id            uuid primary key default gen_random_uuid(),
  email         citext not null unique,                       -- 대소문자 무시 unique
  password_hash text not null,                                -- bcrypt/argon2 해시 (평문 금지)
  name          text not null,
  created_at    timestamptz not null default now()
);

-- 2) 세션 테이블 ------------------------------------------------------------
-- 쿠키에 담는 원본 토큰이 아니라, 그 토큰의 해시(sha-256 등)를 저장한다.
create table if not exists public.sessions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.users (id) on delete cascade,
  token_hash  text not null unique,                           -- hash(원본 세션 토큰)
  expires_at  timestamptz not null,                           -- 만료 시각 (예: 발급 + 30일)
  created_at  timestamptz not null default now()
);

create index if not exists sessions_token_hash_idx on public.sessions (token_hash);
create index if not exists sessions_user_id_idx    on public.sessions (user_id);

-- 3) 후기 테이블 ------------------------------------------------------------
create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.users (id) on delete cascade,
  author_name text not null,                                  -- 표시용 이름 (작성 시점 스냅샷)
  rating      int  not null check (rating between 1 and 5),
  content     text not null check (char_length(content) between 5 and 2000),
  created_at  timestamptz not null default now()
);

create index if not exists reviews_created_at_idx on public.reviews (created_at desc);
create index if not exists reviews_user_id_idx    on public.reviews (user_id);

