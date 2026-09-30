import { loadGithubProfile } from "$lib/server/github";
import type { PageServerLoad } from "./$types";

// Live GitHub data, edge-cached below.
export const prerender = false;

export const load: PageServerLoad = async ({ fetch, platform, setHeaders }) => {
  const { profile, ok } = await loadGithubProfile(fetch, platform);

  // Fresh for 5 min, then stale-while-revalidate for 30. The empty fallback
  // isn't cached, so the next request retries GitHub.
  setHeaders({
    "cache-control": ok ? "public, max-age=300, stale-while-revalidate=1800" : "no-store",
  });

  return { profile };
};
