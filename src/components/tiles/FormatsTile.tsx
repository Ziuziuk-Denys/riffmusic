"use client";

import { features } from "../lib/content";
import { useInView } from "../motion/useInView";
import styles from "./FormatsTile.module.css";
import { Tile } from "./Tile";
import { useCycle } from "./useCycle";

const { formats } = features.files;

export function FormatsTile() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [active, setActive] = useCycle(formats.length, 1800, inView);

  return (
    <Tile title={features.files.title} body={features.files.body}>
      <div ref={ref} className={styles.grid}>
        {formats.map((format, index) => (
          <span
            key={format}
            className={[styles.format, index === active && styles.active].filter(Boolean).join(" ")}
            onPointerEnter={() => setActive(index)}
          >
            {format}
            <span className={styles.bars} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </span>
        ))}
      </div>
    </Tile>
  );
}
