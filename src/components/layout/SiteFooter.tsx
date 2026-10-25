import { footer } from "../lib/content";
import { external } from "../ui/Button";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <nav className={styles.links} aria-label="Footer">
          {footer.links.map((link) => (
            <a key={link.label} href={link.href} {...external()}>
              {link.label}
            </a>
          ))}
        </nav>
        <p>{footer.note}</p>
      </div>
    </footer>
  );
}
