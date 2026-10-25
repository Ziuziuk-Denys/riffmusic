import type { CSSProperties, SVGProps } from "react";

import type { Os } from "../lib/detectOs";
import { iconPaths } from "../lib/iconPaths";

export type IconName = keyof typeof iconPaths;

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d={iconPaths[name]} />
    </svg>
  );
}

export function PlatformIcon({ os }: { os: Os }) {
  if (os === "android") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={iconPaths.android} />
        <circle cx="9.4" cy="6" r=".8" fill="var(--blue)" />
        <circle cx="14.6" cy="6" r=".8" fill="var(--blue)" />
      </svg>
    );
  }
  const name: IconName = os === "win" ? "windows" : os === "linux" ? "linux" : "apple";
  return <Icon name={name} />;
}

export function TelegramSymbol() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="tg" viewBox="0 0 24 24">
        <path d={iconPaths.telegram} />
      </symbol>
    </svg>
  );
}

export function TelegramUse({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} aria-hidden="true">
      <use href="#tg" />
    </svg>
  );
}

const strokeProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function ChevronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...strokeProps} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  );
}
