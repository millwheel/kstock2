import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { NewsExplorer } from "./NewsExplorer";
import { newsExplorer } from "@/lib/landing-content";

export function NewsSection() {
  return (
    <Section id="news" variant="fill" aria-labelledby="news-title">
      <SectionHeading
        id="news-title"
        align="center"
        eyebrow={newsExplorer.eyebrow}
        title={newsExplorer.title}
        subtitle={newsExplorer.subtitle}
      />
      <NewsExplorer />
    </Section>
  );
}
