"use client";

import { useEffect, useState } from "react";

import { features, playlistLinks } from "../lib/content";
import { prefersReducedMotion } from "../motion/gsap";
import { useInView } from "../motion/useInView";
import { CheckIcon } from "../ui/Icon";
import { BrandCard } from "./BrandCard";
import styles from "./ImportTile.module.css";
import { Tile } from "./Tile";

const typeSpeed = 45;
const holdTime = 1600;

export function ImportTile() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [linkIndex, setLinkIndex] = useState(0);
  const [typed, setTyped] = useState(playlistLinks[0].url.length);

  const url = playlistLinks[linkIndex].url;
  const done = typed >= url.length;

  useEffect(() => {
    if (!inView || prefersReducedMotion()) {
      return;
    }
    const timer = window.setTimeout(
      () => {
        if (done) {
          setLinkIndex((linkIndex + 1) % playlistLinks.length);
          setTyped(0);
        } else {
          setTyped(typed + 1);
        }
      },
      done ? holdTime : typeSpeed,
    );
    return () => window.clearTimeout(timer);
  }, [inView, done, typed, linkIndex]);

  return (
    <Tile title={features.importing.title} body={features.importing.body}>
      <div ref={ref} className={styles.stack}>
        <div className={styles.brands}>
          {playlistLinks.map((link, index) => (
            <BrandCard key={link.service} name={link.service} compact active={index === linkIndex && done} />
          ))}
        </div>
        <div className={[styles.url, done && styles.done].filter(Boolean).join(" ")} aria-hidden="true">
          <span className={styles.typed}>{url.slice(0, typed)}</span>
          <span className={styles.caret} />
          <CheckIcon className={styles.check} />
        </div>
      </div>
    </Tile>
  );
}
