import type { ReactNode } from "react";

import styles from "./Tile.module.css";

type TileProps = {
  title: string;
  body: string;
  wide?: boolean;
  children: ReactNode;
};

export function Tile({ title, body, wide, children }: TileProps) {
  return (
    <article className={[styles.tile, wide && styles.wide].filter(Boolean).join(" ")} data-reveal-item>
      <div className={styles.visual}>{children}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.body}>{body}</p>
    </article>
  );
}
