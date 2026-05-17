import type { DownloadRange, PackageMeta, NpmSearchResult, PackageStats } from "@/types/npm";

const NPM_DOWNLOADS_BASE = "https://api.npmjs.org";
const NPM_REGISTRY_BASE = "https://registry.npmjs.org";

type FetchPeriod = "last-day" | "last-week" | "last-month" | "last-year";

async function fetchDownloadRange(period: FetchPeriod, packageName: string): Promise<DownloadRange> {
  const res = await fetch(
    `${NPM_DOWNLOADS_BASE}/downloads/range/${period}/${packageName}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error(`Failed to fetch downloads: ${res.status}`);
  return res.json() as Promise<DownloadRange>;
}

async function fetchAllDownloads(packageName: string): Promise<PackageStats> {
  const [daily, weekly, monthly, yearly] = await Promise.all([
    fetchDownloadRange("last-day", packageName),
    fetchDownloadRange("last-week", packageName),
    fetchDownloadRange("last-month", packageName),
    fetchDownloadRange("last-year", packageName),
  ]);
  return { daily, weekly, monthly, yearly };
}

async function fetchPackageMeta(packageName: string): Promise<PackageMeta> {
  const res = await fetch(
    `${NPM_REGISTRY_BASE}/${packageName}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error(`Package not found: ${packageName}`);
  return res.json() as Promise<PackageMeta>;
}

async function fetchUserPackages(username: string): Promise<NpmSearchResult> {
  const res = await fetch(
    `${NPM_REGISTRY_BASE}/-/v1/search?text=maintainer:${username}&size=250`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error(`Failed to fetch packages for: ${username}`);
  return res.json() as Promise<NpmSearchResult>;
}

export { fetchAllDownloads, fetchPackageMeta, fetchUserPackages };
