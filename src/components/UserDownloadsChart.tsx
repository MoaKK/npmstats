import { fetchUserDownloads } from "@/lib/npm-api";
import { DownloadChart } from "@/components/DownloadChart";
import type { NpmSearchPackage } from "@/types/npm";

type Props = {
  packages: NpmSearchPackage[];
  userName?: string;
};

async function UserDownloadsChart({ packages, userName }: Props) {
  const packageNames = packages.map((p) => p.name);
  const data = await fetchUserDownloads(packageNames);

  return (
    <div className="flex min-w-0 flex-col gap-2 overflow-hidden">
      <p className="text-sm text-muted-foreground">Total downloads {userName ? `for ${userName}` : ""} - last 30 days</p>
      <DownloadChart data={data} chartType="bar" />
    </div>
  );
}

export { UserDownloadsChart };
