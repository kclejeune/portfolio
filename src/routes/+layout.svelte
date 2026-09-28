<script lang="ts">
  import "@fontsource-variable/mona-sans/standard.css";
  import "@fontsource/monaspace-neon/400.css";
  import "@fontsource/monaspace-neon/500.css";
  import { page } from "$app/state";
  import FaceGlyph from "$lib/components/FaceGlyph.svelte";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";
  import { GitHubIcon, LinkedInIcon, EmailIcon } from "$lib/components/icons";
  import { faceFor, links, nextSection, sections, siteConfig } from "$lib/config.svelte";
  import SEO from "svelte-seo";
  import "../app.css";

  let { children } = $props();

  // Full class strings so Tailwind picks them up during scanning.
  const markerClass = {
    green: "bg-sticker-green",
    orange: "bg-sticker-orange",
    blue: "bg-sticker-blue",
  } as const;

  const currentPath = $derived(page.url.pathname);
  const face = $derived(faceFor(currentPath));
  const next = $derived(nextSection(currentPath));

  const isActive = (path: string) => currentPath.startsWith(path);

  const currentYear = new Date().getFullYear();
</script>

<SEO
  title="{siteConfig.name} | {siteConfig.description}"
  description="{siteConfig.name} | {siteConfig.description}"
  canonical={siteConfig.routes.home.canonicalUrl}
/>

<div data-face={face} class="flex min-h-[100dvh] flex-col">
  <header class="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
    <a
      href="/"
      class="flex items-center gap-2.5 text-[1.0625rem] font-semibold tracking-tight"
      aria-label="Kennan LeJeune, home"
    >
      <FaceGlyph pool={page.data.cube?.pool.map((c) => c.faces.F)} class="h-6 w-6" />
      <span class="hidden sm:inline">Kennan LeJeune</span>
    </a>

    <nav class="flex items-center gap-1 sm:gap-2" aria-label="Main">
      {#each sections as section (section.path)}
        {@const active = isActive(section.path)}
        <a
          href={section.path}
          data-sveltekit-preload-data
          aria-current={active ? "page" : undefined}
          class="flex items-center gap-2 rounded-md px-2 py-1.5 text-[0.95rem] font-medium transition-colors sm:px-2.5 {active
            ? 'text-ink'
            : 'text-muted hover:text-ink'}"
        >
          <span
            class="h-2.5 w-2.5 rounded-[2.5px] transition-opacity max-[359px]:hidden {markerClass[
              section.face
            ]} {active ? 'opacity-100' : 'opacity-40 dark:opacity-60'}"
            aria-hidden="true"
          ></span>
          {section.title}
        </a>
      {/each}
      <span class="mx-1 h-5 w-px bg-line no-js:hidden" aria-hidden="true"></span>
      <div class="no-js:hidden"><ThemeToggle /></div>
    </nav>
  </header>

  <main class="flex-1">
    {@render children()}
  </main>

  {#if next}
    <div class="container-page mt-20 sm:mt-24">
      <a
        href={next.path}
        data-sveltekit-preload-data
        class="group flex items-center justify-between gap-6 border-t border-line py-8"
      >
        <span>
          <span class="label block">Next</span>
          <span class="display mt-1 block text-4xl sm:text-5xl">{next.title}</span>
          <span class="mt-2 block text-muted">{next.blurb}</span>
        </span>
        <span
          class="h-10 w-10 shrink-0 rounded-[7px] transition-transform duration-300 group-hover:rotate-90 {markerClass[
            next.face
          ]}"
          aria-hidden="true"
        ></span>
      </a>
    </div>
  {/if}

  <footer class="container-page">
    <div
      class="flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-sm text-muted"
    >
      <p>
        &copy; {currentYear} Kennan LeJeune. Built with SvelteKit,
        <a href={links.source} class="underline underline-offset-2 hover:text-ink"
          >source on GitHub</a
        >.
      </p>
      <div class="flex items-center gap-4">
        <a href={links.github} class="transition-colors hover:text-ink" aria-label="GitHub">
          <GitHubIcon class="h-5 w-5" />
        </a>
        <a href={links.linkedin} class="transition-colors hover:text-ink" aria-label="LinkedIn">
          <LinkedInIcon class="h-5 w-5" />
        </a>
        <a href={links.email} class="transition-colors hover:text-ink" aria-label="Email">
          <EmailIcon class="h-5 w-5" />
        </a>
      </div>
    </div>
  </footer>
</div>
