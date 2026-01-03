<script lang="ts">
  import "../app.css";
  import { page } from "$app/state";
  import { fade, slide } from "svelte/transition";
  import Footer from "$lib/components/Footer.svelte";
  import SEO from "svelte-seo";
  import { siteConfig } from "$lib/config.svelte";

  let { children } = $props();

  // Navigation routes
  const routes = [
    { path: "/", title: "Home" },
    { path: "/about", title: "About" },
    { path: "/work", title: "Work" },
    { path: "/projects", title: "Projects", preload: "hover" as const },
    { path: "/skills", title: "Skills" },
  ];

  // Mobile menu state
  const menuDuration = 200;
  let mobileMenuOpen = $state(false);

  // Current path for active state and conditional rendering
  const currentPath = $derived(page.url.pathname);
  const showFooter = $derived(currentPath !== "/");

  // Check if a route is active
  function isActive(path: string): boolean {
    if (path === "/") {
      return currentPath === "/";
    }
    return page.url.pathname.startsWith(path);
  }

  // Get classes for nav links
  function navLinkClass(path: string): string {
    return isActive(path)
      ? "bg-primary-100/80 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300"
      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/50";
  }
</script>

<SEO
  title="{siteConfig.name} | {siteConfig.description}"
  description="{siteConfig.name} | {siteConfig.description}"
  canonical={siteConfig.routes.home.canonicalUrl}
/>

<div class="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-900">
  <!-- Navbar -->
  <nav
    class="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50"
  >
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-14">
        <!-- Logo / Name -->
        <a
          href="/"
          class="flex items-center gap-2 font-medium text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <img src="/favicon.ico" alt="" class="w-5 h-5" />
          Kennan LeJeune
        </a>

        <!-- Desktop navigation -->
        <div class="hidden md:flex items-center gap-1">
          {#each routes as route}
            <a
              href={route.path}
              data-sveltekit-preload-data={route.preload}
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
          class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors"
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
    </div>

    <!-- Mobile menu -->
    {#if mobileMenuOpen}
      <div
        class="md:hidden border-t border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-900/95 backdrop-blur-md"
        id="mobile-menu"
        transition:slide={{ duration: menuDuration }}
      >
        <div class="px-4 py-2 space-y-1">
          {#each routes as route}
            <a
              href={route.path}
              onclick={() => (mobileMenuOpen = false)}
              data-sveltekit-preload-data={route.preload}
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
  </nav>

  <!-- Main content -->
  <main class="pt-14 flex-1">
    {#key currentPath}
      <div in:fade={{ duration: 150 }}>
        {@render children()}
      </div>
    {/key}
  </main>

  <!-- Footer (hidden on landing page) -->
  {#if showFooter}
    <Footer />
  {/if}
</div>
