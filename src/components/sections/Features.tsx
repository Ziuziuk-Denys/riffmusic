import { features } from "../lib/content";
import typeStyles from "../styles/type.module.css";
import { FormatsTile } from "../tiles/FormatsTile";
import { ImportTile } from "../tiles/ImportTile";
import { MemoryTile } from "../tiles/MemoryTile";
import { PresenceTile } from "../tiles/PresenceTile";
import { StreamingTile } from "../tiles/StreamingTile";
import styles from "./Features.module.css";

export function Features() {
  return (
    <section className={styles.features} id="features">
      <div className={styles.inner}>
        <h2 className={`${typeStyles.display} ${styles.title}`} data-reveal>
          {features.title}
        </h2>
        <div className={styles.tiles} data-reveal-list>
          <StreamingTile />
          <FormatsTile />
          <ImportTile />
          <PresenceTile />
          <MemoryTile />
        </div>
      </div>
    </section>
  );
}
