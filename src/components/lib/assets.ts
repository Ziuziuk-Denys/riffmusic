export type ReleaseAsset = {
  name: string;
  url: string;
};

export type AssetKey = "win" | "winzip" | "appimage" | "deb" | "dmgarm" | "dmgx64";

const assetMatchers: Record<AssetKey, (assets: ReleaseAsset[]) => ReleaseAsset | undefined> = {
  win: (assets) => assets.find((a) => /\.exe$/i.test(a.name)),
  winzip: (assets) => assets.find((a) => /\.zip$/i.test(a.name) && /win/i.test(a.name)),
  appimage: (assets) => assets.find((a) => /\.AppImage$/i.test(a.name)),
  deb: (assets) => assets.find((a) => /\.deb$/i.test(a.name)),
  dmgarm: (assets) =>
    assets.find((a) => /\.dmg$/i.test(a.name) && /arm64|aarch64|apple|silicon/i.test(a.name)) ??
    assets.find((a) => /\.dmg$/i.test(a.name) && !/x64|x86|intel/i.test(a.name)),
  dmgx64: (assets) => assets.find((a) => /\.dmg$/i.test(a.name) && /x64|x86|intel/i.test(a.name)),
};

export function pickAsset(key: AssetKey, assets: ReleaseAsset[]): ReleaseAsset | undefined {
  return assetMatchers[key](assets);
}
