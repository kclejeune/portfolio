<script lang="ts">
  import type { GithubProfile, Repository } from "$lib/utils";
  import PageHeader from "$lib/components/PageHeader.svelte";
  import SocialLinks from "$lib/components/SocialLinks.svelte";
  import Stat from "$lib/components/Stat.svelte";
  import ContributionHeatmap from "$lib/components/ContributionHeatmap.svelte";
  import SkillsRadar from "$lib/components/SkillsRadar.svelte";
  import LanguageBar from "$lib/components/LanguageBar.svelte";
  import { skillCategories, skillDomains, skillTerms } from "$lib/data/skills";
  import { ArrowUpRightIcon, StarIcon, ForkIcon, RepoIcon, UsersIcon } from "$lib/components/icons";
  import SEO from "svelte-seo";
  import { siteConfig } from "$lib/config.svelte";

  let { data }: { data: { profile: GithubProfile } } = $props();

  const username = "kclejeune";
  const githubUrl = `https://github.com/${username}`;

  const profile = $derived(data.profile);
  const hasStats = $derived(profile.stats.publicRepos > 0 || profile.contributions.total > 0);
  const hasHeatmap = $derived(profile.contributions.weeks.length > 0);

  // --- Language footprint (radar + bar), from GitHub repo activity ---
  const radarLanguages = $derived(profile.languages.filter((l) => l.name !== "Other").slice(0, 6));
  const hasLanguageData = $derived(radarLanguages.length >= 3);
  const radarData = $derived(
    hasLanguageData
      ? radarLanguages.map((l) => ({ axis: l.name, level: l.percent }))
      : skillDomains,
  );
  const radarMax = $derived(
    hasLanguageData ? Math.max(...radarLanguages.map((l) => l.percent)) : 5,
  );

  // --- Skill ↔ repository matching ---
  function repoTerms(repo: Repository): Set<string> {
    return new Set(
      [...repo.languages, ...repo.repositoryTopics].filter(Boolean).map((t) => t.toLowerCase()),
    );
  }

  function matchingRepos(skill: string): Repository[] {
    const terms = skillTerms(skill);
    return profile.repos.filter((repo) => {
      const haystack = repoTerms(repo);
      return terms.some((t) => haystack.has(t));
    });
  }

  const matchCounts = $derived(
    new Map(
      skillCategories.flatMap((c) => c.skills).map((skill) => [skill, matchingRepos(skill).length]),
    ),
  );
  const anyMatches = $derived([...matchCounts.values()].some((n) => n > 0));

  let activeSkill = $state<string | null>(null);

  function toggleSkill(skill: string) {
    activeSkill = activeSkill === skill ? null : skill;
  }

  const highlightedUrls = $derived(
    activeSkill ? new Set(matchingRepos(activeSkill).map((r) => r.url)) : null,
  );

  function repoCardClass(repo: Repository): string {
    if (!highlightedUrls) return "";
    return highlightedUrls.has(repo.url)
      ? "border-primary-400/70 ring-1 ring-primary-400/40 dark:border-primary-400/50"
      : "opacity-40";
  }

  const iconPaths: Record<string, string> = {
    brain:
      "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5",
    code: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
    server:
      "M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z",
  };

  // Topics only — the primary language gets its own GitHub-style color dot.
  function repoTags(repo: Repository): string[] {
    return Array.from(
      new Set<string>(repo.repositoryTopics.filter(Boolean).map((e) => e.toLowerCase().trim())),
    ).sort();
  }
</script>

<SEO
  title="Projects &amp; Skills | {siteConfig.name}"
  description="Projects, open source work, and technical skills of {siteConfig.name} — with each skill traced to the repositories that use it."
  canonical={siteConfig.routes.projects.canonicalUrl}
/>

