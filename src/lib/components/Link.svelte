<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    url: string;
    children?: Snippet;
  }

  let { url, children }: Props = $props();
</script>

<a
  class="mb-2 font-light underline text-primary-800 text-md sm:hover:text-primary-600 dark:text-primary-300 sm:dark:hover:text-primary-400"
  href={url}
>
  {#if children}
    {@render children()}
  {/if}
</a>
