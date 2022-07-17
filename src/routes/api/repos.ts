import type { PinnedRepoResponse } from "$lib/utils";
import { compare, flatten, getPinnedRepoQuery } from "$lib/utils";

export async function GET() {
  const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME.toString();
  const GITHUB_API = import.meta.env.VITE_GITHUB_API.toString();
  const API_KEY = import.meta.env.VITE_GITHUB_API_KEY;
  const query = getPinnedRepoQuery(GITHUB_USERNAME);
  const res = await fetch(GITHUB_API, {
    method: "POST",
    headers: {
      Authorization: `bearer ${API_KEY}`,
      "User-Agent": GITHUB_USERNAME,
    },
    body: JSON.stringify({
      query: query,
    }),
  });

  if (res?.ok) {
    const repos = await res
      .json()
      .then((json) => flatten(json))
      .then((pin: PinnedRepoResponse) => pin?.itemShowcase?.items ?? []);
    repos.sort(compare);
    return {
      body: repos,
    };
  }
  return {
    status: res?.status ?? 404,
    error: new Error(res?.statusText),
  };
}
