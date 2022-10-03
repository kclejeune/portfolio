<script lang="ts">
  export let id: string;
  export let title: string = "";
  export let backgroundClass: string = "bg-surface-200 dark:bg-surface-900";
  export let textClass: string = "text-surface-800 dark:text-surface-200";
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
