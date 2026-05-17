import { GITHUB_OWNER, GITHUB_REPO } from "@/lib/constants";

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

export { fetchStarCount };
