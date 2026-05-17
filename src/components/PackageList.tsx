"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { Input } from "@/components/ui/input";
import type { NpmSearchPackage } from "@/types/npm";
import { ScrollArea } from "@/components/ui/scroll-area";

type PackageListProps = {
  packages: NpmSearchPackage[];
  username: string;
};

function PackageList({ packages, username }: PackageListProps) {
  const [query, setQuery] = useState("");

  if (packages.length === 0) {
    return (
      <Item>
        <ItemContent>
          <p className="text-sm text-muted-foreground">
            No public packages found for { username }.
          </p>
        </ItemContent>
      </Item>
    );
  }

  const filtered = query
    ? packages.filter((pkg) =>
      pkg.name.toLowerCase().includes(query.toLowerCase())
    )
    : packages;

  return (
    <Item variant="outline" className="overflow-hidden">
      <ItemContent className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 border-b py-3">
          <ItemTitle className="text-xl font-medium">
            { username ? `${username}'s p` : "P" }ackages
          </ItemTitle>
          { packages.length > 10 && (
            <Input
              type="search"
              placeholder="Search packages..."
              value={ query }
              onChange={ (e) => setQuery(e.target.value) }
              className="h-8 w-full text-sm sm:w-48"
            />
          ) }
        </div>
        <ScrollArea className="max-h-[600px] rounded-md overflow-y-auto">
          <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3">
            { filtered.map((pkg) => (
              <Link key={ pkg.name } href={ `/package/${pkg.name}` } title={ `View stats for ${pkg.name}` } aria-label={ `View stats for ${pkg.name}` }>
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg font-medium">{ pkg.name }</CardTitle>
                      <Badge variant="secondary" className="shrink-0 text-xs">
                        v{ pkg.version }
                      </Badge>
                    </div>
                  </CardHeader>
                  { pkg.description && (
                    <CardContent>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        { pkg.description }
                      </p>
                    </CardContent>
                  ) }
                </Card>
              </Link>
            )) }
            { filtered.length === 0 && (
              <p className="col-span-full text-sm text-muted-foreground">
                No packages match &quot;{ query }&quot;.
              </p>
            ) }
          </div>
        </ScrollArea>
      </ItemContent>
    </Item>
  );
}

export { PackageList };
