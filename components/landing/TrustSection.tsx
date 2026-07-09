import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { trust } from "@/lib/landing-content";
import styles from "./TrustSection.module.css";

export function TrustSection() {
  return (
    <Section id="trust" variant="fill" aria-labelledby="trust-title">
      <SectionHeading id="trust-title" align="center" title={trust.title} />
      <ul className={styles.grid}>
        {trust.points.map((point) => (
          <li key={point.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{point.title}</h3>
            <p className={styles.cardDesc}>{point.desc}</p>
          </li>
        ))}
      </ul>

      <p className={styles.beta}>{trust.betaNote}</p>

      <p className={styles.disclaimer} role="note">
        {trust.disclaimer}
      </p>
    </Section>
  );
}
