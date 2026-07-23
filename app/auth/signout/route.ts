import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth/session";

export async function POST(request: Request) {
  await destroySession();
  // 303으로 GET 리다이렉트 강제 (POST 재전송 방지)
  return NextResponse.redirect(new URL("/", request.url), { status: 303 });
}
