import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchUserPackages } from "@/lib/npm-api";
import { isValidUsername, sanitizeUsername } from "@/lib/validators";
import { PackageList } from "@/components/PackageList";
import { BackButton } from "@/components/BackButton";

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
    <main className="mx-auto flex max-w-4xl flex-col gap-8 p-8">
      <BackButton className="flex-start w-20"/>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{sanitized}</h1>
        <p className="text-sm text-muted-foreground">
          {result.total} public {result.total === 1 ? "package" : "packages"}
        </p>
      </div>
      <PackageList
        packages={result.objects.map((o) => o.package)}
        username={sanitized}
      />
    </main>
  );
}

export { generateMetadata };
export default UserPage;
