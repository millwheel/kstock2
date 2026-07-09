/**
 * Lightweight analytics event hook layer.
 *
 * No analytics vendor is wired yet — this centralizes the call sites so a real
 * provider (GA4, Amplitude, etc.) can be attached in one place later. CTA clicks,
 * scroll depth, and FAQ reach all funnel through `track`.
 */

export type AnalyticsEvent =
  | { name: "cta_click"; id: string; location: string }
  | { name: "scroll_depth"; percent: number }
  | { name: "faq_reach" }
  | { name: "faq_toggle"; question: string; open: boolean };

export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  // Bridge to a global queue if a provider is present; otherwise no-op in prod,
  // debug-log in development so the wiring is observable during implementation.
  const w = window as typeof window & { dataLayer?: unknown[] };
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push(event);
  }

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event);
  }
}

export function trackCtaClick(id: string, location: string): void {
  track({ name: "cta_click", id, location });
}
