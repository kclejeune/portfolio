<script lang="ts">
  import About from "$lib/pages/About.svelte";
  import Home from "$lib/pages/Home.svelte";
  import Projects from "$lib/pages/Projects.svelte";
  import Skills from "$lib/pages/Skills.svelte";
  import Work from "$lib/pages/Work.svelte";
  import type { PageData } from "./$types";

  let primaryBackground = "bg-primary-200 dark:bg-primary-900";
  let neutralBackground = "bg-neutral-200 dark:bg-neutral-900";
  export let data: PageData;
</script>

<Home />
<!--About me/bio-->
<About backgroundClass={primaryBackground} />
<!--Work Experience-->
<Work backgroundClass={neutralBackground} />
<!-- Starred Projects from Github -->
<Projects backgroundClass={primaryBackground} repos={data?.repos ?? []} />
<!--Technologies I've worked with-->
<Skills backgroundClass={neutralBackground} />
