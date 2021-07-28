<script lang="ts">
  import Anchor from "./Anchor.svelte";

  export let id: string;
  export let title: string = "";
  export let backgroundClass: string = "bg-neutral-200 dark:bg-neutral-900";
  export let textClass: string = "text-neutral-800 dark:text-neutral-200";
</script>

<Anchor {id} />
<div class="page {backgroundClass} {textClass}">
  <div class="pt-4 pb-2 text-4xl text-center">{title}</div>
  <div class="p-4">
    <slot />
  </div>
</div>

<style global>
  .page {
    min-height: calc(100vh - 4rem);
    width: 100%;
  }
</style>
