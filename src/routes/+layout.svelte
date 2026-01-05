<script lang="ts">
  import "@fontsource-variable/ibm-plex-sans";
  import { page } from "$app/state";
  import AppBar from "$lib/components/AppBar.svelte";
  import {
    GitHubIcon,
    LinkedInIcon,
    EmailIcon,
    MenuIcon,
    CloseIcon,
  } from "$lib/components/icons";
  import { routes, siteConfig } from "$lib/config.svelte";
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
          <span in:fade={{ duration: menuDuration }}>
            <MenuIcon />
          </span>
        {:else}
          <span in:fade={{ duration: menuDuration }}>
            <CloseIcon />
          </span>
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
          <GitHubIcon />
        </a>
        <a
          href="https://linkedin.com/in/kclejeune"
          class="transition-colors {footerLinkClass}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </a>
        <a
          href="mailto:contact@kclj.io"
          class="transition-colors {footerLinkClass}"
          aria-label="Email"
        >
          <EmailIcon />
        </a>
      </div>
    </div>
  </AppBar>
</div>
