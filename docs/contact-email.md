# 문의 폼 이메일 전송 (Resend) 구현 설계

## 목표

고객이 랜딩 페이지의 **문의 폼**을 제출하면, Resend를 통해 지정된 대상 주소(`EMAIL_TO`)로 문의 내용이 이메일로 전송된다.

- API Route(`app/api/contact/route.ts`) 기반으로 서버에서 전송 처리
- 이메일 **템플릿은 별도 파일로 분리**하여 라우트 로직과 결합하지 않음
- API 키와 수신 주소는 **환경변수**로 주입

---

## 전제 / 현재 상태

- 프레임워크: Next.js `15.1.6` (App Router), React 19, TypeScript
- 경로 별칭: `@/*` → 프로젝트 루트 (`tsconfig.json`)
- 아직 없는 것: 문의 폼 UI, `resend` 패키지, API Route
- 참고: `components/landing/FinalCtaSection.tsx`에 `id="reservation"` CTA 섹션이 있어, 여기에 폼을 붙이거나 별도 섹션으로 확장 가능

---

## 사전 준비

### 1) 패키지 설치

```bash
npm install resend
```

### 2) 환경변수 (`.env.local`)

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx   # Resend 대시보드에서 발급
EMAIL_TO=owner@example.com               # 문의를 받을 대상(수신) 주소
```

> 발신(`from`) 주소는 Resend에서 **인증된 도메인**이어야 한다. 도메인 인증 전에는 테스트용 `onboarding@resend.dev`만 사용 가능하다. 인증 후 `no-reply@yourdomain.com` 형태로 교체한다. 발신 주소도 필요 시 `EMAIL_FROM` 환경변수로 분리할 수 있으나, 이번 요구사항에는 `RESEND_API_KEY`, `EMAIL_TO`만 명시되어 있으므로 `from`은 상수 또는 선택적 env로 둔다.

`.gitignore`에 `.env.local`이 포함되는지 확인 (Next.js 기본 템플릿은 포함).

---

## 파일 구조

```
app/
  api/
    contact/
      route.ts            # POST 핸들러: 유효성 검사 → Resend 전송 → 응답
lib/
  email/
    resend.ts             # Resend 클라이언트 초기화 (싱글턴)
    templates/
      contact-inquiry.ts  # 이메일 템플릿 (제목 + HTML/text 생성 함수)
  validation/
    contact.ts            # 폼 입력 타입 및 유효성 검사 (선택: 라우트 내 인라인도 가능)
