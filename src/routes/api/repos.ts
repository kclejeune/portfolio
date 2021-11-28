import type { PinnedRepoResponse, Repository } from "$lib/utils";
import { compare, flatten, getPinnedRepoQuery } from "$lib/utils";
import { GITHUB_API, USERNAME } from "$lib/utils/constants";

export async function get() {
  const query = getPinnedRepoQuery(USERNAME);
  const res = await fetch(GITHUB_API, {
    method: "POST",
    headers: {
      Authorization: `bearer ${import.meta.env.VITE_GITHUB_API_KEY}`,
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
