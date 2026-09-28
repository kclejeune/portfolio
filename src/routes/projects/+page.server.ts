import { loadGithubProfile } from "$lib/server/github";
import type { PageServerLoad } from "./$types";

// GitHub data changes slowly; everything else on the site is prerendered.
export const prerender = false;

export const load: PageServerLoad = async ({ fetch, platform, setHeaders }) => {
  const { profile, ok } = await loadGithubProfile(fetch, platform);

  // Workers Caching serves edge hits for 5 minutes, then serves stale while
  // revalidating in the background for up to 30 minutes. An empty fallback
  // (GitHub down, no snapshot yet) isn't cached, so the next request retries.
  setHeaders({
    "cache-control": ok ? "public, max-age=300, stale-while-revalidate=1800" : "no-store",
  });

  return { profile };
};
