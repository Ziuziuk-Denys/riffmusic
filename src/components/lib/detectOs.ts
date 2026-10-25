export type Os = "win" | "mac" | "linux" | "android" | "ios";

export type DetectedOs = { os: Os | "other"; arm?: boolean };

type UaNavigator = Navigator & {
  userAgentData?: {
    platform?: string;
    getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string }>;
  };
};

export const osNames: Record<Os, string> = {
  win: "Windows",
  mac: "macOS",
  linux: "Linux",
  android: "Android",
  ios: "iOS",
};

export async function detectOs(): Promise<DetectedOs> {
  const nav = navigator as UaNavigator;
  const ua = nav.userAgent;
  const platform = nav.userAgentData?.platform || nav.platform || "";

  if (/Android/i.test(ua)) {
    return { os: "android" };
  }
  if (/iPhone|iPad|iPod/i.test(ua) || (/Mac/i.test(platform) && nav.maxTouchPoints > 1)) {
    return { os: "ios" };
  }
  if (/Win/i.test(platform + ua)) {
    return { os: "win" };
  }
  if (/Mac/i.test(platform + ua)) {
    const hints = await nav.userAgentData?.getHighEntropyValues?.(["architecture"]).catch(() => undefined);
    return { os: "mac", arm: hints?.architecture !== "x86" };
  }
  if (/Linux|X11|CrOS/i.test(platform + ua)) {
    return { os: "linux" };
  }
  return { os: "other" };
}
