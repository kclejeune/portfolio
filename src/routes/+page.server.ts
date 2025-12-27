import {
  GITHUB_API_KEY,
  GITHUB_API_URL,
  GITHUB_USERNAME,
} from "$env/static/private";
import {
  compare,
  flatten,
  getPinnedRepoQuery,
  type PinnedRepoResponse,
  type Repository,
} from "$lib/utils";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const CACHE_KEY = "github_pinned_repos";
const CACHE_TTL_SECONDS = 3600; // 1 hour

async function fetchGitHubRepos(): Promise<Repository[]> {
  const res = await fetch(GITHUB_API_URL, {
    method: "POST",
    headers: {
      Authorization: `bearer ${GITHUB_API_KEY}`,
      "User-Agent": GITHUB_USERNAME,
    },
    body: JSON.stringify({
      query: getPinnedRepoQuery(GITHUB_USERNAME),
    }),
  });

  if (res?.ok) {
    const repos = await res
      .json()
      .then(flatten)
      .then((pin: PinnedRepoResponse) => pin?.itemShowcase?.items ?? [])
      .then((repos) => repos.sort(compare));
    return repos;
  }
  throw error(res?.status ?? 404, res?.statusText ?? "Not Found");
}

// SSR for Projects component
export const load: PageServerLoad = async ({ platform }) => {
  const kv = platform?.env?.KV;

  // Try to get cached data
  if (kv) {
    try {
      const cached = await kv.get(CACHE_KEY, "json");
      if (cached) {
        return { repos: cached as Repository[] };
      }
    } catch (e) {
      console.error("KV cache read error:", e);
    }
  }

  // Fetch fresh data
  const repos = await fetchGitHubRepos();

  // Cache the result
  if (kv) {
    try {
      await kv.put(CACHE_KEY, JSON.stringify(repos), {
        expirationTtl: CACHE_TTL_SECONDS,
      });
    } catch (e) {
      console.error("KV cache write error:", e);
    }
  }

  return { repos };
};
