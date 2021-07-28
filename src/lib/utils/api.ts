export interface Repository {
  name: string;
  stargazerCount: number;
  forkCount: number;
  url: string;
  description: string;
  repositoryTopics: string[];
  languages: string[];
}

export interface ItemShowcase {
  totalCount: number;
  nodes?: Repository[];
  edges?: Repository[];
}

export interface PinnedRepoResponse {
  login: string;
  itemShowcase: ItemShowcase;
}

export const API_URL =
  "https://rh50nu19ni.execute-api.us-east-2.amazonaws.com/beta/graphql";

export async function getPinnedRepos(
  username: string,
  fetch: CallableFunction
): Promise<Repository[]> {
  const query = getPinnedRepoQuery(username);

  return await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      query: query,
    }),
  })
    .then((res) => res.json())
    .then((res) => flatten(res))
    .then(
      (res: PinnedRepoResponse) =>
        res.itemShowcase.edges ?? res.itemShowcase.nodes ?? []
    )
    .then((repos: Repository[]) => repos.sort(compare));
}

export function compare(a: Repository, b: Repository) {
  let starDiff = b.stargazerCount - a.stargazerCount;
  let forkDiff = b.forkCount - a.forkCount;
  let tagDiff =
    b.repositoryTopics.length -
    a.repositoryTopics.length +
    b.languages.length -
    a.languages.length;
  let nameDiff = a.name.localeCompare(b.name);
  if (starDiff !== 0) {
    return starDiff;
  } else if (forkDiff !== 0) {
    return forkDiff;
  } else if (tagDiff !== 0) {
    return tagDiff;
  } else if (nameDiff !== 0) {
    return nameDiff;
  }
}

/**
 * flattens a graphQL response to only include relevant structure
 * 
 * for example, the raw graphQL response
```
{
  "data": {
    "repositoryOwner": {
      "login": "kclejeune",
      "itemShowcase": {
        "items": {
          "totalCount": 6,
          "edges": [
            {
              "node": {
                "name": "system",
                "stargazerCount": 59,
                "forkCount": 7,
                "url": "https://github.com/kclejeune/system",
                "description": "Declarative system configurations using nixOS, nix-darwin, and home-manager",
                "repositoryTopics": {
                  "nodes": [
                    {
                      "topic": {
                        "name": "nix"
                      }
                    }
                  ]
                },
                "languages": {
                  "edges": [
                    {
                      "node": {
                        "name": "Nix"
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    }
  }
}
```
becomes the following after running flatten():
```
{
  "login": "kclejeune",
  "itemShowcase": {
    "totalCount": 6,
    "edges": [
      {
        "name": "system",
        "stargazerCount": 59,
        "forkCount": 7,
        "url": "https://github.com/kclejeune/system",
        "description": "Declarative system configurations using nixOS, nix-darwin, and home-manager",
        "repositoryTopics": [
          "nix"
        ],
        "languages": [
          "Nix"
        ]
      }
    ]
  }
}
```
 * @param {node} any - an element inside of a graphQL response
 *
 */
export function flatten(node: any) {
  if (Array.isArray(node)) {
    // if the node is an array, flatten all of its elements
    return node.map(flatten);
  } else if (node && typeof node === "object") {
    let props = Object.keys(node);
    if (props.length === 1) {
      // if there's a single property, get rid of the outer layer
      return flatten(node[props[0]]);
    } else if (props.length > 1) {
      // if there are multiple props, return the same object with each property flattened
      return props.reduce((result, key) => {
        result[key] = flatten(node[key]);
        return result;
      }, {});
    }
  } else {
    // when in doubt do nothing
    return node;
  }
}

export function getPinnedRepoQuery(
  username: string = "kclejeune",
  maxNumRepos: number = 15,
  maxNumTopics: number = 15,
  maxNumLanguages: number = 15
) {
  return `
query {
  repositoryOwner(login: "${username}") {
    ... on ProfileOwner {
      login
      itemShowcase {
        ... on ProfileItemShowcase {
          items(first: ${maxNumRepos}) {
            totalCount
            nodes {
              ... on Repository {
                name
                stargazerCount
                forkCount
                url
                description
                repositoryTopics(first: ${maxNumTopics}) {
                  nodes {
                    ... on RepositoryTopic {
                      topic {
                        name
                      }
                    }
                  }
                }
                languages(first: ${maxNumLanguages}) {
                  nodes {
                    ... on Language {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
}
