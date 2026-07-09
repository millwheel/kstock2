"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { brand, nav, RESERVATION_HREF } from "@/lib/landing-content";
import { trackCtaClick } from "@/lib/analytics";
import styles from "./Header.module.css";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <a href="#top" className={styles.wordmark} aria-label={`${brand.name} 홈`}>
          <span className={styles.mark} aria-hidden="true">
            {brand.wordmark.charAt(0)}
          </span>
          {brand.name}
        </a>

        <nav className={styles.nav} aria-label="주요 메뉴">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.desktopCta}>
          <Button
            href={RESERVATION_HREF}
            variant="yellow"
            analyticsId="header_reservation"
            onClick={() => trackCtaClick("header_reservation", "header")}
          >
            사전예약하기
          </Button>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </Container>

      {open && (
        <div className={styles.mobileMenu} id="mobile-menu">
          <Container>
            <nav className={styles.mobileNav} aria-label="모바일 메뉴">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={styles.mobileLink}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button
                href={RESERVATION_HREF}
                variant="yellow"
                analyticsId="header_reservation_mobile"
                onClick={() => {
                  trackCtaClick("header_reservation_mobile", "header_mobile");
                  setOpen(false);
                }}
              >
                사전예약하기
              </Button>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
