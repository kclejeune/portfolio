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

/**
 * flattens a graphQL response to only include relevant structure
 *
 * @param {node} any - an element inside of a graphQL response
 *
 */
export function flatten(node: any) {
    if (!node) {
        return node;
    } else if (Array.isArray(node)) {
        return node.map(flatten);
    } else if (typeof node === "object") {
        let props = Object.getOwnPropertyNames(node);
        if (props.length === 1) {
            return flatten(node[props[0]]);
        } else if (props.length > 1) {
            const flattened = {};
            for (let prop of props) {
                flattened[prop] = flatten(node[prop]);
            }
            return flattened;
        }
    } else {
        return node;
    }
}

export function getPinnedRepoQuery(username: string = "kclejeune") {
    return `
{
  repositoryOwner(login: "${username}") {
    ... on ProfileOwner {
      login
      itemShowcase {
        ... on ProfileItemShowcase {
          items(first: 10) {
            totalCount
            nodes {
              ... on Repository {
                name
                stargazerCount
                forkCount
                url
                description
                repositoryTopics(first: 15) {
                  nodes {
                    ... on RepositoryTopic {
                      topic {
                        name
                      }
                    }
                  }
                }
                languages(first: 10) {
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
