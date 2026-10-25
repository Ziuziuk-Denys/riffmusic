"use client";

/* eslint-disable @next/next/no-img-element -- small static icon */
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { images, links, nav, sections } from "../lib/content";
import { external } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { ThemeToggle } from "../ui/ThemeToggle";
import styles from "./SiteNav.module.css";
import { useActiveSection } from "./useActiveSection";

const sectionIds = sections.map((section) => section.id);

// Moves the highlight pill under the active link without re-rendering the nav
function useIndicator(active: string | null) {
  const listRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const indicator = indicatorRef.current;
    const link = active ? listRef.current?.querySelector<HTMLElement>(`[href="#${active}"]`) : null;
    if (!indicator) {
      return;
    }
    if (!link) {
      indicator.style.opacity = "0";
      return;
    }
    indicator.style.translate = `${link.offsetLeft}px 0`;
    indicator.style.width = `${link.offsetWidth}px`;
    indicator.style.opacity = "1";
  }, [active]);

  return [listRef, indicatorRef] as const;
}

export function SiteNav() {
  const active = useActiveSection(sectionIds);
  const [listRef, indicatorRef] = useIndicator(active);
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const close = (event: Event) => {
      if (event instanceof KeyboardEvent) {
        if (event.key === "Escape") {
          setOpen(false);
          barRef.current?.querySelector<HTMLElement>("[aria-controls='nav-panel']")?.focus();
        }
      } else if (!barRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", close);
    barRef.current?.querySelector<HTMLElement>("#nav-panel a")?.focus();
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", close);
    };
  }, [open]);

  return (
    <header className={styles.wrapper}>
      <a className={styles.skip} href="#main">
        {nav.skip}
      </a>
      <div ref={barRef} className={[styles.bar, open && styles.open].filter(Boolean).join(" ")}>
        <nav className={styles.pill} aria-label="Main">
          <a href="#top" className={styles.brand}>
            <img src={images.icon} alt="" width={26} height={26} />
            <span>Riff</span>
          </a>

          <div ref={listRef} className={styles.links}>
            <span ref={indicatorRef} className={styles.indicator} aria-hidden="true" />
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={styles.link} aria-current={active === section.id}>
                {section.label}
              </a>
            ))}
          </div>

          <div className={styles.actions}>
            <ThemeToggle className={`${styles.iconButton} ${styles.desktopOnly}`} />
            <a href={links.repo} className={styles.chip} {...external()}>
              <Icon name="github" />
              <span>{nav.star}</span>
            </a>
            <a href="#download" className={styles.download}>
              {nav.download}
            </a>
            <button
              type="button"
              className={`${styles.iconButton} ${styles.menuButton}`}
              aria-expanded={open}
              aria-controls="nav-panel"
              aria-label={open ? nav.closeMenu : nav.openMenu}
              onClick={() => setOpen(!open)}
            >
              <span className={styles.burger} />
            </button>
          </div>
        </nav>

        <div id="nav-panel" className={styles.panel} inert={!open}>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={styles.panelLink}
              aria-current={active === section.id}
              onClick={() => setOpen(false)}
            >
              {section.label}
            </a>
          ))}
          <div className={styles.panelFooter}>
            <a href={links.repo} className={styles.chip} {...external()}>
              <Icon name="github" />
              <span>{nav.starOnGithub}</span>
            </a>
            <ThemeToggle className={styles.iconButton} />
          </div>
        </div>
      </div>
    </header>
  );
}
