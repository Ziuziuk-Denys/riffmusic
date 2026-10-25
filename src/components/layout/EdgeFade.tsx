import styles from "./EdgeFade.module.css";

export function EdgeFade({ side }: { side: "top" | "bottom" }) {
  return (
    <div className={`${styles.edge} ${styles[side]}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}
