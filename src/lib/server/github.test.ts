import { describe, expect, it, vi } from "vitest";
import { loadGithubProfile } from "./github";

vi.mock("$env/static/private", () => ({
  GITHUB_API_KEY: "test",
  GITHUB_API_URL: "https://api.github.test/graphql",
  GITHUB_USERNAME: "kclejeune",
}));

const hour = 60 * 60 * 1000;

function kv(initial?: object) {
  const data = new Map<string, string>();
  if (initial) data.set("github-profile", JSON.stringify(initial));
  return {
    data,
    get: vi.fn(async (key: string) => (data.has(key) ? JSON.parse(data.get(key)!) : null)),
    put: vi.fn(async (key: string, value: string) => void data.set(key, value)),
  };
}

function platform(store: ReturnType<typeof kv>) {
  const pending: Promise<unknown>[] = [];
  return {
    pending,
    env: { GITHUB_CACHE: store },
    context: { waitUntil: (p: Promise<unknown>) => void pending.push(p) },
  };
}

const user = { followers: { totalCount: 3 } };
const respond = (body: object, status = 200) =>
  vi.fn(async () => new Response(JSON.stringify(body), { status }));

describe("loadGithubProfile", () => {
  it("serves a fresh snapshot without calling GitHub", async () => {
    const store = kv({ profile: { stats: { followers: 9 } }, fetchedAt: Date.now() });
    const fetch = respond({ data: { user } });
    const { profile, ok } = await loadGithubProfile(fetch, platform(store));
    expect(ok).toBe(true);
    expect(profile.stats.followers).toBe(9);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("serves a stale snapshot and refreshes it in the background", async () => {
    const store = kv({ profile: { stats: { followers: 9 } }, fetchedAt: Date.now() - 2 * hour });
    const env = platform(store);
    const { profile } = await loadGithubProfile(respond({ data: { user } }), env);
    expect(profile.stats.followers).toBe(9);
    await Promise.all(env.pending);
    expect(JSON.parse(store.data.get("github-profile")!).profile.stats.followers).toBe(3);
  });

  it("keeps the snapshot when a background refresh fails", async () => {
    const snapshot = { profile: { stats: { followers: 9 } }, fetchedAt: 0 };
    const store = kv(snapshot);
    const env = platform(store);
    await loadGithubProfile(respond({}, 502), env);
    await Promise.all(env.pending);
    expect(store.put).not.toHaveBeenCalled();
  });

  it("fetches and stores a profile when there's no snapshot", async () => {
    const store = kv();
    const { profile, ok } = await loadGithubProfile(respond({ data: { user } }), platform(store));
    expect(ok).toBe(true);
    expect(profile.stats.followers).toBe(3);
    expect(store.put).toHaveBeenCalledOnce();
  });

  it("treats GraphQL errors as failures", async () => {
    const store = kv();
    const fetch = respond({ data: { user: null }, errors: [{ message: "rate limited" }] });
    const { profile, ok } = await loadGithubProfile(fetch, platform(store));
    expect(ok).toBe(false);
    expect(profile.repos).toEqual([]);
    expect(store.put).not.toHaveBeenCalled();
  });

  it("works without a KV binding", async () => {
    const { ok } = await loadGithubProfile(respond({ data: { user } }), undefined);
    expect(ok).toBe(true);
  });
});
