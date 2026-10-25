import type { AnchorHTMLAttributes } from "react";

import { ChevronIcon } from "./Icon";
import styles from "./Button.module.css";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { block?: boolean };

export function ButtonLink({ block, className, ...props }: LinkProps) {
  const classes = [styles.button, block && styles.block, className].filter(Boolean).join(" ");
  return <a className={classes} {...props} />;
}

export function MoreLink({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={styles.more} {...props}>
      {children}
      <ChevronIcon />
    </a>
  );
}

export function external(isExternal = true) {
  return isExternal ? { target: "_blank", rel: "noopener" } : {};
}
