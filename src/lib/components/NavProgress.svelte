<script lang="ts">
  import { navigating } from "$app/state";
  import { sections, siteConfig } from "$lib/config.svelte";

  // Loads block navigation until their data arrives (the projects page waits
  // on GitHub), so a slow one would otherwise leave the old page up with no
  // sign anything is happening. Shown only past a short delay, so fast and
  // preloaded navigations don't flash it.
  let visible = $state(false);
  $effect(() => {
    if (!navigating.to) {
      visible = false;
      return;
    }
    const timer = setTimeout(() => (visible = true), 150);
    return () => clearTimeout(timer);
  });

  // Colored for the page being loaded, not the one being left.
  const face = $derived(
    sections.find((s) => navigating.to?.url.pathname.startsWith(s.path))?.face ??
      siteConfig.routes.home.face,
  );
</script>

{#if visible}
  <div
    role="progressbar"
    aria-label="Loading page"
    data-face={face}
    class="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden bg-accent/15"
  >
    <div class="bar h-full w-1/3 bg-accent"></div>
  </div>
{/if}

<style>
  .bar {
    animation: slide 1.1s ease-in-out infinite;
  }
  @keyframes slide {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(300%);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .bar {
      animation: none;
      width: 100%;
      opacity: 0.6;
    }
  }
</style>
