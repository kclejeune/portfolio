<script lang="ts">
  import type { Snippet } from "svelte";
  import { page } from "$app/state";
  import { getAdjacentRoutes } from "$lib/config.svelte";
  import { ChevronLeftIcon, ChevronRightIcon } from "$lib/components/icons";

  let { children }: { children: Snippet } = $props();

  const adjacent = $derived(getAdjacentRoutes(page.url.pathname));
</script>

<div class="flex items-center justify-between w-full">
  <!-- Previous -->
  <div class="flex-1 flex justify-start">
    {#if adjacent.prev}
      <a
        href={adjacent.prev.path}
        data-sveltekit-preload-data
        class="flex items-center gap-1.5 p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors"
        aria-label="Previous: {adjacent.prev.title}"
      >
        <ChevronLeftIcon />
        <span class="hidden md:inline text-sm">{adjacent.prev.title}</span>
      </a>
    {/if}
  </div>

  <!-- Title -->
  <div class="flex-shrink-0 px-4">
    {@render children()}
  </div>

  <!-- Next -->
  <div class="flex-1 flex justify-end">
    {#if adjacent.next}
      <a
        href={adjacent.next.path}
        data-sveltekit-preload-data
        class="flex items-center gap-1.5 p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors"
        aria-label="Next: {adjacent.next.title}"
      >
        <span class="hidden md:inline text-sm">{adjacent.next.title}</span>
        <ChevronRightIcon />
      </a>
    {/if}
  </div>
</div>
