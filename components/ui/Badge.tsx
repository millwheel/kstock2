import type { ReactNode } from "react";
import styles from "./Badge.module.css";

type BadgeProps = {
  children: ReactNode;
  /** tone conveys status; up/down are the only place semantic color appears */
  tone?: "neutral" | "up" | "down" | "brand";
  className?: string;
};

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  const classes = [styles.badge, styles[tone], className].filter(Boolean).join(" ");
  return <span className={classes}>{children}</span>;
}
