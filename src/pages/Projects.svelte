<script lang="ts">
    import { API_URL, getPinnedRepoQuery, flatten } from "../utils/api";
    import { primaryBackground, neutralBackground } from "../utils/constants";
    import type { PinnedRepoResponse, Repository } from "../utils/api";
    import Page from "../components/Page.svelte";

    import Card from "../components/Card.svelte";
    import LoadingCard from "../components/LoadingCard.svelte";

    /**
     * convert repository name slugs into titles (with some exceptions)
     * @param str
     */
    function titleCase(str: string): string {
        // don't apply this to things that are named using my username
        if (str.includes(username)) {
            return str;
        }

        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1);
        });
    }

    /**
     * get a set of unique, normalized tags from repository topics and detected languages
     * @param repo
     */
    function getRepoTags(repo: Repository): string[] {
        const tags = Array.from(
            new Set<string>(
                repo.repositoryTopics
                    .concat(repo.languages)
                    .filter((e) => e)
                    .map((e) => e.toLowerCase().trim())
            )
        );
        return tags.sort();
    }

    function getRepoStats(repo: Repository) {
        const arr = [];
        if (repo.stargazerCount > 0) {
            arr.push(`Stars: ${repo.stargazerCount}`);
        }
        if (repo.forkCount > 0) {
            arr.push(`Forks: ${repo.forkCount}`);
        }
        return arr.join(", ");
    }

    /**
     * query github graphql
     */
    async function getPinnedRepos(query: string): Promise<Repository[]> {
        const compare = (a: Repository, b: Repository) => {
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
        };
        return fetch(API_URL, {
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

    const username = "kclejeune";
    const query = getPinnedRepoQuery(username);
    const projectPromise = getPinnedRepos(query);
    export let backgroundClass = primaryBackground;
</script>

<Page id="projects" title="Projects" {backgroundClass}>
    {#await projectPromise}
        <div class="container mx-auto grid max-w-screen-xl grid-cols-1 gap-4">
            <LoadingCard />
        </div>
    {:then repos}
        <div
            class="container mx-auto grid max-w-screen-xl gap-4 md:grid-cols-1 lg:grid-cols-2"
        >
            {#each repos as repo}
                <Card
                    title={titleCase(repo.name.replaceAll("-", " "))}
                    url={repo.url}
                    tags={getRepoTags(repo)}
                >
                    <span>
                        {getRepoStats(repo)}
                    </span>
                    <div>
                        {repo.description}
                    </div>
                </Card>
            {/each}
        </div>
    {:catch error}
        <div class="container mx-auto grid max-w-screen-xl grid-cols-1 gap-4">
            <Card title="Error">{error}</Card>
        </div>
    {/await}
</Page>
