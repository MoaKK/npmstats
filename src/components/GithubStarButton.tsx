import Image from "next/image";
import Link from "next/link";

const GITHUB_OWNER = "MoaKK";
const GITHUB_REPO = "npmstats";

async function fetchStarCount(): Promise<number | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data: { stargazers_count?: number } = await res.json();
    return data.stargazers_count ?? null;
  } catch {
    return null;
  }
}

async function GithubStarButton() {
  const stars = await fetchStarCount();
  const repoUrl = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;

  return (
    <Link
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Star on GitHub (opens in new tab)"
      className="flex items-center overflow-hidden rounded-md border text-xs font-medium transition-colors hover:bg-muted sm:text-sm"
    >
      <span className="flex items-center gap-1 border-r px-2 py-1 sm:gap-1.5 sm:px-2.5">
        <Image src="/github-icon.svg" alt="" width={14} height={14} className="dark:invert sm:h-4 sm:w-4" />
        Star
      </span>
      {stars !== null && (
        <span className="px-2 py-1 tabular-nums sm:px-2.5">
          {stars.toLocaleString()}
        </span>
      )}
    </Link>
  );
}

export { GithubStarButton };
