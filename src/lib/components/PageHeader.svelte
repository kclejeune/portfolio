<script lang="ts">
  import type { Snippet } from "svelte";
  import PageNav from "$lib/components/PageNav.svelte";

  let {
    eyebrow,
    title,
    children,
  }: {
    eyebrow?: string;
    title: string;
    children?: Snippet;
  } = $props();
</script>

<header class="mb-8 md:mb-12">
  <PageNav>
    <div class="text-center">
      {#if eyebrow}
        <p class="eyebrow mb-1.5">{eyebrow}</p>
      {/if}
      <h1 class="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl dark:text-white">
        {title}
      </h1>
    </div>
  </PageNav>

  {#if children}
    <div class="mt-4">
      {@render children()}
    </div>
  {/if}
</header>
