import type { DownloadRange, PackageMeta, NpmSearchResult, PackageStats } from "@/types/npm";
import { NPM_DOWNLOADS_BASE, NPM_REGISTRY_BASE } from "@/lib/constants";

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

async function fetchSingleDownload(name: string, period: FetchPeriod): Promise<Record<string, DownloadRange>> {
  const res = await fetch(
    `${NPM_DOWNLOADS_BASE}/downloads/range/${period}/${encodeURIComponent(name)}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return {};
  const data = await res.json() as DownloadRange;
  return { [name]: data };
}

async function fetchBulkDownload(names: string[], period: FetchPeriod): Promise<Record<string, DownloadRange>> {
  if (names.length === 0) return {};
  if (names.length === 1) return fetchSingleDownload(names[0], period);
  const res = await fetch(
    `${NPM_DOWNLOADS_BASE}/downloads/range/${period}/${names.join(",")}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return {};
  return res.json() as Promise<Record<string, DownloadRange>>;
}

async function fetchUserDownloads(packageNames: string[], period: FetchPeriod = "last-month"): Promise<DownloadRange> {
  if (packageNames.length === 0) return { downloads: [], start: "", end: "", package: "" };

  const scoped = packageNames.filter((n) => n.startsWith("@"));
  const unscoped = packageNames.filter((n) => !n.startsWith("@"));

  const unscopedBatches: string[][] = [];
  for (let i = 0; i < unscoped.length; i += 50) {
    unscopedBatches.push(unscoped.slice(i, i + 50));
  }

  const results = await Promise.all([
    ...scoped.map((name) => fetchSingleDownload(name, period)),
    ...unscopedBatches.map((batch) => fetchBulkDownload(batch, period)),
  ]);

  const byDate = new Map<string, number>();
  for (const result of results) {
    for (const pkg of Object.values(result)) {
      if (!pkg?.downloads) continue;
      for (const day of pkg.downloads) {
        byDate.set(day.day, (byDate.get(day.day) ?? 0) + day.downloads);
      }
    }
  }

  const downloads = Array.from(byDate.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, count]) => ({ day, downloads: count }));

  return {
    downloads,
    start: downloads[0]?.day ?? "",
    end: downloads[downloads.length - 1]?.day ?? "",
    package: "",
  };
}

export { fetchAllDownloads, fetchPackageMeta, fetchUserPackages, fetchUserDownloads };
