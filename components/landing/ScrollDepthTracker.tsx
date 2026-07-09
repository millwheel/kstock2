"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

const THRESHOLDS = [25, 50, 75, 100];

/** Fires a scroll_depth event once per threshold crossed. Renders nothing. */
export function ScrollDepthTracker() {
  useEffect(() => {
    const fired = new Set<number>();

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = (window.scrollY / scrollable) * 100;
      for (const t of THRESHOLDS) {
        if (percent >= t && !fired.has(t)) {
          fired.add(t);
          track({ name: "scroll_depth", percent: t });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
