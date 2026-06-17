import { describe, it, expect } from "vitest";
import {
  aggregateLanguages,
  buildProfile,
  compare,
  contributionLevel,
  parseCalendar,
  parseRepositories,
  parseStats,
  type Repository,
} from "./index";

const sampleResponse = {
  data: {
    user: {
      login: "kclejeune",
      name: "Kennan LeJeune",
      followers: { totalCount: 42 },
      publicRepoCount: { totalCount: 7 },
      repositories: {
        totalCount: 3,
        nodes: [
          {
            stargazerCount: 59,
            languages: {
              edges: [
                { size: 8000, node: { name: "Nix", color: "#7e7eff" } },
                { size: 2000, node: { name: "Shell", color: "#89e051" } },
              ],
            },
          },
          {
            stargazerCount: 10,
            languages: {
              edges: [
                { size: 4000, node: { name: "TypeScript", color: "#3178c6" } },
                { size: 1000, node: { name: "Nix", color: "#7e7eff" } },
              ],
            },
          },
        ],
      },
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 1234,
          weeks: [
            {
              contributionDays: [
                { date: "2025-01-01", contributionCount: 0 },
                { date: "2025-01-02", contributionCount: 10 },
              ],
            },
            {
              contributionDays: [{ date: "2025-01-08", contributionCount: 4 }],
            },
          ],
        },
      },
      itemShowcase: {
        items: {
          nodes: [
            {
              name: "system",
              stargazerCount: 59,
              forkCount: 7,
              url: "https://github.com/kclejeune/system",
              description: "Declarative system configs",
              repositoryTopics: { nodes: [{ topic: { name: "nix" } }] },
              languages: { nodes: [{ name: "Nix" }] },
            },
            {
              name: "portfolio",
              stargazerCount: 2,
              forkCount: 0,
              url: "https://github.com/kclejeune/portfolio",
              description: "Personal site",
              repositoryTopics: { nodes: [] },
              languages: { nodes: [{ name: "Svelte" }] },
            },
          ],
        },
      },
    },
  },
};

describe("parseRepositories", () => {
  it("maps nested nodes into flat repositories sorted by stars", () => {
    const repos = parseRepositories(sampleResponse.data.user.itemShowcase.items.nodes);
    expect(repos).toHaveLength(2);
    expect(repos[0].name).toBe("system");
    expect(repos[0].repositoryTopics).toEqual(["nix"]);
    expect(repos[0].languages).toEqual(["Nix"]);
    expect(repos[0].stargazerCount).toBeGreaterThan(repos[1].stargazerCount);
  });

  it("tolerates missing fields", () => {
    const repos = parseRepositories([{ name: "bare", url: "https://example.com" }]);
    expect(repos[0]).toMatchObject({
      name: "bare",
      stargazerCount: 0,
      forkCount: 0,
      description: "",
      repositoryTopics: [],
      languages: [],
    });
  });
});

describe("aggregateLanguages", () => {
  it("sums byte sizes across repos and computes percentages", () => {
    const langs = aggregateLanguages(sampleResponse.data.user.repositories.nodes);
    const total = langs.reduce((s, l) => s + l.percent, 0);
    expect(Math.round(total)).toBe(100);
    // Nix: 8000 + 1000 = 9000 of 15000 total -> largest share
    expect(langs[0].name).toBe("Nix");
    expect(langs[0].size).toBe(9000);
    expect(langs[0].percent).toBeCloseTo(60, 5);
  });

  it("collapses overflow languages into an 'Other' bucket", () => {
    const nodes = [
      {
        languages: {
          edges: [
            { size: 5, node: { name: "A", color: "#1" } },
            { size: 4, node: { name: "B", color: "#2" } },
            { size: 3, node: { name: "C", color: "#3" } },
          ],
        },
      },
    ];
    const langs = aggregateLanguages(nodes, 2);
    expect(langs.map((l) => l.name)).toEqual(["A", "B", "Other"]);
  });

  it("returns an empty array when there is no language data", () => {
    expect(aggregateLanguages([])).toEqual([]);
  });
});

describe("contributionLevel", () => {
  it("buckets counts into 0-4 intensity levels", () => {
    expect(contributionLevel(0, 10)).toBe(0);
    expect(contributionLevel(1, 10)).toBe(1);
    expect(contributionLevel(4, 10)).toBe(3);
    expect(contributionLevel(10, 10)).toBe(4);
  });
});

describe("parseCalendar", () => {
  it("flattens weeks and assigns levels relative to the busiest day", () => {
    const cal = parseCalendar(
      sampleResponse.data.user.contributionsCollection.contributionCalendar,
    );
    expect(cal.total).toBe(1234);
    expect(cal.weeks).toHaveLength(2);
    expect(cal.weeks[0].days[0].level).toBe(0); // 0 contributions
    expect(cal.weeks[0].days[1].level).toBe(4); // busiest day
  });
});

describe("parseStats", () => {
  it("derives followers, repo count, and total stars", () => {
    const stats = parseStats(sampleResponse.data.user);
    expect(stats.followers).toBe(42);
    // Uses the unfiltered public count (includes forks), not the non-fork set.
    expect(stats.publicRepos).toBe(7);
    expect(stats.totalStars).toBe(69);
  });

  it("falls back to the filtered repo count when the unfiltered one is absent", () => {
    const stats = parseStats({ repositories: { totalCount: 3, nodes: [] } });
    expect(stats.publicRepos).toBe(3);
  });
});

describe("buildProfile", () => {
  it("assembles a complete profile from a raw response", () => {
    const profile = buildProfile(sampleResponse);
    expect(profile.repos).toHaveLength(2);
    expect(profile.languages.length).toBeGreaterThan(0);
    expect(profile.contributions.total).toBe(1234);
    expect(profile.stats.totalStars).toBe(69);
  });

  it("returns an empty profile for malformed input", () => {
    const profile = buildProfile({});
    expect(profile.repos).toEqual([]);
    expect(profile.languages).toEqual([]);
    expect(profile.contributions.weeks).toEqual([]);
    expect(profile.stats.followers).toBe(0);
  });
});

describe("compare", () => {
  it("orders repositories by stars, then forks, then tags, then name", () => {
    const make = (over: Partial<Repository>): Repository => ({
      name: "x",
      stargazerCount: 0,
      forkCount: 0,
      url: "",
      description: "",
      repositoryTopics: [],
      languages: [],
      ...over,
    });
    const repos = [
      make({ name: "low", stargazerCount: 1 }),
      make({ name: "high", stargazerCount: 100 }),
    ];
    repos.sort(compare);
    expect(repos[0].name).toBe("high");
  });
});
