import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import styles from "./AuthButton.module.css";

/**
 * 헤더 등에 넣는 인증 상태 버튼 (Server Component).
 * 로그인 전: 로그인 링크 / 로그인 후: 이름 + 로그아웃 버튼.
 */
export async function AuthButton() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Link className={styles.loginLink} href="/login">
        로그인
      </Link>
    );
  }

  return (
    <div className={styles.wrap}>
      <span className={styles.name}>{user.name}</span>
      <form action="/auth/signout" method="post">
        <button type="submit" className={styles.logout}>
          로그아웃
        </button>
      </form>
    </div>
  );
}
