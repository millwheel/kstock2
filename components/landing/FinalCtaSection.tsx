"use client";

import { Apple, Play } from "lucide-react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { ContactForm } from "./ContactForm";
import { finalCta } from "@/lib/landing-content";
import { trackCtaClick } from "@/lib/analytics";
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

        <div className={styles.primaryRow}>
          <Button
            href={finalCta.primary.href}
            variant="yellow"
            size="lg"
            analyticsId={finalCta.primary.id}
            onClick={() => trackCtaClick(finalCta.primary.id, "final_cta")}
          >
            {finalCta.primary.label}
          </Button>
        </div>

        <div className={styles.storeRow}>
          <Button
            href={finalCta.appStore.href}
            variant="outline"
            analyticsId={finalCta.appStore.id}
            onClick={() => trackCtaClick(finalCta.appStore.id, "final_cta")}
          >
            <Apple size={18} aria-hidden="true" />
            {finalCta.appStore.label}
          </Button>
          <Button
            href={finalCta.playStore.href}
            variant="outline"
            analyticsId={finalCta.playStore.id}
            onClick={() => trackCtaClick(finalCta.playStore.id, "final_cta")}
          >
            <Play size={18} aria-hidden="true" />
            {finalCta.playStore.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
