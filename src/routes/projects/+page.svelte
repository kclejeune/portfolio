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
  const hasStats = $derived(profile.stats.publicRepos > 0 || profile.contributions.total > 0);
  const hasHeatmap = $derived(profile.contributions.weeks.length > 0);

  // --- Language trajectory, from recent commits + long-term repository breadth ---
  const hasLanguageData = $derived(profile.languages.filter((l) => l.name !== "Other").length >= 3);

  const stats = $derived([
    { value: profile.stats.totalStars, label: "Stars earned" },
    { value: profile.stats.publicRepos, label: "Public repositories" },
    { value: profile.stats.followers, label: "Followers" },
    { value: profile.contributions.total, label: "Contributions this year" },
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
  title="Projects &amp; Skills | {siteConfig.name}"
  description="Projects, open source work, and technical skills of {siteConfig.name} — with each skill traced to the repositories that use it."
  canonical={siteConfig.routes.projects.canonicalUrl}
/>

<PageHeader title="Projects">
  Things I've built, mostly in the open. Everything here is pulled live from
  <a href={links.github} class="link">my GitHub</a>.
</PageHeader>

<div class="container-page">
  {#if hasStats}
    <dl class="mb-16 grid grid-cols-2 gap-y-6 border-y border-line py-6 lg:grid-cols-4">
      {#each stats as stat (stat.label)}
        <div class="flex flex-col-reverse">
          <dt class="mt-1 text-sm text-muted">{stat.label}</dt>
          <dd class="display text-4xl tabular-nums sm:text-5xl">{stat.value.toLocaleString()}</dd>
        </div>
      {/each}
    </dl>
  {/if}

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
      <p class="text-lg">GitHub didn't respond, so repositories can't be shown right now.</p>
      <a href={links.github} class="link mt-3 inline-block">Browse them on GitHub instead</a>
    </div>
  {/if}

  <section
    class="mt-20 grid gap-10 border-t border-line pt-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-14"
    aria-labelledby="languages"
  >
    {#if hasLanguageData}
      <div>
        <h2 id="languages" class="text-2xl font-semibold tracking-tight">What I reach for now</h2>
        <p class="mt-3 max-w-[44ch] leading-relaxed text-muted">
          Languages ranked by my public commits over the last year (70% of the weight), with my
          longer project history keeping a vote (30%).
        </p>
      </div>
      <LanguageFrecency languages={profile.languages} />
    {:else}
      <div>
        <h2 id="languages" class="text-2xl font-semibold tracking-tight">Where I spend my time</h2>
        <p class="mt-3 max-w-[44ch] leading-relaxed text-muted">
          A rough map of my focus across distributed systems, infrastructure, backend, and applied
          machine learning.
        </p>
      </div>
      <SkillsRadar data={skillDomains} label="Radar chart of focus across engineering domains" />
    {/if}
  </section>

  <section class="mt-20 border-t border-line pt-10" aria-labelledby="toolbox">
    <h2 id="toolbox" class="text-2xl font-semibold tracking-tight">Toolbox</h2>
    <div class="mt-6 grid gap-8 sm:grid-cols-3">
      {#each skillCategories as category (category.name)}
        <div>
          <h3 class="label">{category.name}</h3>
          <ul class="mt-3 flex flex-wrap gap-1.5">
            {#each category.skills as skill (skill)}
              <li class="chip text-ink">{skill}</li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </section>

  {#if hasHeatmap}
    <section class="mt-20 border-t border-line pt-10" aria-labelledby="activity">
      <h2 id="activity" class="mb-6 text-2xl font-semibold tracking-tight">The last year</h2>
      <ContributionHeatmap calendar={profile.contributions} />
    </section>
  {/if}
</div>
