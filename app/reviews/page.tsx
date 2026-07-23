import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { AuthButton } from "@/components/auth/AuthButton";
import { brand } from "@/lib/landing-content";
import { ReviewForm } from "./ReviewForm";
import { deleteReviewForm } from "./actions";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "고객 후기",
  description: `${brand.name} 서비스를 이용한 고객들의 생생한 후기입니다.`,
};

interface ReviewRow {
  id: string;
  user_id: string;
  author_name: string;
  rating: number;
  content: string;
  created_at: string;
}

// 세션·후기 데이터를 항상 최신으로 렌더
export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const user = await getCurrentUser();

  const { data } = await supabaseAdmin
    .from("reviews")
    .select("id, user_id, author_name, rating, content, created_at")
    .order("created_at", { ascending: false });
  const reviews = (data ?? []) as ReviewRow[];

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <Link className={styles.home} href="/">
          {brand.name}
        </Link>
        <AuthButton />
      </header>

      <section className={styles.container}>
        <div className={styles.heading}>
          <h1 className={styles.title}>고객 후기</h1>
          <p className={styles.subtitle}>
            {brand.name}을 이용한 고객들의 생생한 후기입니다.
          </p>
        </div>

        {user ? (
          <ReviewForm />
        ) : (
          <p className={styles.loginNotice}>
            후기를 작성하려면 <Link href="/login">로그인</Link>이 필요합니다.
          </p>
        )}

        <ul className={styles.list}>
          {reviews.length === 0 && (
            <li className={styles.empty}>아직 등록된 후기가 없습니다. 첫 후기를 남겨보세요!</li>
          )}
          {reviews.map((r) => (
            <li key={r.id} className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.author}>{r.author_name}</span>
                <span className={styles.rating} aria-label={`${r.rating}점`}>
                  {"★".repeat(r.rating)}
                  <span className={styles.ratingOff}>{"★".repeat(5 - r.rating)}</span>
                </span>
              </div>
              <p className={styles.content}>{r.content}</p>
              <div className={styles.cardFoot}>
                <time className={styles.date} dateTime={r.created_at}>
                  {new Date(r.created_at).toLocaleDateString("ko-KR")}
                </time>
                {user?.id === r.user_id && (
                  <form action={deleteReviewForm.bind(null, r.id)}>
                    <button type="submit" className={styles.delete}>
                      삭제
                    </button>
                  </form>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
