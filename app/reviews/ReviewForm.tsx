"use client";

import { useState, useTransition } from "react";
import { createReview } from "./actions";
import styles from "./ReviewForm.module.css";

export function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handle(formData: FormData) {
    setError("");
    startTransition(async () => {
      const result = await createReview(formData);
      if ("error" in result) {
        setError(result.error);
      } else {
        setRating(5);
        setContent("");
      }
    });
  }

  return (
    <form className={styles.form} action={handle}>
      <input type="hidden" name="rating" value={rating} />

      <div className={styles.ratingRow}>
        <span className={styles.label}>별점</span>
        <div className={styles.stars} role="radiogroup" aria-label="별점 선택">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={styles.star}
              aria-label={`${n}점`}
              aria-checked={rating === n}
              role="radio"
              onClick={() => setRating(n)}
              disabled={pending}
            >
              <span className={n <= rating ? styles.starOn : styles.starOff}>★</span>
            </button>
          ))}
        </div>
      </div>

      <textarea
        name="content"
        className={styles.textarea}
        placeholder="서비스 이용 후기를 남겨 주세요. (5자 이상)"
        rows={4}
        required
        minLength={5}
        maxLength={2000}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={pending}
      />

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <button type="submit" className={styles.submit} disabled={pending}>
        {pending ? "등록 중…" : "후기 등록"}
      </button>
    </form>
  );
}
