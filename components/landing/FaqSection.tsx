"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { faq } from "@/lib/landing-content";
import { track } from "@/lib/analytics";
import styles from "./FaqSection.module.css";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const reached = useRef(false);

  // fire a single faq_reach event when the section scrolls into view
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !reached.current) {
            reached.current = true;
            track({ name: "faq_reach" });
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const toggle = (index: number, question: string) => {
    const next = openIndex === index ? null : index;
    setOpenIndex(next);
    track({ name: "faq_toggle", question, open: next === index });
  };

  return (
    <Section id="faq" variant="page" rootRef={sectionRef} aria-labelledby="faq-title">
      <SectionHeading id="faq-title" align="center" title={faq.title} />
      <ul className={styles.list}>
        {faq.items.map((item, i) => {
          const isOpen = openIndex === i;
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-button-${i}`;
          return (
            <li key={item.q} className={styles.item}>
              <h3 className={styles.qWrap}>
                <button
                  type="button"
                  id={buttonId}
                  className={styles.question}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i, item.q)}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    size={20}
                    aria-hidden="true"
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={styles.answer}
                hidden={!isOpen}
              >
                <p>{item.a}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
