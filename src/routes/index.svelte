<script lang="ts" context="module">
    // SSR for Projects component
    import { getPinnedRepos } from "../utils/api";
    import type { Repository } from "../utils/api";

    const username = "kclejeune";

    export async function load({ fetch }) {
        return {
            props: {
                repos: await getPinnedRepos(username, fetch),
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
