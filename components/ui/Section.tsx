import type { ElementType, ReactNode, Ref } from "react";
import { Container } from "./Container";
import styles from "./Section.module.css";

type SectionProps = {
  children: ReactNode;
  id?: string;
  /** background band variant */
  variant?: "page" | "fill" | "subtle" | "inverse";
  /** render without the inner Container (full-bleed) */
  bleed?: boolean;
  className?: string;
  as?: ElementType;
  /** ref to the outer section element (used for scroll observers) */
  rootRef?: Ref<HTMLElement>;
  "aria-labelledby"?: string;
};

export function Section({
  children,
  id,
  variant = "page",
  bleed = false,
  className,
  as: Tag = "section",
  rootRef,
  ...rest
}: SectionProps) {
  const classes = [styles.section, styles[variant], className].filter(Boolean).join(" ");
  return (
    <Tag id={id} ref={rootRef} className={classes} {...rest}>
      {bleed ? children : <Container>{children}</Container>}
    </Tag>
  );
}
