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
