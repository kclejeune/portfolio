// ---------------------------------------------------------------------------
// Public, view-friendly shapes
// ---------------------------------------------------------------------------

export interface Repository {
  name: string;
  stargazerCount: number;
  forkCount: number;
  url: string;
  description: string;
  repositoryTopics: string[];
  languages: string[];
  /** Largest language in the repo, GitHub-style (name + brand color). */
  primaryLanguage: { name: string; color: string } | null;
}

export interface LanguageStat {
  name: string;
  color: string;
  /** Total bytes of this language across the parsed repositories. */
  size: number;
  /** Repo-averaged share, 0–100 (each repository is weighted equally). */
  percent: number;
}

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  date: string;
  count: number;
  /** Intensity bucket used for coloring the heatmap. */
  level: ContributionLevel;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface ContributionCalendar {
  total: number;
  weeks: ContributionWeek[];
}

export interface ProfileStats {
  followers: number;
  publicRepos: number;
  totalStars: number;
}

export interface GithubProfile {
  repos: Repository[];
  languages: LanguageStat[];
  contributions: ContributionCalendar;
  stats: ProfileStats;
}

// ---------------------------------------------------------------------------
// Sorting
// ---------------------------------------------------------------------------

export function compare(a: Repository, b: Repository) {
  const starDiff = b.stargazerCount - a.stargazerCount;
  const forkDiff = b.forkCount - a.forkCount;
  const tagDiff =
    b.repositoryTopics.length - a.repositoryTopics.length + b.languages.length - a.languages.length;
  const nameDiff = a.name.localeCompare(b.name);
  return starDiff || forkDiff || tagDiff || nameDiff;
}

// ---------------------------------------------------------------------------
// Parsers — map GitHub's deeply nested GraphQL response into the shapes above.
// Inputs are typed loosely because the raw response is untrusted/variable.
// ---------------------------------------------------------------------------

export function parseRepositories(nodes: any[]): Repository[] {
  const repos: Repository[] = (nodes ?? []).filter(Boolean).map((node: any) => {
    // Language nodes are ordered by size, so the first is the primary one.
    const languageNodes: any[] = (node.languages?.nodes ?? []).filter((l: any) => l?.name);
    const primary = languageNodes[0];
    return {
      name: node.name,
      stargazerCount: node.stargazerCount ?? 0,
      forkCount: node.forkCount ?? 0,
      url: node.url,
      description: node.description ?? "",
      repositoryTopics: (node.repositoryTopics?.nodes ?? [])
        .map((t: any) => t?.topic?.name)
        .filter(Boolean),
      languages: languageNodes.map((l: any) => l.name),
      primaryLanguage: primary ? { name: primary.name, color: primary.color ?? "#94a3b8" } : null,
    };
  });
  return repos.sort(compare);
}

export function aggregateLanguages(nodes: any[], top = 6): LanguageStat[] {
  // Weight each repository equally: a language's share is its average share
  // *within* each repo, not its raw byte total. This stops one large or
  // verbose codebase (e.g. a Terraform-heavy infra repo) from dominating.
  const totals = new Map<string, { color: string; size: number; weight: number }>();
  let repoCount = 0;

  for (const node of nodes ?? []) {
    const edges: any[] = (node?.languages?.edges ?? []).filter((e: any) => e?.node?.name);
    const repoTotal = edges.reduce((sum: number, e: any) => sum + (e.size ?? 0), 0);
    if (repoTotal === 0) continue;
    repoCount += 1;

    for (const edge of edges) {
      const name = edge.node.name;
      const entry = totals.get(name) ?? {
        color: edge.node.color ?? "#94a3b8",
        size: 0,
        weight: 0,
      };
      entry.size += edge.size ?? 0;
      entry.weight += (edge.size ?? 0) / repoTotal;
      totals.set(name, entry);
    }
  }

  if (repoCount === 0) return [];

  const sorted = [...totals.entries()]
    .map(([name, { color, size, weight }]) => ({
      name,
      color,
      size,
      percent: (weight / repoCount) * 100,
    }))
    .sort((a, b) => b.percent - a.percent);

  const head = sorted.slice(0, top);
  const tail = sorted.slice(top);
  if (tail.length > 0) {
    head.push({
      name: "Other",
      color: "#94a3b8",
      size: tail.reduce((s, l) => s + l.size, 0),
      percent: tail.reduce((s, l) => s + l.percent, 0),
    });
  }
  return head;
}

