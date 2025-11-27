<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/components/Navbar.svelte";
  import SEO from "svelte-seo";

  let { children } = $props();
</script>

<svelte:head>
  <SEO
    title="Kennan LeJeune | Full-Stack Software Engineer"
    description="Kennan LeJeune | Full-Stack Software Engineer"
    canonical="https://www.kclj.io"
  />
</svelte:head>

<Navbar />
<main class="pt-16">
  {@render children()}
</main>
