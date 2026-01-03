<script lang="ts">
  import type { Snippet } from "svelte";
  import { page } from "$app/state";
  import { getAdjacentRoutes } from "$lib/config.svelte";

  let { children }: { children: Snippet } = $props();

  const adjacent = $derived(getAdjacentRoutes(page.url.pathname));
</script>

<div class="flex items-center justify-between w-full">
  <!-- Previous -->
  <div class="flex-1 flex justify-start">
    {#if adjacent.prev}
      <a
        href={adjacent.prev.path}
        class="flex items-center gap-1.5 p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Previous: {adjacent.prev.title}"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
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
        class="flex items-center gap-1.5 p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Next: {adjacent.next.title}"
      >
        <span class="hidden md:inline text-sm">{adjacent.next.title}</span>
        <svg
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    {/if}
  </div>
</div>
