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
} from "$lib/utils/index";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const CACHE_KEY = "github_pinned_repos";
const CACHE_TTL_SECONDS = 1800; // every 30 minutes

interface KV {
  get(key: string): Promise<string | null>;
  put(
    key: string,
    value: string,
    opts: Record<string, any> | undefined
  ): Promise<void>;
}

type KVShimEntry = {
  value: string;
  ttl: number;
  createdTimestamp: Date;
};

class KVShim implements KV {
  private readonly cache: Record<string, KVShimEntry> = {};

  get(key: string) {
    let value = this.cache[key];
    let now = new Date();
    if (
      !value ||
      now.getUTCSeconds() - value.createdTimestamp.getUTCSeconds() > value.ttl
    ) {
      delete this.cache[key];
      return Promise.resolve(null);
    }
    return Promise.resolve(value.value);
  }
  put(key: string, value: string, opts: Record<string, any> = {}) {
    this.cache[key] = {
      value,
      ttl: (opts.expirationTtl as number) ?? CACHE_TTL_SECONDS,
      createdTimestamp: new Date(),
    };
    return Promise.resolve();
  }
}

// SSR for Projects component
export const load: PageServerLoad = async ({ fetch, platform }) => {
  const kv: KV = platform?.env?.KV ?? new KVShim();

  // Try to get cached data
  try {
    const cached = await kv.get(CACHE_KEY);
    if (cached) {
      const repos: Repository[] = JSON.parse(cached);
      return { repos: repos };
    }
  } catch (e) {
    console.error("KV cache read error:", e);
  }

  // Fetch fresh data
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
    try {
      await kv.put(CACHE_KEY, JSON.stringify(repos), {
        expirationTtl: CACHE_TTL_SECONDS,
      });
    } catch (e) {
      console.error("KV cache write error:", e);
    }
    return { repos };
  }
  throw error(res?.status ?? 404, res?.statusText ?? "Not Found");
};
