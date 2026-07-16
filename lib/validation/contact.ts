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
