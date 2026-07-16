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

/**
 * 디자인 시스템(styles/tokens.css) 값을 이메일용으로 고정한 상수.
 * 이메일 클라이언트는 CSS 변수·외부 폰트·클래스를 신뢰할 수 없으므로
 * 토큰을 실제 hex/px 값으로 해석해 인라인 스타일에 사용한다.
 */
const ds = {
  brandName: "한눈",
  wordmarkChar: "한",
  tagline: "흩어진 투자 정보를 한 화면에",
  // Base palette
  yellow: "#ffe300", // --kb-yellow (브랜드/CTA 전용)
  black: "#1e1e1e", // --kb-black
  white: "#ffffff", // --kb-white
  gray: "#a3a3a3", // --kb-gray
  surfaceFill: "#f7f7f7", // --kb-surface-fill
  borderSubtle: "#e6e6e6", // --kb-border-subtle
  // Text
  textHeading: "#1e1e1e", // --color-text-heading
  textBody: "#1e1e1e", // --color-text-body
  textSecondary: "#a3a3a3", // --color-text-secondary
  textOnBrand: "#1e1e1e", // --color-text-on-brand (NEVER white-on-yellow)
  textOnInverse: "#ffffff", // --color-text-on-inverse
  // Radius / type
  radiusLg: "16px", // --radius-lg
  radiusMd: "12px", // --radius-md
  radiusFull: "9999px", // --radius-full
  fontSans:
    "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI', 'Noto Sans KR', Roboto, sans-serif",
} as const;

// 사용자 입력이 HTML에 들어가므로 이스케이프 필수 (XSS/깨짐 방지)
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** label/value 한 줄 (서브틀 구분선 포함) */
function detailRow(label: string, valueHtml: string, isLast = false): string {
  const border = isLast ? "" : `border-bottom: 1px solid ${ds.borderSubtle};`;
  return `
              <tr>
                <td style="padding: 14px 0; ${border} color: ${ds.textSecondary}; font-size: 13px; font-weight: 600; width: 84px; vertical-align: top;">${label}</td>
                <td style="padding: 14px 0; ${border} color: ${ds.textBody}; font-size: 15px; line-height: 1.6; vertical-align: top;">${valueHtml}</td>
              </tr>`;
}

export function renderContactInquiryEmail(data: ContactInquiry): RenderedEmail {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const message = escapeHtml(data.message).replace(/\n/g, "<br />");

  const subject = `[${ds.brandName}] ${data.name}님의 새 문의가 도착했습니다`;

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light only" />
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background: ${ds.surfaceFill}; -webkit-font-smoothing: antialiased;">
  <span style="display: none; visibility: hidden; opacity: 0; height: 0; width: 0; overflow: hidden;">${name}님이 문의를 남기셨습니다 — 내용을 확인하세요.</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: ${ds.surfaceFill};">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 560px; font-family: ${ds.fontSans};">

          <!-- Brand header -->
          <tr>
            <td style="background: ${ds.black}; border-radius: ${ds.radiusLg} ${ds.radiusLg} 0 0; padding: 24px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: middle;">
                    <span style="display: inline-block; width: 30px; height: 30px; line-height: 30px; text-align: center; background: ${ds.yellow}; color: ${ds.textOnBrand}; font-weight: 800; font-size: 15px; border-radius: 8px;">${ds.wordmarkChar}</span>
                  </td>
                  <td style="vertical-align: middle; padding-left: 10px;">
                    <span style="color: ${ds.textOnInverse}; font-size: 17px; font-weight: 800; letter-spacing: -0.02em;">${ds.brandName}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Yellow accent bar -->
          <tr>
            <td style="height: 4px; background: ${ds.yellow}; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Body card -->
          <tr>
            <td style="background: ${ds.white}; border: 1px solid ${ds.borderSubtle}; border-top: none; border-radius: 0 0 ${ds.radiusLg} ${ds.radiusLg}; padding: 32px 28px;">

              <p style="margin: 0 0 6px; color: ${ds.textSecondary}; font-size: 13px; font-weight: 600; letter-spacing: 0.02em;">NEW INQUIRY</p>
              <h1 style="margin: 0 0 24px; color: ${ds.textHeading}; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.35;">새 문의가 접수되었습니다</h1>

              <!-- Details -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${detailRow("이름", name)}
                ${detailRow("이메일", `<a href="mailto:${email}" style="color: ${ds.textBody}; text-decoration: underline;">${email}</a>`, true)}
              </table>

              <!-- Message block -->
              <p style="margin: 24px 0 8px; color: ${ds.textSecondary}; font-size: 13px; font-weight: 600;">문의 내용</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background: ${ds.surfaceFill}; border: 1px solid ${ds.borderSubtle}; border-radius: ${ds.radiusMd}; padding: 18px 20px; color: ${ds.textBody}; font-size: 15px; line-height: 1.7; white-space: pre-line; word-break: break-word;">${message}</td>
                </tr>
              </table>

              <!-- Reply CTA (yellow, black text — single-yellow discipline) -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 28px 0 4px;">
                <tr>
                  <td style="background: ${ds.yellow}; border-radius: ${ds.radiusFull};">
                    <a href="mailto:${email}?subject=${encodeURIComponent(`[${ds.brandName}] 문의에 대한 답변`)}" style="display: inline-block; padding: 13px 28px; color: ${ds.textOnBrand}; font-size: 15px; font-weight: 700; text-decoration: none;">고객에게 답장하기</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 28px; text-align: center;">
              <p style="margin: 0 0 2px; color: ${ds.textSecondary}; font-size: 12px;">${ds.brandName} · ${ds.tagline}</p>
              <p style="margin: 0; color: ${ds.textSecondary}; font-size: 12px;">이 메일은 랜딩 페이지 문의 폼을 통해 자동 발송되었습니다.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `[${ds.brandName}] 새 문의가 접수되었습니다`,
    "",
    `이름: ${data.name}`,
    `이메일: ${data.email}`,
    "",
    "문의 내용:",
    data.message,
    "",
    "—",
    `${ds.brandName} · ${ds.tagline}`,
    "이 메일은 랜딩 페이지 문의 폼을 통해 자동 발송되었습니다.",
  ].join("\n");

  return { subject, html, text };
}
