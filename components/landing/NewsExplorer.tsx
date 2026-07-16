"use client";

import { type ComponentProps, useCallback, useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { newsExplorer } from "@/lib/landing-content";
import { SENTIMENT_LABEL, type Sentiment } from "@/lib/news/sentiment";
import styles from "./NewsExplorer.module.css";

type FormSubmitEvent = Parameters<
  NonNullable<ComponentProps<"form">["onSubmit"]>
>[0];

type NewsItem = {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  sentiment: Sentiment;
};

type ApiResponse =
  | { ok: true; query: string; items: NewsItem[] }
  | { ok: false; error: string };

type Status = "idle" | "loading" | "ok" | "error";

/** pubDate(ISO) → "방금 전 / N분 전 / N시간 전 / N일 전 / YYYY.MM.DD" */
function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diffMin = Math.round((Date.now() - then) / 60000);
  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}시간 전`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}일 전`;
  const d = new Date(then);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function NewsExplorer() {
  const [input, setInput] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [items, setItems] = useState<NewsItem[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  // 마지막 요청만 반영해 빠른 연속 클릭 시 응답 순서 꼬임을 방지
  const reqId = useRef(0);

  const runSearch = useCallback(
    async (term: string, source: "preset" | "input") => {
      const query = term.trim();
      if (query.length === 0) return;

      const id = ++reqId.current;
      setActive(query);
      setStatus("loading");
      setErrorMsg("");
      track({ name: "news_search", query, source });

      try {
        const res = await fetch(`/api/news?q=${encodeURIComponent(query)}`);
        const json = (await res.json().catch(() => null)) as ApiResponse | null;
        if (id !== reqId.current) return; // 뒤늦게 도착한 응답 무시

        if (res.ok && json?.ok) {
          setItems(json.items);
          setStatus("ok");
        } else {
          setStatus("error");
          setErrorMsg(
            (json && !json.ok && json.error) ||
              "뉴스를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
          );
        }
      } catch {
        if (id !== reqId.current) return;
        setStatus("error");
        setErrorMsg("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    },
    []
  );

  // 첫 진입 시 대표 종목 하나를 미리 불러와 섹션이 살아있게 한다.
  useEffect(() => {
    void runSearch(newsExplorer.presets[0], "preset");
  }, [runSearch]);

  function handleSubmit(e: FormSubmitEvent) {
    e.preventDefault();
    void runSearch(input, "input");
  }

  return (
    <div className={styles.explorer}>
      <form className={styles.searchBar} onSubmit={handleSubmit} role="search">
        <label htmlFor="news-query" className="sr-only">
          {newsExplorer.searchLabel}
        </label>
        <input
          id="news-query"
          type="text"
          className={styles.input}
          placeholder={newsExplorer.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={40}
          autoComplete="off"
        />
        <button type="submit" className={styles.searchButton}>
          {newsExplorer.searchButton}
        </button>
      </form>

      <div className={styles.presets}>
        {newsExplorer.presets.map((name) => (
          <button
            key={name}
            type="button"
            className={styles.chip}
            data-active={active === name || undefined}
            aria-pressed={active === name}
            onClick={() => {
              setInput("");
              void runSearch(name, "preset");
            }}
          >
            {name}
          </button>
        ))}
      </div>

      <div className={styles.results} aria-live="polite" aria-busy={status === "loading"}>
        {status === "ok" && (
          <p className={styles.resultsHead}>
            <b>{active}</b> 관련 최신 뉴스
          </p>
        )}

        {status === "loading" &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.skeleton} aria-hidden="true">
              <span className={styles.skelPill} />
              <span className={styles.skelLine} />
              <span className={styles.skelLineShort} />
            </div>
          ))}

        {status === "error" && (
          <p className={styles.error} role="alert">
            {errorMsg}
          </p>
        )}

        {status === "ok" && items.length === 0 && (
          <p className={styles.empty}>관련 뉴스를 찾지 못했어요. 다른 종목을 검색해보세요.</p>
        )}

        {status === "ok" &&
          items.map((item) => (
            <a
              key={item.link}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <span
                className={styles.pill}
                data-sentiment={item.sentiment}
              >
                {SENTIMENT_LABEL[item.sentiment]}
              </span>
              <span className={styles.cardBody}>
                <span className={styles.cardTitle}>{item.title}</span>
                {item.description && (
                  <span className={styles.cardDesc}>{item.description}</span>
                )}
                <span className={styles.cardMeta}>
                  {item.source && <span className={styles.source}>{item.source}</span>}
                  <span className={styles.time}>{relativeTime(item.pubDate)}</span>
                </span>
              </span>
            </a>
          ))}
      </div>

      <p className={styles.disclaimer}>{newsExplorer.disclaimer}</p>
    </div>
  );
}
