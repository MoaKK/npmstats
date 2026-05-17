import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchUserPackages } from "@/lib/npm-api";
import { isValidUsername, sanitizeUsername } from "@/lib/validators";
import { PackageList } from "@/components/PackageList";
import { BackButton } from "@/components/BackButton";
import { UserDownloadsChart } from "@/components/UserDownloadsChart";
import { Skeleton } from "@/components/ui/skeleton";
import { Item, ItemContent, ItemTitle, ItemDescription } from "@/components/ui/item";

type Props = {
  params: Promise<{ username: string }>;
};

async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `${username} - npmstats`,
    description: `npm packages published by ${username}`,
  };
}

async function UserPage({ params }: Props) {
  const { username } = await params;
  const sanitized = sanitizeUsername(username);

  if (!isValidUsername(sanitized)) notFound();

  const result = await fetchUserPackages(sanitized).catch(() => null);

  if (!result) notFound();

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-4 p-4 sm:gap-8 sm:p-8">
      <BackButton className="flex-start w-20"/>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle className="text-base font-semibold">{sanitized}</ItemTitle>
          <ItemDescription>
            {result.total} public {result.total === 1 ? "package" : "packages"}
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" className="overflow-hidden">
        <ItemContent className="min-w-0">
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <UserDownloadsChart packages={result.objects.map((o) => o.package)} userName={sanitized} />
          </Suspense>
        </ItemContent>
      </Item>
      <PackageList
        packages={result.objects.map((o) => o.package)}
        username={sanitized}
      />
    </main>
  );
}

export { generateMetadata };
export default UserPage;
