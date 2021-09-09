<script>
  import "../app.postcss";
  import Navbar from "$lib/components/Navbar.svelte";
</script>

<Navbar />
<main class="pt-16">
  <slot />
</main>
