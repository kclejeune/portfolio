<script lang="ts">
  import Link from "./Link.svelte";
  export let title: string = "";
  export let subtitle: string = "";
  export let url: string = "";
  export let tags: string[] = [];
</script>

<div
  class="flex flex-col justify-between overflow-hidden shadow-xl bg-neutral-50 dark:bg-neutral-800 rounded-xl"
>
  <div class="px-6 py-4 break-words">
    {#if title}
      <div class="mb-1 text-2xl font-medium">{title}</div>
    {/if}
    {#if subtitle}
      <div
        class="mb-1 font-light text-neutral-600 text-md dark:text-neutral-400"
      >
        {subtitle}
      </div>
    {:else if url}
      <div class="mb-1">
        <Link {url}>{url}</Link>
      </div>
    {/if}
    <div>
      <slot />
    </div>
  </div>
  <div>
    {#if tags?.length > 0}
      <div class="px-6 pt-4 pb-2 align-bottom">
        {#each tags as tag}
          <span
            class="inline-block px-4 py-1 mb-2 mr-2 text-sm font-semibold rounded-full bg-primary-300 dark:bg-primary-700"
          >
            {tag}
          </span>
        {/each}
      </div>
    {/if}
  </div>
</div>
