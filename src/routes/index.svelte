<script lang="ts" context="module">
    // SSR for Projects component
    import { API_URL, getPinnedRepoQuery, flatten } from "../utils/api";
    import type { PinnedRepoResponse, Repository } from "../utils/api";

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

    const username = "kclejeune";
    const query = getPinnedRepoQuery(username);

    export async function load({ fetch }) {
        return {
            props: {
                repos: await fetch(API_URL, {
                    method: "POST",
                    body: JSON.stringify({
                        query: query,
                    }),
                })
                    .then((res) => res.json())
                    .then((res) => flatten(res))
                    .then(
                        (res: PinnedRepoResponse) =>
                            res.itemShowcase.edges ??
                            res.itemShowcase.nodes ??
                            []
                    )
                    .then((repos: Repository[]) => repos.sort(compare)),
            },
        };
    }
</script>

<script lang="ts">
    import Skills from "../pages/Skills.svelte";
    import Work from "../pages/Work.svelte";
    import About from "../pages/About.svelte";
    import Home from "../pages/Home.svelte";
    import Projects from "../pages/Projects.svelte";

    let primaryBackground = "bg-primary-200 dark:bg-primary-900";
    let neutralBackground = "bg-neutral-200 dark:bg-neutral-900";
    export let repos: Repository[];
</script>

<Home />
<!--About me/bio-->
<About backgroundClass={primaryBackground} />
<!--Work Experience-->
<Work backgroundClass={neutralBackground} />
<!-- Starred Projects from Github -->
<Projects backgroundClass={primaryBackground} {repos} />
<!--Technologies I've worked with-->
<Skills backgroundClass={neutralBackground} />
