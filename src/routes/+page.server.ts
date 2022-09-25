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

// SSR for Projects component
export async function load(): Promise<Record<string, Repository[]>> {
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
      .then((repos) => {
        return repos.sort(compare);
      });
    return {
      repos: repos,
    };
  }
  throw error(res?.status ?? 404, res?.statusText ?? "Not Found");
}
