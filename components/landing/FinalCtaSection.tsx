"use client";

import { Section } from "../ui/Section";
import { ContactForm } from "./ContactForm";
import { finalCta } from "@/lib/landing-content";
import styles from "./FinalCtaSection.module.css";

export function FinalCtaSection() {
  return (
    <Section id="reservation" variant="inverse" aria-labelledby="final-title">
      <div className={`${styles.wrap} inverseCtx`}>
        <h2 id="final-title" className={styles.title}>
          {finalCta.title.split("\n").map((line, i) => (
            <span key={i} className={styles.titleLine}>
              {line}
            </span>
          ))}
        </h2>
        <p className={styles.subtitle}>{finalCta.subtitle}</p>

        <div className={styles.contactFormWrap}>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
