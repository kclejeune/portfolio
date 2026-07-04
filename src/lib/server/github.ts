import { GITHUB_API_KEY, GITHUB_API_URL, GITHUB_USERNAME } from "$env/static/private";
import { buildProfile, getProfileQuery, type GithubProfile } from "$lib/utils";

const CACHE_KEY = "github_profile";
const CACHE_TTL_SECONDS = 1800; // 30 minutes

interface KV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, opts?: Record<string, unknown>): Promise<void>;
}

type KVShimEntry = { value: string; expiresAt: number };

/** In-memory fallback used during local dev where no Cloudflare KV is bound. */
class KVShim implements KV {
  private readonly cache: Record<string, KVShimEntry> = {};

  get(key: string) {
    const entry = this.cache[key];
    if (!entry || Date.now() > entry.expiresAt) {
      delete this.cache[key];
      return Promise.resolve(null);
    }
    return Promise.resolve(entry.value);
  }

  put(key: string, value: string, opts: Record<string, unknown> = {}) {
    const ttl = (opts.expirationTtl as number) ?? CACHE_TTL_SECONDS;
    this.cache[key] = { value, expiresAt: Date.now() + ttl * 1000 };
    return Promise.resolve();
  }
}

const EMPTY_PROFILE: GithubProfile = {
  repos: [],
  languages: [],
  contributions: { total: 0, weeks: [] },
  stats: { followers: 0, publicRepos: 0, totalStars: 0 },
};

type Platform = App.Platform | undefined;

/**
 * Fetch the GitHub profile (pinned repos, language totals, contribution
 * calendar, and aggregate stats) with KV caching. Returns an empty profile
 * rather than throwing so pages degrade gracefully if GitHub is unavailable.
 */
export async function loadGithubProfile(
  fetch: typeof globalThis.fetch,
  platform: Platform,
): Promise<GithubProfile> {
  const kv: KV = platform?.env?.KV ?? new KVShim();

  try {
    const cached = await kv.get(CACHE_KEY);
    if (cached) return JSON.parse(cached) as GithubProfile;
  } catch (e) {
    console.error("KV cache read error:", e);
  }

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

    const profile = buildProfile(await res.json());

    try {
      await kv.put(CACHE_KEY, JSON.stringify(profile), {
        expirationTtl: CACHE_TTL_SECONDS,
      });
    } catch (e) {
      console.error("KV cache write error:", e);
    }

    return profile;
  } catch (e) {
    console.error("GitHub fetch error:", e);
    return EMPTY_PROFILE;
  }
}
