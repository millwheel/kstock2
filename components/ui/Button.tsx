import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "yellow" | "black" | "outline";
type Size = "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** analytics identifier surfaced as data-analytics-id */
  analyticsId?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

/** Link-styled CTA button. All landing CTAs are anchors (download / reservation). */
export function Button({
  children,
  href,
  variant = "yellow",
  size = "md",
  className,
  analyticsId,
  ...rest
}: ButtonProps) {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");
  return (
    <a href={href} className={classes} data-analytics-id={analyticsId} {...rest}>
      {children}
    </a>
  );
}
