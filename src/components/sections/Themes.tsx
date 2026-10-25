import { images, themes } from "../lib/content";
import { AccentPicker } from "../ui/AccentPicker";
import { SplitSection } from "./SplitSection";
import styles from "./Themes.module.css";

export function Themes() {
  return (
    <SplitSection id="themes" title={themes.title} lead={themes.lead} image={images.themes} mediaSide="right" gray>
      <AccentPicker />
      <p className={styles.note}>{themes.note}</p>
    </SplitSection>
  );
}
