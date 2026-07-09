import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { solution } from "@/lib/landing-content";
import styles from "./SolutionSection.module.css";

export function SolutionSection() {
  return (
    <Section id="solution" variant="page" aria-labelledby="solution-title">
      <SectionHeading
        id="solution-title"
        align="center"
        title={solution.title}
        subtitle={solution.subtitle}
      />
      <ul className={styles.grid}>
        {solution.items.map((item) => (
          <li key={item.title} className={styles.item}>
            <span className={styles.check} aria-hidden="true">
              ✓
            </span>
            <div>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDesc}>{item.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
