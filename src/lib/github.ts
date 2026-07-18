import { projects } from "@/lib/data/projects";

export type RepoStats = {
  slug: string;
  stars: number;
  primaryLanguage: string | null;
  languages: Record<string, number>;
  pushedAt: string | null;
};

const GITHUB_API = "https://api.github.com";
const OWNER = "emmanuelokocha1234-commits";

async function fetchRepoStats(slug: string): Promise<RepoStats> {
  const fallback: RepoStats = {
    slug,
    stars: 0,
    primaryLanguage: null,
    languages: {},
    pushedAt: null,
  };

  try {
    const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${slug}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return fallback;
    const data = await res.json();

    const langRes = await fetch(
      `${GITHUB_API}/repos/${OWNER}/${slug}/languages`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }
    );
    const languages = langRes.ok ? await langRes.json() : {};

    return {
      slug,
      stars: data.stargazers_count ?? 0,
      primaryLanguage: data.language ?? null,
      languages,
      pushedAt: data.pushed_at ?? null,
    };
  } catch {
    return fallback;
  }
}

export async function getAllRepoStats(): Promise<Record<string, RepoStats>> {
  const slugs = projects.map((p) => p.slug);
  const results = await Promise.all(slugs.map(fetchRepoStats));
  return Object.fromEntries(results.map((r) => [r.slug, r]));
}
