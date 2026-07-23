import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { features } from "@/lib/landing-content";
import { FeatureChart, type FeatureChartKind } from "./FeatureChart";
import styles from "./FeatureHighlights.module.css";

const chartKinds: FeatureChartKind[] = [
  "watchlist",
  "alerts",
  "portfolio",
  "market",
];

export function FeatureHighlights() {
  return (
    <Section id="features" variant="fill" aria-labelledby="features-title">
      <SectionHeading
        id="features-title"
        align="center"
        title={features.title}
        subtitle={features.subtitle}
      />
      <ul className={styles.grid}>
        {features.cards.map((card, index) => (
          <li key={card.title} className={styles.card}>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.desc}</p>
            </div>
            <FeatureChart kind={chartKinds[index]} />
            <Badge tone="brand" className={styles.metric}>
              {card.metric}
            </Badge>
          </li>
        ))}
      </ul>
    </Section>
  );
}
