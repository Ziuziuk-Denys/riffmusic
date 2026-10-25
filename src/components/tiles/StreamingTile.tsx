import { features } from "../lib/content";
import { BrandCard } from "./BrandCard";
import styles from "./StreamingTile.module.css";
import { Tile } from "./Tile";

export function StreamingTile() {
  return (
    <Tile title={features.streaming.title} body={features.streaming.body} wide>
      <div className={styles.brands}>
        <BrandCard name="youtubeMusic" label="YouTube Music" />
        <BrandCard name="youtube" label="YouTube" />
        <BrandCard name="soundcloud" label="SoundCloud" />
      </div>
    </Tile>
  );
}
