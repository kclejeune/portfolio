<script lang="ts">
  import "@fontsource-variable/mona-sans/standard.css";
  // Only 500: body text's 440 weight resolves to it, and nothing sets lighter mono text.
  import "@fontsource/monaspace-neon/500.css";
  import { page } from "$app/state";
  import FaceGlyph from "$lib/components/FaceGlyph.svelte";
  import NavProgress from "$lib/components/NavProgress.svelte";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";
  import { contacts, links, sections, siteConfig } from "$lib/config.svelte";
  import SEO from "svelte-seo";
  import "../app.css";

  let { children } = $props();

  const current = $derived(sections.findIndex((s) => page.url.pathname.startsWith(s.path)));
  const face = $derived(sections[current]?.face ?? siteConfig.routes.home.face);
  // The section after this one, wrapping back to the first.
  const next = $derived(current === -1 ? null : sections[(current + 1) % sections.length]);

  const currentYear = new Date().getFullYear();
</script>

<SEO
  title="{siteConfig.name} | {siteConfig.description}"
  description="{siteConfig.name} | {siteConfig.description}"
  canonical={siteConfig.routes.home.canonicalUrl}
/>

<NavProgress />

<div data-face={face} class="flex min-h-[100dvh] flex-col">
  <!-- Visible links fetch their route's code early; data still waits for hover. -->
  <header
    data-sveltekit-preload-code="viewport"
    class="container-page flex h-(--header-h) items-center justify-between gap-4"
  >
    <a
      href="/"
      data-sveltekit-preload-data
      class="flex items-center gap-2.5 text-[1.0625rem] font-semibold tracking-tight"
      aria-label="Kennan LeJeune, home"
    >
      <FaceGlyph class="h-6 w-6" />
      <span class="hidden sm:inline">Kennan LeJeune</span>
    </a>

    <nav class="flex items-center gap-1 sm:gap-2" aria-label="Main">
      {#each sections as section, i (section.path)}
        {@const active = i === current}
        <a
          href={section.path}
          data-sveltekit-preload-data
          aria-current={active ? "page" : undefined}
          class="flex items-center gap-2 rounded-md px-2 py-1.5 text-[0.95rem] font-medium transition-colors sm:px-2.5 {active
            ? 'text-ink'
            : 'text-muted hover:text-ink'}"
        >
          <span
            data-face={section.face}
            class="h-2.5 w-2.5 rounded-[2.5px] bg-accent-sticker transition-opacity max-[359px]:hidden {active
              ? 'opacity-100'
              : 'opacity-40 dark:opacity-60'}"
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
          data-face={next.face}
          class="h-10 w-10 shrink-0 rounded-[7px] bg-accent-sticker transition-transform duration-300 group-hover:rotate-90"
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
        {#each contacts.filter((c) => c.href !== links.resume) as contact (contact.label)}
          <a
            href={contact.href}
            class="transition-colors hover:text-ink"
            aria-label={contact.label}
          >
            <contact.icon class="h-5 w-5" />
          </a>
        {/each}
      </div>
    </div>
  </footer>
</div>
