<script lang="ts">
  import About from "$lib/pages/About.svelte";
  import Home from "$lib/pages/Home.svelte";
  import Projects from "$lib/pages/Projects.svelte";
  import Skills from "$lib/pages/Skills.svelte";
  import Work from "$lib/pages/Work.svelte";
  import { primaryBackground, neutralBackground } from "$lib/utils/constants";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<Home />
<About backgroundClass={primaryBackground} />
<Work backgroundClass={neutralBackground} />
<Projects backgroundClass={primaryBackground} repos={data?.repos ?? []} />
<Skills backgroundClass={neutralBackground} />
