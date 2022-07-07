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
  items?: Repository[];
}

export interface PinnedRepoResponse {
  login: string;
  itemShowcase: ItemShowcase;
}

export function compare(a: Repository, b: Repository) {
  const starDiff = b.stargazerCount - a.stargazerCount;
  const forkDiff = b.forkCount - a.forkCount;
  const tagDiff =
    b.repositoryTopics.length -
    a.repositoryTopics.length +
    b.languages.length -
    a.languages.length;
  const nameDiff = a.name.localeCompare(b.name);
  return starDiff || forkDiff || tagDiff || nameDiff;
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
    "items": [
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
export function flatten(node: any): any {
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
      return props.reduce((result: Record<string, any>, key: string) => {
        const prop = ["edges", "nodes"].includes(key.toLowerCase())
          ? "items"
          : key;
        result[prop] = flatten(node[key]);
        return result;
      }, {});
    }
  } else {
    // when in doubt do nothing
    return node;
  }
}

export function getPinnedRepoQuery(
  username = "kclejeune",
  maxNumRepos = 15,
  maxNumTopics = 15,
  maxNumLanguages = 15
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
