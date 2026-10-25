import type { CSSProperties } from "react";

import { links, telegram } from "../lib/content";
import { external } from "./Button";
import { TelegramUse } from "./Icon";
import styles from "./TelegramBanner.module.css";

// left %, top %, size px, rotation deg, duration s, delay s, opacity
const particles = [
  [6, 14, 34, -18, 7, 0, 0.22],
  [24, 70, 22, 12, 9, -2, 0.18],
  [44, 10, 18, 25, 8, -4, 0.16],
  [58, 62, 40, -8, 10, -1, 0.2],
  [72, 16, 26, 20, 7.5, -3, 0.22],
  [86, 56, 32, -22, 9.5, -5, 0.24],
  [93, 10, 16, 10, 8.5, -2, 0.16],
  [36, 82, 16, -14, 11, -6, 0.14],
  [66, 84, 18, 16, 9, -7, 0.16],
];

function particleStyle([left, top, size, rotation, duration, delay, opacity]: number[]) {
  return {
    left: `${left}%`,
    top: `${top}%`,
    width: size,
    height: size,
    opacity,
    "--r": `${rotation}deg`,
    "--dur": `${duration}s`,
    "--dl": `${delay}s`,
  } as CSSProperties;
}

export function TelegramBanner() {
  return (
    <a className={styles.banner} href={links.telegram} {...external()}>
      {particles.map((particle, index) => (
        <TelegramUse key={index} className={styles.particle} style={particleStyle(particle)} />
      ))}
      <TelegramUse className={styles.badge} />
      <span className={styles.text}>
        <b>{telegram.title}</b>
        <small>{telegram.subtitle}</small>
      </span>
      <span className={styles.action}>{telegram.action}</span>
    </a>
  );
}
