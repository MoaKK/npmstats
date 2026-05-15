import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { NpmSearchPackage } from "@/types/npm";

type PackageListProps = {
  packages: NpmSearchPackage[];
  username: string;
};

function PackageList({ packages, username }: PackageListProps) {
  if (packages.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No public packages found for {username}.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {packages.map((pkg) => (
        <Link key={pkg.name} href={`/package/${pkg.name}`}>
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-sm font-medium">{pkg.name}</CardTitle>
                <Badge variant="secondary" className="shrink-0 text-xs">
                  v{pkg.version}
                </Badge>
              </div>
            </CardHeader>
            {pkg.description && (
              <CardContent>
                <p className="line-clamp-2 text-xs text-muted-foreground">
                  {pkg.description}
                </p>
              </CardContent>
            )}
          </Card>
        </Link>
      ))}
    </div>
  );
}

export { PackageList };
