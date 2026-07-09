import { Container } from "../ui/Container";
import { brand, footer, nav } from "@/lib/landing-content";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.wordmark}>{brand.name}</span>
            <span className={styles.tagline}>{brand.tagline}</span>
          </div>
          <nav className={styles.links} aria-label="바닥글 메뉴">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className={styles.link}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <p className={styles.disclaimer}>{footer.disclaimerShort}</p>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} {brand.name}. 서비스 준비 중입니다.
        </p>
      </Container>
    </footer>
  );
}
