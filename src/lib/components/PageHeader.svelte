<script lang="ts">
  import type { Snippet } from "svelte";

  let { title, children }: { title: string; children?: Snippet } = $props();
</script>

<header class="container-page pt-8 pb-12 md:pt-14 md:pb-16">
  <h1 class="display flex items-baseline gap-[0.12em] text-title">
    {title}<span
      class="inline-block h-[0.32em] w-[0.32em] shrink-0 rounded-[0.05em] bg-accent-sticker"
      aria-hidden="true"
    ></span>
  </h1>
  {#if children}
    <div class="mt-6 max-w-[56ch] text-xl leading-relaxed text-pretty text-muted">
      {@render children()}
    </div>
  {/if}
</header>
