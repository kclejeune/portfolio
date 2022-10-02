<script lang="ts">
  import "@brainandbones/skeleton/styles/all.css";
  import "@brainandbones/skeleton/themes/theme-skeleton.css";
  import "../app.css";

  import NavItems from "$lib/components/NavItems.svelte";
  import { activeHash, isDrawerOpen, routes } from "$lib/utils/stores";
  import {
    AppBar,
    AppShell,
    Drawer,
    LightSwitch,
  } from "@brainandbones/skeleton";
  import { onDestroy } from "svelte";
  import HamburgerButton from "$lib/components/HamburgerButton.svelte";

  let observer: IntersectionObserver;
  let innerHeight: number;

  function scrollSpy(height: number) {
    const navHeight =
      document?.getElementById("shell-header")?.clientHeight ?? 70;
    observer?.disconnect();
    observer = new IntersectionObserver(
      (entries) =>
        entries
          .filter((e) => e.isIntersecting)
          .reverse()
          .forEach((entry) => {
            $activeHash = "#" + entry.target.id;
          }),
      {
        rootMargin: `${navHeight}px 0px -${height - navHeight - 1}px 0px`,
      }
    );

    $routes
      ?.map((route) => document.getElementById(route.name))
      .forEach((el) => el && observer.observe(el));
  }

  $: if (innerHeight) {
    scrollSpy(innerHeight);
  }

  onDestroy(() => {
    observer?.disconnect();
  });
</script>

<svelte:window bind:innerHeight />
<!-- This example requires Tailwind CSS v2.0+ -->
<AppShell>
  <svelte:fragment slot="header">
    <AppBar padding="px-4 py-4">
      <svelte:fragment slot="lead">
        <HamburgerButton />
        <!-- top nav items -->
        <span class="hidden space-x-4 sm:flex">
          <NavItems routes={$routes} activeHash={$activeHash} />
        </span>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <LightSwitch class="js-only" />
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <slot id="content" />
</AppShell>
<!-- Mobile menu, show/hide based on menu state. -->
<Drawer open={isDrawerOpen} class="js-only sm:hidden" position="left">
  <div class="flex flex-col m-1 sm:hidden">
    <NavItems margin="m-1" routes={$routes} activeHash={$activeHash} />
  </div>
</Drawer>

<noscript>
  <style lang="postcss">
    /* header, */
    .js-only {
      @apply hidden;
    }

    header {
      @apply hidden sm:block;
    }
  </style>
</noscript>