/** Bucket a raw contribution count into a 0–4 intensity level. */
export function contributionLevel(count: number, max: number): ContributionLevel {
  if (count <= 0) return 0;
  if (max <= 0) return 1;
  const ratio = count / max;
  if (ratio > 0.66) return 4;
  if (ratio > 0.33) return 3;
  if (ratio > 0.1) return 2;
  return 1;
}

export function parseCalendar(calendar: any): ContributionCalendar {
  const rawWeeks: any[] = calendar?.weeks ?? [];
  const max = rawWeeks.reduce((m: number, week: any) => {
    for (const day of week?.contributionDays ?? []) {
      m = Math.max(m, day?.contributionCount ?? 0);
    }
    return m;
  }, 0);

  const weeks: ContributionWeek[] = rawWeeks.map((week: any) => ({
    days: (week?.contributionDays ?? []).map((day: any) => {
      const count = day?.contributionCount ?? 0;
      return { date: day?.date, count, level: contributionLevel(count, max) };
    }),
  }));

  return { total: calendar?.totalContributions ?? 0, weeks };
}

export function parseStats(user: any): ProfileStats {
  const repoNodes: any[] = user?.repositories?.nodes ?? [];
  return {
    followers: user?.followers?.totalCount ?? 0,
    // Use the unfiltered public count so forks aren't dropped from the stat.
    // (`repositories` above is filtered to non-forks for language/star totals.)
    publicRepos: user?.publicRepoCount?.totalCount ?? user?.repositories?.totalCount ?? 0,
    totalStars: repoNodes.reduce((sum: number, r: any) => sum + (r?.stargazerCount ?? 0), 0),
  };
}

/** Compose a full profile from the raw GraphQL JSON response. */
export function buildProfile(json: any): GithubProfile {
  const user = json?.data?.user ?? {};
  return {
    repos: parseRepositories(user?.itemShowcase?.items?.nodes ?? []),
    languages: aggregateLanguages(user?.repositories?.nodes ?? []),
    contributions: parseCalendar(user?.contributionsCollection?.contributionCalendar ?? {}),
    stats: parseStats(user),
  };
}

// ---------------------------------------------------------------------------
// Query
// ---------------------------------------------------------------------------

export function getProfileQuery(
  username = "kclejeune",
  maxNumRepos = 12,
  maxNumTopics = 15,
  maxNumLanguages = 10,
) {
  return `
query {
  user(login: "${username}") {
    login
    name
    followers {
      totalCount
    }
    publicRepoCount: repositories(privacy: PUBLIC, ownerAffiliations: OWNER) {
      totalCount
    }
    repositories(
      ownerAffiliations: OWNER
      isFork: false
      privacy: PUBLIC
      first: 100
    ) {
      totalCount
      nodes {
        stargazerCount
        languages(first: ${maxNumLanguages}, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            size
            node {
              name
              color
            }
          }
        }
      }
    }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
    itemShowcase {
      items(first: ${maxNumRepos}) {
        nodes {
          ... on Repository {
            name
            stargazerCount
            forkCount
            url
            description
            repositoryTopics(first: ${maxNumTopics}) {
              nodes {
                topic {
                  name
                }
              }
            }
            languages(first: ${maxNumLanguages}, orderBy: { field: SIZE, direction: DESC }) {
              nodes {
                name
                color
              }
            }
          }
        }
      }
    }
  }
}
`;
}
