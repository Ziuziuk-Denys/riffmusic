import Image from "next/image";
import type { ReactNode } from "react";

import typeStyles from "../styles/type.module.css";
import styles from "./SplitSection.module.css";

type SplitImage = { src: string; alt: string; width: number; height: number };

type SplitSectionProps = {
  id: string;
  title: string;
  lead: string;
  image: SplitImage;
  mediaSide: "left" | "right";
  gray?: boolean;
  children?: ReactNode;
};

export function SplitSection({ id, title, lead, image, mediaSide, gray, children }: SplitSectionProps) {
  const classes = [styles.split, gray && styles.gray, mediaSide === "left" && styles.mediaLeft]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} id={id}>
      <div className={styles.copy} data-reveal>
        <h2 className={typeStyles.display}>{title}</h2>
        <p className={typeStyles.lead}>{lead}</p>
        {children}
      </div>
      <div className={styles.media} data-slide={mediaSide}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(max-width: 900px) 130vw, 70vw"
        />
      </div>
    </section>
  );
}
