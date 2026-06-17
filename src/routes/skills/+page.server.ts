import { loadGithubProfile } from "$lib/server/github";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, platform }) => {
  const profile = await loadGithubProfile(fetch, platform);
  return { profile };
};
