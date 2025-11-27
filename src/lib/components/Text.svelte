<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<div
  class="container mx-auto text-lg font-normal leading-relaxed md:max-w-prose prose dark:prose-invert"
>
  {#if children}
    {@render children()}
  {/if}
</div>
