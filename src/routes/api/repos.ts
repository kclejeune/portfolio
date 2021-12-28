import type { PinnedRepoResponse, Repository } from "$lib/utils";
import { compare, flatten, getPinnedRepoQuery } from "$lib/utils";

export async function get() {
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
    const data = await res
      .json()
      .then((res) => flatten(res))
      .then(
        (res: PinnedRepoResponse) =>
          res?.itemShowcase?.edges ?? res?.itemShowcase?.nodes ?? []
      )
      .then((repos: Repository[]) => repos.sort(compare));
    return {
      body: data,
    };
  } else {
    return {
      status: res.status,
      body: {
        error: res.statusText,
      },
    };
  }
}
