"use client";

import { features } from "../lib/content";
import { useInView } from "../motion/useInView";
import { Odometer } from "../ui/Odometer";
import styles from "./MemoryTile.module.css";
import { Tile } from "./Tile";

const { value, unit } = features.memory;

export function MemoryTile() {
  const [ref, inView] = useInView<HTMLDivElement>(0.6);

  return (
    <Tile title={features.memory.title} body={features.memory.body}>
      <div ref={ref} className={styles.value}>
        <Odometer value={value} label={unit} active={inView} duration={1800} className={styles.number} />
        <span className={styles.unit} aria-hidden="true">
          {unit}
        </span>
      </div>
    </Tile>
  );
}
