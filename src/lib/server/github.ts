import { GITHUB_API_KEY, GITHUB_API_URL, GITHUB_USERNAME } from "$env/static/private";
import { buildProfile, getProfileQuery, type GithubProfile } from "$lib/utils";

const EMPTY_PROFILE: GithubProfile = {
  repos: [],
  languages: [],
  contributions: { total: 0, weeks: [] },
  stats: { followers: 0, publicRepos: 0, totalStars: 0 },
};

/**
 * Fetch the GitHub profile (pinned repos, language totals, contribution
 * calendar, and aggregate stats). Returns an empty profile rather than
 * throwing so pages degrade gracefully if GitHub is unavailable. Caching is
 * handled at the edge via Workers Caching (see +page.server.ts).
 */
export async function loadGithubProfile(fetch: typeof globalThis.fetch): Promise<GithubProfile> {
  try {
    const res = await fetch(GITHUB_API_URL, {
      method: "POST",
      headers: {
        Authorization: `bearer ${GITHUB_API_KEY}`,
        "User-Agent": GITHUB_USERNAME,
      },
      body: JSON.stringify({ query: getProfileQuery(GITHUB_USERNAME) }),
    });

    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      return EMPTY_PROFILE;
    }

    return buildProfile(await res.json());
  } catch (e) {
    console.error("GitHub fetch error:", e);
    return EMPTY_PROFILE;
  }
}
