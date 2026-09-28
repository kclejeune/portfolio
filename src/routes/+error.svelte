<script lang="ts">
  import { page } from "$app/state";

  const notFound = $derived(page.status === 404);
</script>

<div class="container-page py-16 md:py-28">
  <p class="display text-display text-accent tabular-nums">{page.status}</p>
  <h1 class="mt-6 text-3xl font-semibold tracking-tight">
    {notFound ? "This page doesn't exist" : page.error?.message || "Something went wrong"}
  </h1>
  <p class="mt-3 max-w-[48ch] text-lg text-muted">
    {notFound
      ? "The link may be old or mistyped. Check the address, or start again from the homepage."
      : "The server hit an error loading this page. Try again in a moment, or start from the homepage."}
  </p>
  <a href="/" class="link mt-8 inline-block text-lg">Go to the homepage</a>
</div>
