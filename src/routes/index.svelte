<script lang="ts" context="module">
  // SSR for Projects component
  import { getPinnedRepos } from "$lib/utils/api";
  import type { Repository } from "$lib/utils/api";

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
  import SEO from "svelte-seo";
  import Skills from "$lib/pages/Skills.svelte";
  import Work from "$lib/pages/Work.svelte";
  import About from "$lib/pages/About.svelte";
  import Home from "$lib/pages/Home.svelte";
  import Projects from "$lib/pages/Projects.svelte";

  let primaryBackground = "bg-primary-200 dark:bg-primary-900";
  let neutralBackground = "bg-neutral-200 dark:bg-neutral-900";
  export let repos: Repository[];
</script>

<SEO
  title="Kennan LeJeune - ML Researcher & Software Engineer"
  description="Kennan LeJeune - ML Researcher & Software Engineer"
  canonical="https://kennanlejeune.com"
/>

<Home />
<!--About me/bio-->
<About backgroundClass={primaryBackground} />
<!--Work Experience-->
<Work backgroundClass={neutralBackground} />
<!-- Starred Projects from Github -->
<Projects backgroundClass={primaryBackground} {repos} />
<!--Technologies I've worked with-->
<Skills backgroundClass={neutralBackground} />
