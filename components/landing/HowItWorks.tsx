import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { howItWorks } from "@/lib/landing-content";
import styles from "./HowItWorks.module.css";

export function HowItWorks() {
  return (
    <Section id="how-it-works" variant="page" aria-labelledby="how-title">
      <SectionHeading id="how-title" align="center" title={howItWorks.title} />
      <ol className={styles.steps}>
        {howItWorks.steps.map((step, i) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.badge} aria-hidden="true">
              {i + 1}
            </span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDesc}>{step.desc}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