<div class="page-content">
  <div class="section-container">
    <PageHeader eyebrow="What I build — and what I build with" title="Projects & Skills">
      <SocialLinks links={[{ label: "View all on GitHub", href: githubUrl }]} />
    </PageHeader>

    {#if hasStats}
      <div class="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Stat value={profile.stats.totalStars.toLocaleString()} label="Stars Earned">
          {#snippet icon()}<StarIcon class="h-5 w-5" />{/snippet}
        </Stat>
        <Stat value={profile.stats.publicRepos} label="Public Repos">
          {#snippet icon()}<RepoIcon class="h-5 w-5" />{/snippet}
        </Stat>
        <Stat value={profile.stats.followers} label="Followers">
          {#snippet icon()}<UsersIcon class="h-5 w-5" />{/snippet}
        </Stat>
        <Stat value={profile.contributions.total.toLocaleString()} label="Contributions">
          {#snippet icon()}<ForkIcon class="h-5 w-5" />{/snippet}
        </Stat>
      </div>
    {/if}

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
              <LanguageBar languages={profile.languages} />
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Toolbox: skills grouped by area; chips with matches filter the repos below -->
    <div class="mb-3 flex flex-wrap items-baseline justify-between gap-2">
      <h2 class="text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
        Toolbox
      </h2>
      {#if anyMatches}
        <p class="text-xs text-slate-400 dark:text-slate-500">
          Select a highlighted skill to see it in the repositories below
        </p>
      {/if}
    </div>
    <div class="mb-8 grid gap-4 md:grid-cols-3">
      {#each skillCategories as category (category.name)}
        <div class="card p-5 md:p-6">
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
              {@const count = matchCounts.get(skill) ?? 0}
              {#if count > 0}
                <button
                  type="button"
                  onclick={() => toggleSkill(skill)}
                  aria-pressed={activeSkill === skill}
                  class="tag-primary cursor-pointer transition-all {activeSkill === skill
                    ? 'ring-2 ring-primary-500/60'
                    : 'hover:bg-primary-200 dark:hover:bg-primary-500/25'}"
                >
                  {skill}
                  <span class="ml-1.5 text-xs opacity-60">{count}</span>
                </button>
              {:else}
                <span class="tag">{skill}</span>
              {/if}
            {/each}
          </div>
        </div>
      {/each}
    </div>

    {#if profile.repos.length > 0}
      <div class="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2
          class="text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400"
        >
          Featured repositories
        </h2>
        {#if activeSkill}
          <button
            type="button"
            onclick={() => (activeSkill = null)}
            class="text-xs text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Showing {activeSkill} · Clear
          </button>
        {/if}
      </div>
      <div class="mb-6 grid gap-4 sm:gap-5 md:grid-cols-2">
        {#each profile.repos as repo (repo.url)}
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            class="group card card-hover flex flex-col p-5 transition-all duration-200 {repoCardClass(
              repo,
            )}"
          >
            <div class="mb-2 flex items-start justify-between gap-2">
              <h3
                class="text-lg font-semibold break-all text-slate-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400"
              >
                {repo.name}
              </h3>
              <ArrowUpRightIcon
                class="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-500"
              />
            </div>

            <p class="mb-3 line-clamp-2 text-base text-slate-600 dark:text-slate-300">
              {repo.description || "No description available"}
            </p>

            {#if repoTags(repo).length > 0}
              <div class="mb-3 flex flex-wrap gap-1.5">
                {#each repoTags(repo).slice(0, 4) as tag (tag)}
                  <span class="tag">{tag}</span>
                {/each}
                {#if repoTags(repo).length > 4}
                  <span class="self-center text-xs text-slate-400">
                    +{repoTags(repo).length - 4}
                  </span>
                {/if}
              </div>
            {/if}

            <!-- GitHub-style meta row, pinned to the bottom of the card -->
            <div class="mt-auto flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              {#if repo.primaryLanguage}
                <span class="flex items-center gap-1.5">
                  <span
                    class="h-2.5 w-2.5 rounded-full"
                    style="background-color: {repo.primaryLanguage.color};"
                  ></span>
                  {repo.primaryLanguage.name}
                </span>
              {/if}
              {#if repo.stargazerCount > 0}
                <span class="flex items-center gap-1">
                  <StarIcon class="h-3.5 w-3.5 text-accent-400" />
                  {repo.stargazerCount.toLocaleString()}
                </span>
              {/if}
              {#if repo.forkCount > 0}
                <span class="flex items-center gap-1">
                  <ForkIcon class="h-3.5 w-3.5" />
                  {repo.forkCount.toLocaleString()}
                </span>
              {/if}
            </div>
          </a>
        {/each}
      </div>
    {:else}
      <div class="card mb-6 p-8 text-center">
        <p class="mb-4 text-slate-600 dark:text-slate-400">Check out my projects on GitHub</p>
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" class="btn">
          View on GitHub
        </a>
      </div>
    {/if}

    {#if hasHeatmap}
      <div class="card p-5 md:p-6">
        <h2 class="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
          Contribution activity
        </h2>
        <ContributionHeatmap calendar={profile.contributions} />
      </div>
    {/if}
  </div>
</div>
