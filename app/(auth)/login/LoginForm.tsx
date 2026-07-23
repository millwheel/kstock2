"use client";

import { useState, useTransition } from "react";
import { signIn, signUp } from "./actions";
import styles from "./LoginForm.module.css";

type Mode = "signin" | "signup";

export function LoginForm() {
  const [mode, setMode] = useState<Mode>("signin");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handle(formData: FormData) {
    setError("");

    if (mode === "signup") {
      const password = String(formData.get("password") ?? "");
      const passwordConfirm = String(formData.get("passwordConfirm") ?? "");
      if (password !== passwordConfirm) {
        setError("비밀번호가 일치하지 않습니다.");
        return;
      }
    }

    startTransition(async () => {
      // 성공 시 서버 액션이 redirect 하므로 아래 result는 실패 시에만 반환된다.
      const result = await (mode === "signin" ? signIn : signUp)(formData);
      if (result?.error) setError(result.error);
    });
  }

  function toggleMode() {
    setMode((m) => (m === "signin" ? "signup" : "signin"));
    setError("");
  }

  return (
    <form className={styles.form} action={handle}>
      <h1 className={styles.title}>{mode === "signin" ? "로그인" : "회원가입"}</h1>
      <p className={styles.subtitle}>
        {mode === "signin"
          ? "이메일과 비밀번호로 로그인하세요."
          : "후기를 남기려면 계정을 만들어 주세요."}
      </p>

      {mode === "signup" && (
        <div className={styles.field}>
          <label className={styles.label} htmlFor="auth-name">
            이름
          </label>
          <input
            id="auth-name"
            name="name"
            type="text"
            className={styles.input}
            placeholder="홍길동"
            autoComplete="name"
            required
            disabled={pending}
          />
        </div>
      )}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="auth-email">
          이메일
        </label>
        <input
          id="auth-email"
          name="email"
          type="email"
          className={styles.input}
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={pending}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="auth-password">
          비밀번호
        </label>
        <input
          id="auth-password"
          name="password"
          type="password"
          className={styles.input}
          placeholder={mode === "signup" ? "8자 이상" : "비밀번호"}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          required
          minLength={8}
          disabled={pending}
        />
      </div>

      {mode === "signup" && (
        <div className={styles.field}>
          <label className={styles.label} htmlFor="auth-password-confirm">
            비밀번호 확인
          </label>
          <input
            id="auth-password-confirm"
            name="passwordConfirm"
            type="password"
            className={styles.input}
            placeholder="비밀번호를 다시 입력해 주세요"
            autoComplete="new-password"
            required
            minLength={8}
            disabled={pending}
          />
        </div>
      )}

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <button type="submit" className={styles.submit} disabled={pending}>
        {pending ? "처리 중…" : mode === "signin" ? "로그인" : "회원가입"}
      </button>

      <button type="button" className={styles.toggle} onClick={toggleMode} disabled={pending}>
        {mode === "signin"
          ? "계정이 없으신가요? 회원가입"
          : "이미 계정이 있으신가요? 로그인"}
      </button>
    </form>
  );
}
