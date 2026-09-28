<script lang="ts">
  import type { GithubProfile, Repository } from "$lib/utils";
  import PageHeader from "$lib/components/PageHeader.svelte";
  import ContributionHeatmap from "$lib/components/ContributionHeatmap.svelte";
  import SkillsRadar from "$lib/components/SkillsRadar.svelte";
  import LanguageFrecency from "$lib/components/LanguageFrecency.svelte";
  import { skillCategories, skillDomains, skillTerms } from "$lib/data/skills";
  import { ArrowUpRightIcon, StarIcon, ForkIcon } from "$lib/components/icons";
  import SEO from "svelte-seo";
  import { links, siteConfig } from "$lib/config.svelte";

  let { data }: { data: { profile: GithubProfile } } = $props();

  const profile = $derived(data.profile);
  const hasStats = $derived(profile.stats.publicRepos > 0);
  const hasHeatmap = $derived(profile.contributions.weeks.length > 0);

  // --- Language trajectory, from recent commits + long-term repository breadth ---
  const hasLanguageData = $derived(profile.languages.filter((l) => l.name !== "Other").length >= 3);

  // Shown inline beside the contribution graph, which reports its own total.
  const stats = $derived([
    { value: profile.stats.totalStars, label: "stars" },
    { value: profile.stats.publicRepos, label: "public repositories" },
    { value: profile.stats.followers, label: "followers" },
  ]);

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

  // Skills that appear in at least one pinned repository, for filtering.
  const filterSkills = $derived(
    skillCategories
      .flatMap((c) => c.skills)
      .map((skill) => ({ skill, count: matchingRepos(skill).length }))
      .filter((s) => s.count > 0),
  );

  let activeSkill = $state<string | null>(null);

  function toggleSkill(skill: string) {
    activeSkill = activeSkill === skill ? null : skill;
  }

  const highlightedUrls = $derived(
    activeSkill ? new Set(matchingRepos(activeSkill).map((r) => r.url)) : null,
  );

  function isDimmed(repo: Repository): boolean {
    return highlightedUrls !== null && !highlightedUrls.has(repo.url);
  }

  // Topics only — the primary language gets its own GitHub-style color dot.
  function repoTags(repo: Repository): string[] {
    return Array.from(
      new Set<string>(repo.repositoryTopics.filter(Boolean).map((e) => e.toLowerCase().trim())),
    ).sort();
  }

  const filterClass = (active: boolean) =>
    active
      ? "border-accent bg-accent text-paper"
      : "border-line text-muted hover:border-ink hover:text-ink";
</script>

<SEO
  title="Projects | {siteConfig.name}"
  description="Open source projects, languages, and tools of {siteConfig.name}, pulled from GitHub."
  canonical={siteConfig.routes.projects.canonicalUrl}
/>

<PageHeader title="Projects">
  Open source work, pulled from <a href={links.github} class="link">my GitHub</a>.
</PageHeader>

