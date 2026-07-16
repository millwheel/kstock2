import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  // 서버 시작/최초 호출 시 설정 누락을 조기에 드러냄
  throw new Error("RESEND_API_KEY 환경변수가 설정되지 않았습니다.");
}

export const resend = new Resend(apiKey);
