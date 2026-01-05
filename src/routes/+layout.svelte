<script lang="ts">
  import { page } from "$app/state";
  import AppBar from "$lib/components/AppBar.svelte";
  import { routes, siteConfig } from "$lib/config.svelte";
  import "@fontsource-variable/ibm-plex-sans";
  import SEO from "svelte-seo";
  import { fade, slide } from "svelte/transition";
  import "../app.css";

  let { children } = $props();

  // Mobile menu state
  const menuDuration = 200;
  let mobileMenuOpen = $state(false);

  // Current path for active state and conditional rendering
  const currentPath = $derived(page.url.pathname);
  const isLandingPage = $derived(currentPath === "/");
  const isThemable = $derived(!isLandingPage);

  // Check if a route is active
  function isActive(path: string): boolean {
    if (path === "/") {
      return currentPath === "/";
    }
    return page.url.pathname.startsWith(path);
  }

  // Get classes for nav links
  function navLinkClass(path: string): string {
    if (!isThemable) {
      return isActive(path)
        ? "bg-primary-900/50 text-primary-300"
        : "text-white/80 hover:text-white hover:bg-white/10";
    }
    return isActive(path)
      ? "bg-primary-100/80 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300"
      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/50";
  }

  // Text classes based on themable state
  const logoTextClass = $derived(
    isThemable
      ? "text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
      : "text-white hover:text-white/80"
  );

  const mobileButtonClass = $derived(
    isThemable
      ? "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/50"
      : "text-white/80 hover:text-white hover:bg-white/10"
  );

  const mobileMenuClass = $derived(
    isThemable
      ? "border-t border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-900/95"
      : "border-t border-white/10 bg-black/30"
  );

  const currentYear = new Date().getFullYear();

  const footerTextClass = $derived(
    isThemable ? "text-slate-500 dark:text-slate-400" : "text-white/50"
  );

  const footerLinkClass = $derived(
    isThemable
      ? "hover:text-slate-700 dark:hover:text-slate-300"
      : "hover:text-white/80"
  );
</script>

<SEO
  title="{siteConfig.name} | {siteConfig.description}"
  description="{siteConfig.name} | {siteConfig.description}"
  canonical={siteConfig.routes.home.canonicalUrl}
/>

<div
  class="flex flex-col {isLandingPage
    ? 'h-screen overflow-hidden'
    : 'min-h-screen bg-slate-100 dark:bg-slate-900'}"
>
  <!-- Navbar -->
  <AppBar position="top" themable={isThemable}>
    <div class="flex-1 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- Logo / Name -->
      <a
        href="/"
        class="flex items-center gap-2 font-medium transition-colors {logoTextClass}"
      >
        <img src="/favicon.ico" alt="" class="w-5 h-5" />
        Kennan LeJeune
      </a>

      <!-- Desktop navigation -->
      <div class="hidden md:flex items-center gap-1">
        {#each routes as route}
          <a
            href={route.path}
            data-sveltekit-preload-data
            class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors {navLinkClass(
              route.path
            )}"
          >
            {route.title}
          </a>
        {/each}
      </div>

      <!-- Mobile menu button -->
      <button
        onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
        type="button"
        class="md:hidden inline-flex items-center justify-center p-2 rounded-md transition-colors {mobileButtonClass}"
        aria-controls="mobile-menu"
        aria-expanded={mobileMenuOpen}
      >
        <span class="sr-only">{mobileMenuOpen ? "Close" : "Open"} menu</span>
        {#if !mobileMenuOpen}
          <svg
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            in:fade={{ duration: menuDuration }}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        {:else}
          <svg
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            in:fade={{ duration: menuDuration }}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        {/if}
      </button>
    </div>
  </AppBar>

  <!-- Mobile menu (outside AppBar due to slide transition) -->
  {#if mobileMenuOpen}
    <div
      class="fixed top-14 left-0 right-0 z-40 md:hidden backdrop-blur-sm {mobileMenuClass}"
      id="mobile-menu"
      transition:slide={{ duration: menuDuration }}
    >
      <div class="px-4 py-2 space-y-1">
        {#each routes as route}
          <a
            href={route.path}
            onclick={() => (mobileMenuOpen = false)}
            data-sveltekit-preload-data
            class="block px-3 py-2 rounded-md text-base font-medium transition-colors {navLinkClass(
              route.path
            )}"
          >
            {route.title}
          </a>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Main content -->
  <main class="pt-14 flex-1 {isLandingPage ? 'flex flex-col' : ''}">
    {#key currentPath}
      <div
        in:fade={{ duration: 150 }}
        class={isLandingPage ? "flex-1 flex flex-col" : ""}
      >
        {@render children()}
      </div>
    {/key}
  </main>

  <!-- Footer -->
  <AppBar position="bottom" themable={isThemable}>
    <div
      class="flex-1 flex items-center justify-between gap-4 text-sm {footerTextClass}"
    >
      <p>&copy; {currentYear} Kennan LeJeune</p>
      <div class="flex items-center gap-4">
        <a
          href="https://github.com/kclejeune"
          class="transition-colors {footerLinkClass}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <svg class="w-5 h-5" viewBox="0 0 496 512" fill="currentColor">
            <path
              d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
            />
          </svg>
        </a>
        <a
          href="https://linkedin.com/in/kclejeune"
          class="transition-colors {footerLinkClass}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <svg class="w-5 h-5" viewBox="0 0 448 512" fill="currentColor">
            <path
              d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
            />
          </svg>
        </a>
        <a
          href="mailto:contact@kclj.io"
          class="transition-colors {footerLinkClass}"
          aria-label="Email"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </a>
      </div>
    </div>
  </AppBar>
</div>
