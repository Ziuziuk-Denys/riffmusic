import type { CSSProperties, ReactNode } from "react";

import { counters } from "../lib/content";
import { Icon, TelegramUse } from "./Icon";
import { Odometer } from "./Odometer";
import styles from "./Counters.module.css";

type CountersProps = { downloads: number; stars: number; subscribers: number };

type Counter = {
  value: number;
  label: string;
  icon?: ReactNode;
  size: "big" | "small";
  rollDelay: number;
};

export function Counters({ downloads, stars, subscribers }: CountersProps) {
  const items: Counter[] = [
    { value: downloads, label: counters.downloads, size: "big" as const, rollDelay: 900 },
    { value: stars, label: counters.stars, icon: <Icon name="star" />, size: "small" as const, rollDelay: 1150 },
    { value: subscribers, label: counters.subscribers, icon: <TelegramUse />, size: "small" as const, rollDelay: 1400 },
  ].filter((item) => item.value > 0);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.counters} style={{ "--count": items.length } as CSSProperties}>
      {items.map((item, index) => (
        <div
          key={item.label}
          className={styles.counter}
          style={{ "--delay": `${0.5 + index * 0.25}s` } as CSSProperties}
        >
          <Odometer value={item.value} label={item.label} active delay={item.rollDelay} className={styles[item.size]} />
          <p className={styles.label}>
            {item.icon}
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
