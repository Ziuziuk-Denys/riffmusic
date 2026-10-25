/* eslint-disable @next/next/no-img-element -- small static icon */
import Image from "next/image";

import { hero, images } from "../lib/content";
import type { RiffStats } from "../lib/stats";
import { Counters } from "../ui/Counters";
import { HeroActions } from "../ui/HeroActions";
import { TelegramSymbol } from "../ui/Icon";
import { TelegramBanner } from "../ui/TelegramBanner";
import styles from "./Hero.module.css";

export function Hero({ stats }: { stats: RiffStats }) {
  return (
    <section className={styles.hero} id="top" data-scene="hero">
      <div className={styles.copy} data-hero-copy>
        <span className={styles.icon}>
          <img src={images.icon} alt="" width={96} height={96} />
        </span>
        <h1 className={styles.title}>{hero.title}</h1>
        <p className={styles.subtitle}>{hero.subtitle}</p>
        <HeroActions assets={stats.assets} version={stats.version} />
        <Counters downloads={stats.downloads} stars={stats.stars} subscribers={stats.subscribers} />
        <TelegramSymbol />
        <TelegramBanner />
      </div>
      <div className={styles.stage} data-hero-stage>
        <div className={styles.stageInner}>
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            width={images.hero.width}
            height={images.hero.height}
            sizes="(max-width: 900px) 130vw, 64vw"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
