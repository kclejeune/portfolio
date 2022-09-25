<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/components/Navbar.svelte";
  import SEO from "svelte-seo";
</script>

<svelte:head>
  <SEO
    title="Kennan LeJeune - ML Researcher & Software Engineer"
    description="Kennan LeJeune - ML Researcher & Software Engineer"
    canonical="https://www.kclj.io"
  />
</svelte:head>

<Navbar />
<main class="pt-16">
  <slot />
</main>
