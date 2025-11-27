<script lang="ts">
  import type { Snippet } from "svelte";
  import Anchor from "./Anchor.svelte";

  interface Props {
    id: string;
    title?: string;
    backgroundClass?: string;
    textClass?: string;
    children?: Snippet;
  }

  let {
    id,
    title = "",
    backgroundClass = "bg-neutral-200 dark:bg-neutral-900",
    textClass = "text-neutral-800 dark:text-neutral-200",
    children,
  }: Props = $props();
</script>

<Anchor {id} />
<div class="page {backgroundClass} {textClass}">
  <div class="pt-4 pb-2 text-4xl text-center">{title}</div>
  <div class="p-4">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>
