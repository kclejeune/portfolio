<script lang="ts">
  import "@fontsource-variable/ibm-plex-sans";
  import { page } from "$app/state";
  import AppBar from "$lib/components/AppBar.svelte";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";
  import { GitHubIcon, LinkedInIcon, EmailIcon, MenuIcon, CloseIcon } from "$lib/components/icons";
  import { routes, siteConfig } from "$lib/config.svelte";
  import SEO from "svelte-seo";
  import { fade, slide } from "svelte/transition";
  import "../app.css";

  let { children } = $props();

  const menuDuration = 200;
  let mobileMenuOpen = $state(false);

  const currentPath = $derived(page.url.pathname);
  const isLandingPage = $derived(currentPath === "/");
  // The landing page renders a transparent bar over the hero image.
  const isThemable = $derived(!isLandingPage);

  function isActive(path: string): boolean {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  }

  // "Non-themable" chrome floats over the hero photo: dark text on the light
  // scrim in light mode, white text on the dark scrim in dark mode.
  function navLinkClass(path: string): string {
    if (!isThemable) {
      return isActive(path)
        ? "bg-slate-900/10 text-slate-900 dark:bg-white/15 dark:text-white"
        : "text-slate-700 hover:bg-slate-900/5 hover:text-slate-900 dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white";
    }
    return isActive(path)
      ? "bg-primary-100/80 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white";
  }

  const logoTextClass = $derived(
    isThemable
      ? "text-slate-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-400"
      : "text-slate-900 hover:text-slate-700 dark:text-white dark:hover:text-white/80",
  );

  const mobileButtonClass = $derived(
    isThemable
      ? "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/60"
      : "text-slate-700 hover:bg-slate-900/5 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white",
  );

  const mobileMenuClass = $derived(
    isThemable
      ? "border-t border-slate-200/60 bg-white/95 dark:border-slate-800 dark:bg-slate-950/95"
      : "border-t border-slate-900/10 bg-white/70 dark:border-white/10 dark:bg-slate-950/60",
  );

  const currentYear = new Date().getFullYear();

  const footerTextClass = $derived(
    isThemable ? "text-slate-500 dark:text-slate-400" : "text-slate-600 dark:text-white/50",
  );

  const footerLinkClass = $derived(
    isThemable
      ? "hover:text-slate-700 dark:hover:text-slate-300"
      : "hover:text-slate-900 dark:hover:text-white/80",
  );
</script>

<SEO
  title="{siteConfig.name} | {siteConfig.description}"
  description="{siteConfig.name} | {siteConfig.description}"
  canonical={siteConfig.routes.home.canonicalUrl}
/>

<div
  class="flex flex-col {isLandingPage
    ? 'h-[100dvh] overflow-hidden'
    : 'min-h-[100dvh] bg-slate-50 dark:bg-slate-950'}"
>
  <!-- Navbar -->
  <AppBar position="top" themable={isThemable}>
    <div class="flex flex-1 items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- Logo / Name -->
      <a
        href="/"
        class="flex items-center gap-2 font-medium tracking-tight transition-colors {logoTextClass}"
      >
        <img src="/favicon.ico" alt="" class="h-5 w-5 rounded" />
        Kennan LeJeune
      </a>

      <!-- Desktop navigation -->
      <div class="hidden items-center gap-1 md:flex">
        {#each routes as route (route.path)}
          <a
            href={route.path}
            data-sveltekit-preload-data
            class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors {navLinkClass(
              route.path,
            )}"
          >
            {route.title}
          </a>
        {/each}
        <div
          class="mx-1 h-5 w-px {isThemable
            ? 'bg-slate-200 dark:bg-slate-700'
            : 'bg-slate-900/15 dark:bg-white/20'}"
          aria-hidden="true"
        ></div>
        <ThemeToggle themable={isThemable} />
      </div>

      <!-- Mobile controls -->
      <div class="flex items-center gap-1 md:hidden">
        <ThemeToggle themable={isThemable} />
        <button
          onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
          type="button"
          class="inline-flex items-center justify-center rounded-md p-2 transition-colors {mobileButtonClass}"
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
    </div>
  </AppBar>

  <!-- Mobile menu (outside AppBar due to slide transition) -->
  {#if mobileMenuOpen}
    <div
      class="fixed top-14 right-0 left-0 z-40 backdrop-blur-md md:hidden {mobileMenuClass}"
      id="mobile-menu"
      transition:slide={{ duration: menuDuration }}
    >
      <div class="space-y-1 px-4 py-2">
        {#each routes as route (route.path)}
          <a
            href={route.path}
            onclick={() => (mobileMenuOpen = false)}
            data-sveltekit-preload-data
            class="block rounded-md px-3 py-2 text-base font-medium transition-colors {navLinkClass(
              route.path,
            )}"
          >
            {route.title}
          </a>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Main content -->
  <main class="flex-1 pt-14 {isLandingPage ? 'flex flex-col' : ''}">
    {#key currentPath}
      <div in:fade={{ duration: 150 }} class={isLandingPage ? "flex flex-1 flex-col" : ""}>
        {@render children()}
      </div>
    {/key}
  </main>

  <!-- Footer -->
  <AppBar position="bottom" themable={isThemable}>
    <div class="flex flex-1 items-center justify-between gap-4 text-sm {footerTextClass}">
      <p>&copy; {currentYear} Kennan LeJeune</p>
      <div class="flex items-center gap-4">
        <a
          href="https://github.com/kclejeune"
          class="transition-colors {footerLinkClass}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <GitHubIcon class="h-5 w-5" />
        </a>
        <a
          href="https://linkedin.com/in/kclejeune"
          class="transition-colors {footerLinkClass}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedInIcon class="h-5 w-5" />
        </a>
        <a
          href="mailto:contact@kclj.io"
          class="transition-colors {footerLinkClass}"
          aria-label="Email"
        >
          <EmailIcon class="h-5 w-5" />
        </a>
      </div>
    </div>
  </AppBar>
</div>
