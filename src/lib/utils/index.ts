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
  /** Frecency share, 0–100 (70% recent activity, 30% historical footprint). */
  percent: number;
  /** Share of recent public commit activity, 0–100. */
  recentPercent: number;
  /** Repo-averaged lifetime share, 0–100 (each repository is weighted equally). */
  historicalPercent: number;
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

function languageShares(node: any): { name: string; color: string; size: number; share: number }[] {
  const edges: any[] = (node?.languages?.edges ?? []).filter(
    (edge: any) => edge?.node?.name && (edge.size ?? 0) > 0,
  );
  const total = edges.reduce((sum: number, edge: any) => sum + edge.size, 0);
  if (total === 0) return [];
  return edges.map((edge: any) => ({
    name: edge.node.name,
    color: edge.node.color ?? "#94a3b8",
    size: edge.size,
    share: edge.size / total,
  }));
}

export function aggregateLanguages(
  nodes: any[],
  recentContributions: any[] = [],
  top = 6,
): LanguageStat[] {
  const totals = new Map<
    string,
    { color: string; size: number; historical: number; recent: number }
  >();
  let historicalRepos = 0;

  for (const node of nodes ?? []) {
    const shares = languageShares(node);
    if (shares.length === 0) continue;
    historicalRepos += 1;
    for (const language of shares) {
      const entry = totals.get(language.name) ?? {
        color: language.color,
        size: 0,
        historical: 0,
        recent: 0,
      };
      entry.size += language.size;
      entry.historical += language.share;
      totals.set(language.name, entry);
    }
  }

  let recentWeight = 0;
  for (const contribution of recentContributions ?? []) {
    if (contribution?.repository?.isPrivate) continue;
    const commits = contribution?.contributions?.totalCount ?? 0;
    const shares = languageShares(contribution?.repository);
    if (commits <= 0 || shares.length === 0) continue;

    // Commit frequency is useful, but raw counts mostly measure commit style.
    // A logarithm lets sustained work rise without one noisy repo taking over.
    const weight = Math.log2(commits + 1);
    recentWeight += weight;
    for (const language of shares) {
      const entry = totals.get(language.name) ?? {
        color: language.color,
        size: 0,
        historical: 0,
        recent: 0,
      };
      entry.recent += language.share * weight;
      totals.set(language.name, entry);
    }
  }

  if (historicalRepos === 0 && recentWeight === 0) return [];

  const hasRecentActivity = recentWeight > 0;
  const sorted = [...totals.entries()]
    .map(([name, { color, size, historical, recent }]) => {
      const historicalPercent = historicalRepos > 0 ? (historical / historicalRepos) * 100 : 0;
      const recentPercent = hasRecentActivity ? (recent / recentWeight) * 100 : 0;
      return {
        name,
        color,
        size,
        percent: hasRecentActivity
          ? recentPercent * 0.7 + historicalPercent * 0.3
          : historicalPercent,
        recentPercent,
        historicalPercent,
      };
    })
    .sort((a, b) => b.percent - a.percent || b.historicalPercent - a.historicalPercent);

  const head = sorted.slice(0, top);
  const tail = sorted.slice(top);
  if (tail.length > 0) {
    head.push({
      name: "Other",
      color: "#94a3b8",
      size: tail.reduce((s, l) => s + l.size, 0),
      percent: tail.reduce((s, l) => s + l.percent, 0),
      recentPercent: tail.reduce((s, l) => s + l.recentPercent, 0),
      historicalPercent: tail.reduce((s, l) => s + l.historicalPercent, 0),
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
    languages: aggregateLanguages(
      user?.repositories?.nodes ?? [],
      user?.contributionsCollection?.commitContributionsByRepository ?? [],
    ),
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
      commitContributionsByRepository(maxRepositories: 100) {
        contributions {
          totalCount
        }
        repository {
          isPrivate
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
