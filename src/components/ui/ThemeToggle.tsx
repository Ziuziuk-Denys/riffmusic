"use client";

import { nav } from "../lib/content";
import { applyTheme, currentTheme } from "../lib/theme";
import { originOf, washFrom } from "../motion/wash";
import { MoonIcon, SunIcon } from "./Icon";
import styles from "./ThemeToggle.module.css";

// Icons follow data-theme in CSS, so every toggle on the page stays in sync
export function ThemeToggle({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={`${styles.toggle} ${className ?? ""}`}
      aria-label={nav.toggleTheme}
      onClick={(event) => {
        const next = currentTheme() === "dark" ? "light" : "dark";
        washFrom(originOf(event.currentTarget), () => applyTheme(next));
      }}
    >
      <MoonIcon className={styles.moon} />
      <SunIcon className={styles.sun} />
    </button>
  );
}
