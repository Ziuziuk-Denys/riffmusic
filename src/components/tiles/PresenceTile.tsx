"use client";

/* eslint-disable @next/next/no-img-element -- small static icon */
import { useEffect, useState } from "react";

import { features, images } from "../lib/content";
import { prefersReducedMotion } from "../motion/gsap";
import { useInView } from "../motion/useInView";
import styles from "./PresenceTile.module.css";
import { Tile } from "./Tile";

const trackLength = 192;
const startAt = 77;

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export function PresenceTile() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [elapsed, setElapsed] = useState(startAt);

  useEffect(() => {
    if (!inView || prefersReducedMotion()) {
      return;
    }
    const timer = window.setInterval(() => setElapsed((current) => (current + 1) % trackLength), 1000);
    return () => window.clearInterval(timer);
  }, [inView]);

  return (
    <Tile title={features.discord.title} body={features.discord.body}>
      <div ref={ref} className={styles.card} aria-hidden="true">
        <span className={styles.cover}>
          <img src={images.icon} alt="" width={44} height={44} />
        </span>
        <div className={styles.details}>
          <span className={styles.status}>
            <i className={styles.live} />
            {features.discord.status}
          </span>
          <span className={styles.title} />
          <span className={styles.artist} />
          <div className={styles.track}>
            <div
              className={styles.progress}
              style={{ width: `${(elapsed / trackLength) * 100}%`, transition: elapsed === 0 ? "none" : undefined }}
            />
          </div>
          <div className={styles.time}>
            <span>{formatTime(elapsed)}</span>
            <span>{formatTime(trackLength)}</span>
          </div>
        </div>
      </div>
    </Tile>
  );
}
