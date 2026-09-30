import { env } from "$env/dynamic/private";
import { GITHUB_API_URL, GITHUB_USERNAME } from "$env/static/private";
import { buildProfile, getProfileQuery, type GithubProfile } from "$lib/utils";

const EMPTY_PROFILE: GithubProfile = {
  repos: [],
  languages: [],
  contributions: { total: 0, weeks: [] },
  stats: { followers: 0, publicRepos: 0, totalStars: 0 },
};

/** How long a stored snapshot is served before it's refreshed in the background. */
const REFRESH_AFTER_MS = 60 * 60 * 1000;
/** How long to wait on GitHub before giving up. */
const TIMEOUT_MS = 8000;
const SNAPSHOT_KEY = "github-profile";

interface Snapshot {
  profile: GithubProfile;
  fetchedAt: number;
}

export interface LoadedProfile {
  profile: GithubProfile;
  /** False when GitHub failed and there was no snapshot to fall back on. */
  ok: boolean;
}

/**
 * Fetch the GitHub profile (pinned repos, language totals, contribution
 * calendar, and aggregate stats), throwing on HTTP, GraphQL, or timeout errors.
 */
async function fetchProfile(fetch: typeof globalThis.fetch): Promise<GithubProfile> {
  if (!env.GITHUB_API_KEY) throw new Error("GITHUB_API_KEY is not set");
  const res = await fetch(GITHUB_API_URL, {
    method: "POST",
    headers: {
      Authorization: `bearer ${env.GITHUB_API_KEY}`,
      "User-Agent": GITHUB_USERNAME,
    },
    body: JSON.stringify({ query: getProfileQuery(GITHUB_USERNAME) }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);

  // GraphQL reports errors with a 200, alongside partial or missing data.
  const json = await res.json();
  if (json?.errors?.length || !json?.data?.user) {
    throw new Error(`GitHub GraphQL error: ${JSON.stringify(json?.errors ?? "no user")}`);
  }
  return buildProfile(json);
}

/** Fetch the profile and store it, without holding up the response on the write. */
async function refresh(
  fetch: typeof globalThis.fetch,
  platform: App.Platform | undefined,
): Promise<GithubProfile> {
  const profile = await fetchProfile(fetch);
  const snapshot: Snapshot = { profile, fetchedAt: Date.now() };
  const write = platform?.env?.GITHUB_CACHE?.put(SNAPSHOT_KEY, JSON.stringify(snapshot)).catch(
    (e) => console.error("GitHub snapshot write error:", e),
  );
  if (write) platform?.context?.waitUntil(write);
  return profile;
}

/**
 * The GitHub profile from the last successful fetch (kept in KV), refreshed in
 * the background once stale, so GitHub stays off the request path. Only with no
 * snapshot does a request wait on GitHub, getting an empty profile if it fails.
 */
export async function loadGithubProfile(
  fetch: typeof globalThis.fetch,
  platform: App.Platform | undefined,
): Promise<LoadedProfile> {
  const store = platform?.env?.GITHUB_CACHE;

  const snapshot = await store?.get<Snapshot>(SNAPSHOT_KEY, "json").catch((e) => {
    console.error("GitHub snapshot read error:", e);
    return null;
  });

  if (snapshot) {
    if (Date.now() - snapshot.fetchedAt > REFRESH_AFTER_MS) {
      const refreshing = refresh(fetch, platform).catch((e) =>
        console.error("GitHub background refresh error:", e),
      );
      platform?.context?.waitUntil(refreshing);
    }
    return { profile: snapshot.profile, ok: true };
  }

  try {
    return { profile: await refresh(fetch, platform), ok: true };
  } catch (e) {
    console.error("GitHub fetch error:", e);
    return { profile: EMPTY_PROFILE, ok: false };
  }
}
