type Period = "last-day" | "last-week" | "last-month" | "last-year";

type DownloadDay = {
  downloads: number;
  day: string;
};

type DownloadRange = {
  downloads: DownloadDay[];
  start: string;
  end: string;
  package: string;
};

type DownloadPoint = {
  downloads: number;
  start: string;
  end: string;
  package: string;
};

type PackageAuthor = {
  name: string;
  email?: string;
  url?: string;
};

type PackageMaintainer = {
  name: string;
  email: string;
};

type PackageMeta = {
  name: string;
  description?: string;
  "dist-tags": { latest: string };
  time: Record<string, string>;
  homepage?: string;
  repository?: { type: string; url: string };
  bugs?: { url: string };
  license?: string;
  author?: PackageAuthor | string;
  maintainers: PackageMaintainer[];
  keywords?: string[];
};

type NpmSearchPackage = {
  name: string;
  version: string;
  description?: string;
  keywords?: string[];
  date: string;
  links: {
    npm: string;
    homepage?: string;
    repository?: string;
  };
  author?: { name: string; email?: string };
};

type NpmSearchResult = {
  objects: Array<{
    package: NpmSearchPackage;
    score: {
      final: number;
      detail: { quality: number; popularity: number; maintenance: number };
    };
    searchScore: number;
  }>;
  total: number;
  time: string;
};

type PackageStats = {
  daily: DownloadRange;
  weekly: DownloadRange;
  monthly: DownloadRange;
  yearly: DownloadRange;
};

export type {
  Period,
  DownloadDay,
  DownloadRange,
  DownloadPoint,
  PackageAuthor,
  PackageMaintainer,
  PackageMeta,
  NpmSearchPackage,
  NpmSearchResult,
  PackageStats,
};
