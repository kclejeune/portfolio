<script lang="ts">
    import { primaryBackground } from "../utils/constants";
    import Page from "../components/Page.svelte";
    import Card from "../components/Card.svelte";
    import type { Repository } from "src/utils/api";

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

    export let username = "kclejeune";
    export let repos: Repository[];
    export let backgroundClass = primaryBackground;
</script>

<Page id="projects" title="Projects" {backgroundClass}>
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
</Page>
