"use client";

import { type ComponentProps, useState } from "react";

type FormSubmitEvent = Parameters<
  NonNullable<ComponentProps<"form">["onSubmit"]>
>[0];
import { trackCtaClick } from "@/lib/analytics";
import styles from "./ContactForm.module.css";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormSubmitEvent) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setStatus("sending");
    setErrorMsg("");
    trackCtaClick("contact_submit", "final_cta");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok: boolean; error?: string }
        | null;

      if (res.ok && json?.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(json?.error ?? "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  }

  if (status === "ok") {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successTitle}>문의가 접수되었습니다 ✓</p>
        <p className={styles.successBody}>
          빠른 시일 내에 입력하신 이메일로 답변드리겠습니다. 감사합니다.
        </p>
        <button
          type="button"
          className={styles.resetButton}
          onClick={() => setStatus("idle")}
        >
          새 문의 작성하기
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-name">
          이름
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          className={styles.input}
          placeholder="홍길동"
          autoComplete="name"
          required
          disabled={status === "sending"}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-email">
          이메일
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          className={styles.input}
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={status === "sending"}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-message">
          문의 내용
        </label>
        <textarea
          id="contact-message"
          name="message"
          className={styles.textarea}
          placeholder="문의하실 내용을 자유롭게 남겨 주세요."
          rows={4}
          required
          disabled={status === "sending"}
        />
      </div>

      {status === "error" && (
        <p className={styles.error} role="alert">
          {errorMsg}
        </p>
      )}

      <button type="submit" className={styles.submit} disabled={status === "sending"}>
        {status === "sending" ? "전송 중…" : "문의 보내기"}
      </button>
    </form>
  );
}
