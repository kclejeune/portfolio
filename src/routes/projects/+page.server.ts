import { loadGithubProfile } from "$lib/server/github";
import type { PageServerLoad } from "./$types";

// GitHub data changes slowly; everything else on the site is prerendered.
export const prerender = false;

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  // Workers Caching serves edge hits for 5 minutes, then serves stale while
  // revalidating in the background for up to 30 minutes.
  setHeaders({
    "cache-control": "public, max-age=300, stale-while-revalidate=1800",
  });

  const profile = await loadGithubProfile(fetch);
  return { profile };
};
