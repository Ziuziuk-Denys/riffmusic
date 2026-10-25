import type { CSSProperties } from "react";

import { Icon, type IconName } from "../ui/Icon";
import styles from "./BrandCard.module.css";

export const brandColors: Partial<Record<IconName, string>> = {
  youtubeMusic: "#ff0000",
  youtube: "#ff0000",
  soundcloud: "#ff5500",
  spotify: "#1db954",
  appleMusic: "#fa243c",
};

type BrandCardProps = {
  name: IconName;
  label?: string;
  compact?: boolean;
  active?: boolean;
};

export function BrandCard({ name, label, compact, active }: BrandCardProps) {
  const classes = [styles.card, compact && styles.compact, active && styles.active].filter(Boolean).join(" ");
  return (
    <div className={classes} style={{ "--brand": brandColors[name] } as CSSProperties}>
      <Icon name={name} />
      {label}
    </div>
  );
}
