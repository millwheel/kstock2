import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { problem } from "@/lib/landing-content";
import styles from "./ProblemSection.module.css";

export function ProblemSection() {
  return (
    <Section id="problem" variant="fill" aria-labelledby="problem-title">
      <SectionHeading
        id="problem-title"
        align="center"
        title={problem.title}
        subtitle={
          <span className={styles.questions}>
            {problem.questions.map((q) => (
              <span key={q} className={styles.question}>
                {q}
              </span>
            ))}
          </span>
        }
      />
      <ul className={styles.grid}>
        {problem.cards.map((card, i) => (
          <li key={card.title} className={styles.card}>
            <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDesc}>{card.desc}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
