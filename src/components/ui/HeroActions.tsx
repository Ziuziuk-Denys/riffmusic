"use client";

import { useEffect, useState } from "react";

import { pickAsset, type AssetKey, type ReleaseAsset } from "../lib/assets";
import { hero, links } from "../lib/content";
import { detectOs, osNames, type DetectedOs } from "../lib/detectOs";
import { ButtonLink, external, MoreLink } from "./Button";
import { PlatformIcon } from "./Icon";
import styles from "./HeroActions.module.css";

type HeroActionsProps = { assets: ReleaseAsset[]; version: string };

function assetKeyFor({ os, arm }: DetectedOs): AssetKey | null {
  if (os === "win") return "win";
  if (os === "linux") return "appimage";
  if (os === "mac") return arm === false ? "dmgx64" : "dmgarm";
  return null;
}

export function HeroActions({ assets, version }: HeroActionsProps) {
  const [detected, setDetected] = useState<DetectedOs>({ os: "other" });

  useEffect(() => {
    detectOs().then(setDetected);
  }, []);

  const { os } = detected;
  const isMobile = os === "android" || os === "ios";
  const name = os === "other" ? "" : osNames[os];
  const key = assetKeyFor(detected);
  const href = isMobile ? links.mobileFork : ((key && pickAsset(key, assets)?.url) ?? links.latestRelease);

  let note = <>{hero.note}</>;
  if (isMobile) {
    note = (
      <>
        {hero.mobileNote} <a href="#faq">{hero.mobileNoteLink}</a>.
      </>
    );
  } else if (name && version && assets.length > 0) {
    note = <>{`Version ${version} for ${name}. Free and open source.`}</>;
  }

  return (
    <>
      <div className={styles.actions}>
        <ButtonLink href={href} {...external(isMobile)}>
          {os !== "other" && <PlatformIcon os={os === "ios" ? "mac" : os} />}
          <span>{name ? `Download for ${name}` : hero.download}</span>
        </ButtonLink>
        <MoreLink href="#download">{hero.otherPlatforms}</MoreLink>
        <MoreLink href={links.repo} {...external()}>
          {hero.viewSource}
        </MoreLink>
      </div>
      <p className={styles.note}>{note}</p>
    </>
  );
}
