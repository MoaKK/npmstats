import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PackageMeta } from "@/types/npm";

function getAuthorName(author: PackageMeta["author"]): string | null {
  if (!author) return null;
  if (typeof author === "string") return author;
  return author.name ?? null;
}

type PackageMetaCardProps = {
  meta: PackageMeta;
};

function PackageMetaCard({ meta }: PackageMetaCardProps) {
  const authorName = getAuthorName(meta.author);
  const latestVersion = meta["dist-tags"].latest;
  const npmUrl = `https://www.npmjs.com/package/${meta.name}`;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl">{meta.name}</CardTitle>
            {meta.description && (
              <p className="text-sm text-muted-foreground">{meta.description}</p>
            )}
          </div>
          <Badge variant="secondary">v{latestVersion}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          {authorName && <span>by {authorName}</span>}
          {meta.license && <span>{meta.license}</span>}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={npmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline underline-offset-4"
          >
            npm
          </Link>
          {meta.homepage && (
            <Link
              href={meta.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-4"
            >
              homepage
            </Link>
          )}
          {meta.repository?.url && (
            <Link
              href={meta.repository.url.replace(/^git\+/, "").replace(/\.git$/, "")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-4"
            >
              repository
            </Link>
          )}
        </div>
        {meta.keywords && meta.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {meta.keywords.slice(0, 8).map((kw) => (
              <Badge key={kw} variant="outline" className="text-xs">
                {kw}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { PackageMetaCard };