<div class="container-page space-y-16 md:space-y-20">
  {#if profile.repos.length > 0}
    <section aria-labelledby="repos">
      <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2 id="repos" class="text-2xl font-semibold tracking-tight">Pinned repositories</h2>
        {#if filterSkills.length > 0}
          <div
            class="flex flex-wrap items-center gap-1.5 no-js:hidden"
            role="group"
            aria-label="Filter by skill"
          >
            <button
              type="button"
              onclick={() => (activeSkill = null)}
              aria-pressed={activeSkill === null}
              class="rounded-md border px-2.5 py-1 text-sm font-medium transition-colors {filterClass(
                activeSkill === null,
              )}"
            >
              All
            </button>
            {#each filterSkills as { skill, count } (skill)}
              <button
                type="button"
                onclick={() => toggleSkill(skill)}
                aria-pressed={activeSkill === skill}
                class="rounded-md border px-2.5 py-1 text-sm font-medium transition-colors {filterClass(
                  activeSkill === skill,
                )}"
              >
                {skill} <span class="tabular-nums opacity-60">{count}</span>
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <ul class="grid gap-4 md:grid-cols-2">
        {#each profile.repos as repo (repo.url)}
          <li class="transition-opacity duration-200 {isDimmed(repo) ? 'opacity-35' : ''}">
            <a
              href={repo.url}
              class="group panel flex h-full flex-col p-5 transition-colors hover:border-accent sm:p-6"
            >
              <div class="flex items-start justify-between gap-3">
                <h3 class="text-xl font-semibold tracking-tight break-all">{repo.name}</h3>
                <ArrowUpRightIcon
                  class="mt-1 h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent"
                />
              </div>

              <p class="mt-2 mb-4 line-clamp-2 text-muted">
                {repo.description || "No description yet."}
              </p>

              {#if repoTags(repo).length > 0}
                <div class="mb-4 flex flex-wrap gap-1.5">
                  {#each repoTags(repo).slice(0, 4) as tag (tag)}
                    <span class="chip">{tag}</span>
                  {/each}
                  {#if repoTags(repo).length > 4}
                    <span class="self-center text-sm text-faint">
                      +{repoTags(repo).length - 4}
                    </span>
                  {/if}
                </div>
              {/if}

              <div class="mt-auto flex items-center gap-4 text-sm text-muted">
                {#if repo.primaryLanguage}
                  <span class="flex items-center gap-1.5">
                    <span
                      class="h-2.5 w-2.5 rounded-[2px]"
                      style="background-color: {repo.primaryLanguage.color};"
                    ></span>
                    {repo.primaryLanguage.name}
                  </span>
                {/if}
                {#if repo.stargazerCount > 0}
                  <span class="flex items-center gap-1" title="Stars">
                    <StarIcon class="h-3.5 w-3.5" />
                    <span class="sr-only">Stars:</span>
                    {repo.stargazerCount.toLocaleString()}
                  </span>
                {/if}
                {#if repo.forkCount > 0}
                  <span class="flex items-center gap-1" title="Forks">
                    <ForkIcon class="h-3.5 w-3.5" />
                    <span class="sr-only">Forks:</span>
                    {repo.forkCount.toLocaleString()}
                  </span>
                {/if}
              </div>
            </a>
          </li>
        {/each}
      </ul>
    </section>
  {:else}
    <div class="panel p-8">
      <p class="text-lg">Repositories couldn't be loaded from GitHub right now.</p>
      <a href={links.github} class="link mt-3 inline-block">View them on GitHub</a>
    </div>
  {/if}

  {#if hasStats || hasHeatmap}
    <section class="border-t border-line pt-10" aria-labelledby="activity">
      <div class="mb-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <h2 id="activity" class="text-2xl font-semibold tracking-tight">Activity</h2>
        {#if hasStats}
          <dl class="flex flex-wrap gap-x-5 gap-y-1 text-muted">
            {#each stats as stat (stat.label)}
              <div class="flex items-baseline gap-1.5">
                <dt class="order-2">{stat.label}</dt>
                <dd class="order-1 font-semibold text-ink tabular-nums">
                  {stat.value.toLocaleString()}
                </dd>
              </div>
            {/each}
          </dl>
        {/if}
      </div>
      {#if hasHeatmap}
        <ContributionHeatmap calendar={profile.contributions} />
      {/if}
    </section>
  {/if}

  <div class="grid gap-14 border-t border-line pt-10 md:grid-cols-2 md:gap-12 lg:gap-16">
    <section aria-labelledby="languages">
      <h2 id="languages" class="text-2xl font-semibold tracking-tight">Languages</h2>
      {#if hasLanguageData}
        <p class="mt-2 mb-6 max-w-[48ch] text-muted">
          Ranked by public commits over the last year (70%) and overall repository history (30%).
        </p>
        <LanguageFrecency languages={profile.languages} />
      {:else}
        <p class="mt-2 mb-6 max-w-[48ch] text-muted">
          Roughly where my time goes across distributed systems, infrastructure, backend, and
          machine learning.
        </p>
        <SkillsRadar data={skillDomains} label="Radar chart of focus across engineering domains" />
      {/if}
    </section>

    <section aria-labelledby="toolbox">
      <h2 id="toolbox" class="text-2xl font-semibold tracking-tight">Toolbox</h2>
      <div class="mt-6 space-y-6">
        {#each skillCategories as category (category.name)}
          <div>
            <h3 class="label">{category.name}</h3>
            <ul class="mt-2.5 flex flex-wrap gap-1.5">
              {#each category.skills as skill (skill)}
                <li class="chip text-ink">{skill}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </section>
  </div>
</div>
