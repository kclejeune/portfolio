<script lang="ts">
  import PageHeader from "$lib/components/PageHeader.svelte";
  import SocialLinks from "$lib/components/SocialLinks.svelte";
  import SkillsRadar from "$lib/components/SkillsRadar.svelte";
  import LanguageBar from "$lib/components/LanguageBar.svelte";
  import { skillCategories, skillDomains } from "$lib/data/skills";
  import { siteConfig } from "$lib/config.svelte";
  import type { GithubProfile } from "$lib/utils";
  import SEO from "svelte-seo";

  let { data }: { data: { profile: GithubProfile } } = $props();

  // Radar axes come from real language usage across public repositories.
  const radarLanguages = $derived(
    data.profile.languages.filter((l) => l.name !== "Other").slice(0, 6),
  );
  const hasLanguageData = $derived(radarLanguages.length >= 3);

  const radarData = $derived(
    hasLanguageData
      ? radarLanguages.map((l) => ({ axis: l.name, level: l.percent }))
      : skillDomains,
  );
  const radarMax = $derived(
    hasLanguageData ? Math.max(...radarLanguages.map((l) => l.percent)) : 5,
  );

  const iconPaths: Record<string, string> = {
    brain:
      "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5",
    code: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
    server:
      "M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z",
  };
</script>

<SEO
  title="{siteConfig.routes.skills.title} | {siteConfig.name}"
  description="Technical skills and expertise of {siteConfig.name} — machine learning, frontend development, backend systems, and infrastructure."
  canonical={siteConfig.routes.skills.canonicalUrl}
/>

<div class="page-content">
  <div class="section-container">
    <PageHeader eyebrow="What I work with" title="Skills & Technologies">
      <SocialLinks
        links={[
          { label: "LinkedIn", href: "https://linkedin.com/in/kclejeune" },
          { label: "GitHub", href: "https://github.com/kclejeune" },
        ]}
      />
    </PageHeader>

    <!-- Language footprint (objective, from GitHub repo activity) -->
    <div class="card mb-6 p-6 md:p-8">
      <div class="grid items-center gap-6 md:grid-cols-2">
        <SkillsRadar
          data={radarData}
          max={radarMax}
          showValues={hasLanguageData}
          label={hasLanguageData
            ? "Radar chart of relative language usage across public GitHub repositories"
            : "Radar chart of focus across engineering domains"}
        />
        <div>
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
            {hasLanguageData ? "Language footprint" : "Domain focus"}
          </h2>
          <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {#if hasLanguageData}
              How much each language shows up across my public GitHub repositories, with every repo
              weighted equally — an objective look at what I actually build with, without one large
              codebase skewing the picture.
            {:else}
              A high-level view of where I spend my time across distributed systems, infrastructure,
              backend, and applied machine learning.
            {/if}
          </p>
          {#if hasLanguageData}
            <div class="mt-5">
              <LanguageBar languages={data.profile.languages} />
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Tooling, grouped by area -->
    <div class="grid gap-4 md:grid-cols-3">
      {#each skillCategories as category (category.name)}
        <div class="card card-hover p-6">
          <div class="mb-4 flex items-center gap-3">
            <div class="rounded-lg bg-primary-100 p-2 dark:bg-primary-500/15">
              <svg
                class="h-5 w-5 text-primary-600 dark:text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d={iconPaths[category.icon]} />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-slate-900 dark:text-white">
              {category.name}
            </h3>
          </div>

          <div class="flex flex-wrap gap-2">
            {#each category.skills as skill (skill)}
              <span class="tag-primary">{skill}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
