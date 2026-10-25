import Image from "next/image";

import { pickAsset, type AssetKey } from "../lib/assets";
import { download, images, links, platforms } from "../lib/content";
import type { RiffStats } from "../lib/stats";
import typeStyles from "../styles/type.module.css";
import { ButtonLink, external } from "../ui/Button";
import { CopyButton } from "../ui/CopyButton";
import { PlatformIcon } from "../ui/Icon";
import styles from "./Download.module.css";

type Resolved = { href: string; isExternal: boolean; hidden: boolean };

// Direct asset links when found, otherwise the releases page; missing secondary links hide
function resolveLink(key: AssetKey, stats: RiffStats, isPrimary: boolean): Resolved {
  const asset = pickAsset(key, stats.assets);
  if (asset) {
    return { href: asset.url, isExternal: false, hidden: false };
  }
  if (stats.assets.length === 0) {
    return { href: links.releases, isExternal: true, hidden: false };
  }
  return { href: isPrimary ? links.latestRelease : links.releases, isExternal: !isPrimary, hidden: !isPrimary };
}

export function Download({ stats }: { stats: RiffStats }) {
  const noDeb = stats.assets.length > 0 && !pickAsset("deb", stats.assets);

  return (
    <section className={styles.download} id="download">
      <div className={styles.inner}>
        <h2 className={typeStyles.display} data-reveal>
          {download.title}
        </h2>
        <p className={`${typeStyles.lead} ${styles.lead}`} data-reveal>
          {download.lead}
        </p>
        <div className={styles.shot} data-zoom>
          <Image
            src={images.releases.src}
            alt={images.releases.alt}
            width={images.releases.width}
            height={images.releases.height}
            sizes="(max-width: 900px) 100vw, 900px"
          />
        </div>

        <div className={styles.grid} data-reveal-list>
          {platforms.map((platform) => {
            const primary = resolveLink(platform.primary.asset, stats, true);
            const secondary = resolveLink(platform.secondary.asset, stats, false);
            const requirement = platform.os === "linux" && noDeb ? "AppImage" : platform.requirement;
            return (
              <article key={platform.name} className={styles.card} data-reveal-item>
                <div className={styles.icon}>
                  <PlatformIcon os={platform.os} />
                </div>
                <h3 className={styles.name}>{platform.name}</h3>
                <div className={styles.requirement}>{requirement}</div>
                <p className={styles.body}>{platform.body}</p>
                <ButtonLink href={primary.href} block {...external(primary.isExternal)}>
                  {platform.primary.label}
                </ButtonLink>
                {!secondary.hidden && (
                  <a className={styles.alt} href={secondary.href} {...external(secondary.isExternal)}>
                    {platform.secondary.label}
                  </a>
                )}
              </article>
            );
          })}
        </div>

        <div className={styles.code} data-reveal>
          <small>{download.macHint}</small>
          <CopyButton text={download.macCommands.join(" && ")} className={styles.copy} />
          <pre>{download.macCommands.join("\n")}</pre>
        </div>
      </div>
    </section>
  );
}
