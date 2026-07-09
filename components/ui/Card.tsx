import type { ReactNode } from "react";
import styles from "./Card.module.css";

type CardProps = {
  children: ReactNode;
  /** fill uses a subtle gray surface; default uses white + border */
  variant?: "default" | "fill";
  className?: string;
};

/** Flat, border-based card. No elevation by default — depth comes from bg-fill + 1px border. */
export function Card({ children, variant = "default", className }: CardProps) {
  const classes = [styles.card, styles[variant], className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
}
