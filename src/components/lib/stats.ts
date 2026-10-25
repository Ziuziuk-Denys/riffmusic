import type { ReleaseAsset } from "./assets";
import { links, repo } from "./content";
import { parseSubscribers } from "./subscribers";

export type RiffStats = {
  version: string;
  assets: ReleaseAsset[];
  downloads: number;
  stars: number;
  subscribers: number;
};

type GithubAsset = { name: string; browser_download_url: string; download_count?: number };
type GithubRelease = { tag_name?: string; assets?: GithubAsset[] };

const timeoutMs = 10000;
const api = "https://api.github.com/repos/" + repo;

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!response.ok) {
    throw new Error(url + " returned " + response.status);
  }
  return (await response.json()) as T;
}

async function latestRelease(): Promise<Pick<RiffStats, "version" | "assets">> {
  const release = await getJson<GithubRelease>(api + "/releases/latest");
  return {
    version: (release.tag_name ?? "").replace(/^v/, ""),
    assets: (release.assets ?? []).map((asset) => ({ name: asset.name, url: asset.browser_download_url })),
  };
}

async function totalDownloads(): Promise<number> {
  let sum = 0;
  for (let page = 1; page <= 10; page++) {
    const releases = await getJson<GithubRelease[]>(api + "/releases?per_page=100&page=" + page);
    for (const release of releases) {
      for (const asset of release.assets ?? []) {
        sum += asset.download_count ?? 0;
      }
    }
    if (releases.length < 100) {
      break;
    }
  }
  return sum;
}

async function stars(): Promise<number> {
  const info = await getJson<{ stargazers_count?: number }>(api);
  return info.stargazers_count ?? 0;
}

async function subscribers(): Promise<number> {
  const response = await fetch(links.telegram, { signal: AbortSignal.timeout(timeoutMs) });
  if (!response.ok) {
    throw new Error("t.me returned " + response.status);
  }
  return parseSubscribers(await response.text());
}

async function orFallback<T>(label: string, task: Promise<T>, fallback: T): Promise<T> {
  try {
    return await task;
  } catch (error) {
    console.warn("riff: " + label + " lookup failed", error);
    return fallback;
  }
}

// Each value fails on its own; zero hides that counter
export async function getRiffStats(): Promise<RiffStats> {
  const [release, downloads, starCount, subscriberCount] = await Promise.all([
    orFallback("release", latestRelease(), { version: "", assets: [] }),
    orFallback("downloads", totalDownloads(), 0),
    orFallback("stars", stars(), 0),
    orFallback("subscribers", subscribers(), 0),
  ]);
  return { ...release, downloads, stars: starCount, subscribers: subscriberCount };
}
