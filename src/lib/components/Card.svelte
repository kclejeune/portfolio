<script lang="ts">
  import Link from "./Link.svelte";
  export let title: string = "";
  export let subtitle: string = "";
  export let url: string = "";
  export let tags: string[] = [];
</script>

<div class="card dark:bg-surface-800 bg-surface-100">
  {#if title || subtitle || url}
    <header class="card-header">
      <div class:hidden={!title} class="card-title">{title}</div>
      {#if subtitle}
        <div class="card-subtitle">{subtitle}</div>
      {:else if url}
        <div class="mb-1">
          <Link {url}>{url}</Link>
        </div>
      {/if}
    </header>
  {/if}
  <div class="card-body">
    <slot />
  </div>
  {#if tags?.length > 0}
    <footer class="card-footer">
      {#each tags as tag}
        <span
          class="px-4 py-1 mb-2 mr-2 text-sm font-semibold rounded-full badge bg-primary-200 dark:bg-primary-700"
        >
          {tag}
        </span>
      {/each}
    </footer>
  {/if}
</div>
