<script lang="ts">
  import type { Snippet } from "svelte";

  // Every page's title and intro, in the same place and style, so switching
  // pages swaps the text without the layout jumping.
  let {
    title,
    marker = true,
    contained = true,
    children,
  }: {
    title: string;
    /** The section's sticker square after the title. */
    marker?: boolean;
    /** Wrap in the page container (off when already inside one). */
    contained?: boolean;
    children?: Snippet;
  } = $props();
</script>

<header class="pt-8 pb-12 md:pt-14 md:pb-16 {contained ? 'container-page' : ''}">
  <h1 class="display flex items-baseline gap-[0.12em] text-title">
    {title}{#if marker}<span
        class="inline-block h-[0.32em] w-[0.32em] shrink-0 rounded-[0.05em] bg-accent-sticker"
        aria-hidden="true"
      ></span>{/if}
  </h1>
  {#if children}
    <div class="mt-6 max-w-[56ch] text-xl leading-relaxed text-pretty text-muted">
      {@render children()}
    </div>
  {/if}
</header>
