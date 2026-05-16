import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchAllDownloads, fetchPackageMeta } from "@/lib/npm-api";
import { isValidPackageName, sanitizePackageName } from "@/lib/validators";
import { PackageMetaCard } from "@/components/PackageMetaCard";
import { StatsPanel } from "@/components/StatsPanel";
import { BackButton } from "@/components/BackButton";

type Props = {
  params: Promise<{ name: string[] }>;
};

async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const packageName = sanitizePackageName(name.map(decodeURIComponent).join("/"));

  if (!isValidPackageName(packageName)) {
    return { title: "Package not found" };
  }

  try {
    const meta = await fetchPackageMeta(packageName);
    return {
      title: `${meta.name} - npmstats`,
      description: meta.description ?? `Download stats for ${meta.name}`,
    };
  } catch {
    return { title: "Package not found" };
  }
}

async function PackagePage({ params }: Props) {
  const { name } = await params;
  const packageName = sanitizePackageName(name.map(decodeURIComponent).join("/"));

  if (!isValidPackageName(packageName)) notFound();

  const [meta, stats] = await Promise.all([
    fetchPackageMeta(packageName).catch(() => null),
    fetchAllDownloads(packageName).catch(() => null),
  ]);

  if (!meta) notFound();

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 p-8">
      <BackButton className="flex-start w-20"/>
      <PackageMetaCard meta={ meta } />
      { stats ? (
        <StatsPanel stats={ stats } />
      ) : (
        <p className="text-sm text-muted-foreground">
          No download data available for this package.
        </p>
      ) }
    </main>
  );
}

export { generateMetadata };
export default PackagePage;
