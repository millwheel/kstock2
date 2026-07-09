"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { AppMockup } from "./AppMockup";
import { hero } from "@/lib/landing-content";
import { trackCtaClick } from "@/lib/analytics";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <section className={styles.hero} id="top">
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 className={styles.headline}>
            {hero.headline.split("\n").map((line, i) => (
              <span key={i} className={styles.headlineLine}>
                {line}
              </span>
            ))}
          </h1>
          <p className={styles.sub}>{hero.subheadline}</p>

          <div className={styles.ctas}>
            <Button
              href={hero.primaryCta.href}
              variant="yellow"
              size="lg"
              analyticsId={hero.primaryCta.id}
              onClick={() => trackCtaClick(hero.primaryCta.id, "hero")}
            >
              {hero.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="outline"
              size="lg"
              analyticsId={hero.secondaryCta.id}
              onClick={() => trackCtaClick(hero.secondaryCta.id, "hero")}
            >
              {hero.secondaryCta.label}
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </div>

          <ul className={styles.trust}>
            {hero.trust.map((t) => (
              <li key={t.title} className={styles.trustItem}>
                <span className={styles.trustTitle}>{t.title}</span>
                <span className={styles.trustDesc}>{t.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visual}>
          <AppMockup />
        </div>
      </Container>
    </section>
  );
}
