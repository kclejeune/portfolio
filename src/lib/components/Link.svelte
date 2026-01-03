<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    url: string;
    children?: Snippet;
  }

  let { url, children }: Props = $props();
</script>

<a
  class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline underline-offset-2 transition-colors"
  href={url}
  rel="noopener noreferrer"
  target="_blank"
>
  {#if children}
    {@render children()}
  {/if}
</a>
