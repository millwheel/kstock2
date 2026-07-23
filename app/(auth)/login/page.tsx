import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { LoginForm } from "./LoginForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "로그인 · 회원가입",
};

export default async function LoginPage() {
  // 이미 로그인한 사용자는 후기 페이지로 보낸다.
  const user = await getCurrentUser();
  if (user) redirect("/reviews");

  return (
    <main className={styles.page}>
      <LoginForm />
      <Link className={styles.backLink} href="/">
        ← 홈으로 돌아가기
      </Link>
    </main>
  );
}
