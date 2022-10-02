<script lang="ts">
  import { claim_component } from "svelte/internal";

  export let id: string;
  export let title: string = "";
  export let backgroundClass: string = "bg-neutral-200 dark:bg-neutral-900";
  export let textClass: string = "text-neutral-800 dark:text-neutral-200";
</script>

<section {id} class="page {backgroundClass} {textClass}">
  <div class="pt-4 pb-2 text-4xl text-center">{title}</div>
  <div class="p-4">
    <slot />
  </div>
</section>

<noscript>
  <style>
    .page {
      @apply min-h-screen sm:min-h-[calc(100vh-4rem)];
      width: 100%;
    }
  </style>
</noscript>