```

> 최소 구성으로는 `route.ts` + `templates/contact-inquiry.ts` 두 파일이면 충분하다. `resend.ts`(클라이언트 분리), `validation/contact.ts`(검증 분리)는 권장 사항이며 아래 설계에 반영한다.

---

## 데이터 계약 (요청/응답)

### 요청 (Client → `POST /api/contact`)

```jsonc
{
  "name": "홍길동",
  "email": "customer@example.com",  // 문의한 고객의 회신용 이메일
  "message": "서비스 관련 문의드립니다."
  // 필요 시 "phone", "company" 등 확장
}
```

### 응답

| 상황 | HTTP | 바디 |
|------|------|------|
| 성공 | 200 | `{ "ok": true }` |
| 입력 검증 실패 | 400 | `{ "ok": false, "error": "메시지" }` |
| 전송 실패(Resend/서버 오류) | 500 | `{ "ok": false, "error": "메시지" }` |

---

## 구현 상세

### 1) 이메일 템플릿 — `lib/email/templates/contact-inquiry.ts`

라우트와 분리된 **순수 함수**. 입력 데이터를 받아 `{ subject, html, text }`를 반환한다. 마크업/문구 변경 시 이 파일만 수정하면 된다.

```ts
export interface ContactInquiry {
  name: string;
  email: string;
  message: string;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

// 사용자 입력이 HTML에 들어가므로 이스케이프 필수 (XSS/깨짐 방지)
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderContactInquiryEmail(data: ContactInquiry): RenderedEmail {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const message = escapeHtml(data.message).replace(/\n/g, "<br />");

  const subject = `[문의] ${data.name}님의 새 문의가 도착했습니다`;

  const html = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; color: #111;">
    <h2 style="margin: 0 0 16px;">새 문의가 접수되었습니다</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; color: #666; width: 96px;">이름</td>
        <td style="padding: 8px 0;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;">이메일</td>
        <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666; vertical-align: top;">내용</td>
        <td style="padding: 8px 0; white-space: pre-line;">${message}</td>
      </tr>
    </table>
    <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
    <p style="color: #999; font-size: 12px;">이 메일은 랜딩 페이지 문의 폼을 통해 자동 발송되었습니다.</p>
  </div>`;

  const text = [
    "새 문의가 접수되었습니다",
    "",
    `이름: ${data.name}`,
    `이메일: ${data.email}`,
    "",
    "내용:",
    data.message,
  ].join("\n");

  return { subject, html, text };
}
```

**설계 포인트**
- 입력값 HTML 이스케이프로 XSS/레이아웃 깨짐 방지
- `text` 버전 동봉 → 스팸 점수 개선 및 텍스트 전용 클라이언트 대응
- 이메일 클라이언트는 인라인 스타일만 안정적으로 지원하므로 CSS 클래스 대신 인라인 style 사용

### 2) Resend 클라이언트 — `lib/email/resend.ts`

```ts
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  // 서버 시작/최초 호출 시 설정 누락을 조기에 드러냄
  throw new Error("RESEND_API_KEY 환경변수가 설정되지 않았습니다.");
}

export const resend = new Resend(apiKey);
```

### 3) 입력 검증 — `lib/validation/contact.ts`

```ts
import type { ContactInquiry } from "@/lib/email/templates/contact-inquiry";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseContactInquiry(input: unknown):
  | { ok: true; data: ContactInquiry }
  | { ok: false; error: string } {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "잘못된 요청 형식입니다." };
  }
  const { name, email, message } = input as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) {
    return { ok: false, error: "이름을 입력해 주세요." };
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return { ok: false, error: "올바른 이메일을 입력해 주세요." };
  }
  if (typeof message !== "string" || message.trim().length < 5) {
    return { ok: false, error: "문의 내용을 5자 이상 입력해 주세요." };
  }

  return {
    ok: true,
    data: { name: name.trim(), email: email.trim(), message: message.trim() },
  };
}
```

### 4) API Route — `app/api/contact/route.ts`

```ts
import { NextResponse } from "next/server";
import { resend } from "@/lib/email/resend";
import { renderContactInquiryEmail } from "@/lib/email/templates/contact-inquiry";
import { parseContactInquiry } from "@/lib/validation/contact";

// 인증된 도메인 주소로 교체. 도메인 인증 전에는 onboarding@resend.dev 사용.
const FROM = process.env.EMAIL_FROM ?? "onboarding@resend.dev";

export async function POST(request: Request) {
  const to = process.env.EMAIL_TO;
  if (!to) {
    return NextResponse.json(
      { ok: false, error: "수신 주소가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "요청 본문을 해석할 수 없습니다." },
      { status: 400 }
    );
  }

  const parsed = parseContactInquiry(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const { subject, html, text } = renderContactInquiryEmail(parsed.data);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to,
      subject,
      html,
      text,
      replyTo: parsed.data.email, // 수신자가 바로 고객에게 회신 가능
    });

    if (error) {
      console.error("[contact] Resend 전송 실패:", error);
      return NextResponse.json(
        { ok: false, error: "이메일 전송에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] 예외:", err);
    return NextResponse.json(
      { ok: false, error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
```

**설계 포인트**
- `EMAIL_TO` 미설정 시 즉시 500으로 방어
- Resend SDK는 실패를 throw가 아닌 `{ error }`로 반환 → `error`와 `try/catch` 양쪽 처리
- `replyTo`에 고객 이메일을 넣어 회신 편의성 확보
- Route Handler는 기본적으로 Node.js 런타임에서 동작 (Resend SDK 호환)

### 5) 클라이언트 폼 (연동 예시)

별도 요구사항은 아니지만, 라우트를 호출하는 클라이언트 측 흐름 예시:

```tsx
"use client";
import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        message: form.get("message"),
      }),
    });
    setStatus(res.ok ? "ok" : "error");
    if (res.ok) e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="이름" required />
      <input name="email" type="email" placeholder="이메일" required />
      <textarea name="message" placeholder="문의 내용" required />
      <button disabled={status === "sending"}>
        {status === "sending" ? "전송 중..." : "문의하기"}
      </button>
      {status === "ok" && <p>문의가 접수되었습니다. 감사합니다!</p>}
      {status === "error" && <p>전송에 실패했습니다. 잠시 후 다시 시도해 주세요.</p>}
    </form>
  );
}
```

---

## 테스트 체크리스트

- [ ] `.env.local`에 `RESEND_API_KEY`, `EMAIL_TO` 설정 후 `npm run dev`
- [ ] 정상 입력 → 200 `{ ok: true }`, `EMAIL_TO` 메일함에 수신 확인
- [ ] 잘못된 이메일 / 빈 메시지 → 400 및 오류 메시지
- [ ] `RESEND_API_KEY` 누락 시 명확한 오류 노출
- [ ] 수신 메일에서 **회신** 시 고객 주소(`replyTo`)로 가는지 확인
- [ ] `curl` 예시:
  ```bash
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"홍길동","email":"a@b.com","message":"테스트 문의입니다."}'
  ```

---

## 향후 확장 (선택)

- **스팸 방지**: honeypot 필드, 레이트 리밋(예: IP 기반), Cloudflare Turnstile/reCAPTCHA
- **고객 확인 메일**: 고객에게도 "문의 접수" 자동 회신 (템플릿 하나 더 추가)
- **React Email**: 템플릿을 `@react-email/components`로 전환해 JSX로 관리
- **로깅/저장**: 문의 내용을 DB에 함께 저장하여 이메일 유실 대비

---

## 요약

| 파일 | 역할 |
|------|------|
| `app/api/contact/route.ts` | POST 핸들러: 검증 → 전송 → 응답 |
| `lib/email/resend.ts` | Resend 클라이언트 싱글턴 |
| `lib/email/templates/contact-inquiry.ts` | **분리된 이메일 템플릿** (subject/html/text) |
| `lib/validation/contact.ts` | 입력 유효성 검사 |

환경변수 `RESEND_API_KEY`(API 키), `EMAIL_TO`(수신 주소)로 주입하며, 발신 주소(`from`)는 인증 도메인 기반으로 별도 관리한다.
