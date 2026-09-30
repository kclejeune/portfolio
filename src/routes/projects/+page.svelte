<script lang="ts">
  import type { Repository } from "$lib/github";
  import type { PageProps } from "./$types";
  import PageHeader from "$lib/components/PageHeader.svelte";
  import ContributionHeatmap from "$lib/components/ContributionHeatmap.svelte";
  import SkillsRadar from "$lib/components/SkillsRadar.svelte";
  import LanguageFrecency from "$lib/components/LanguageFrecency.svelte";
  import { skillCategories, skillDomains, skillTerms, skills } from "$lib/data/skills";
  import { ArrowUpRightIcon, StarIcon, ForkIcon } from "$lib/components/icons";
  import { links } from "$lib/config";

  let { data }: PageProps = $props();

  const profile = $derived(data.profile);
  const hasStats = $derived(profile.stats.publicRepos > 0);
  const hasHeatmap = $derived(profile.contributions.weeks.length > 0);
  const hasLanguageData = $derived(profile.languages.filter((l) => l.name !== "Other").length >= 3);

  // Shown beside the contribution graph, which reports its own total.
  const stats = $derived([
    { value: profile.stats.totalStars, label: "stars" },
    { value: profile.stats.publicRepos, label: "public repositories" },
    { value: profile.stats.followers, label: "followers" },
  ]);

  function repoTerms(repo: Repository): Set<string> {
    return new Set([...repo.languages, ...repo.repositoryTopics].map((t) => t.toLowerCase()));
  }

  // Pinned repo URLs per skill, for skills that match at least one.
  const reposBySkill = $derived.by(() => {
    const terms = profile.repos.map((repo) => ({ url: repo.url, terms: repoTerms(repo) }));
    return new Map(
      skills.flatMap((skill) => {
        const wanted = skillTerms(skill);
        const urls = terms.filter((r) => wanted.some((t) => r.terms.has(t))).map((r) => r.url);
        return urls.length > 0 ? [[skill, new Set(urls)] as const] : [];
      }),
    );
  });

  let activeSkill = $state<string | null>(null);
  const highlighted = $derived(activeSkill ? reposBySkill.get(activeSkill) : undefined);

  // Topics only; the primary language gets its own color dot.
  function repoTags(repo: Repository): string[] {
    return [...new Set(repo.repositoryTopics.map((t) => t.toLowerCase().trim()))].sort();
  }
</script>

<PageHeader title="Projects">
  Open source work, pulled from <a href={links.github} class="link">my GitHub</a>.
</PageHeader>

<!-- Repositories beside a sidebar on desktop; stacked below. -->
<div
  class="container-page grid gap-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-14"
>
  <div class="min-w-0">
    {#if profile.repos.length > 0}
      <section aria-labelledby="repos">
        <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h2 id="repos" class="text-2xl font-semibold tracking-tight">Pinned repositories</h2>
          {#if reposBySkill.size > 0}
            <div
              class="flex flex-wrap items-center gap-1.5 no-js:hidden"
              role="group"
              aria-label="Filter by skill"
            >
              <button
                type="button"
                onclick={() => (activeSkill = null)}
                aria-pressed={activeSkill === null}
                class="toggle"
              >
                All
              </button>
              {#each reposBySkill as [skill, urls] (skill)}
                <button
                  type="button"
                  onclick={() => (activeSkill = activeSkill === skill ? null : skill)}
                  aria-pressed={activeSkill === skill}
                  class="toggle"
                >
                  {skill} <span class="tabular-nums opacity-60">{urls.size}</span>
                </button>
              {/each}
            </div>
          {/if}
        </div>

        <ul class="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          {#each profile.repos as repo (repo.url)}
            {@const tags = repoTags(repo)}
            <li
              class="transition-opacity duration-200 {highlighted && !highlighted.has(repo.url)
                ? 'opacity-35'
                : ''}"
            >
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

                {#if tags.length > 0}
                  <div class="mb-4 flex flex-wrap gap-1.5">
                    {#each tags.slice(0, 4) as tag (tag)}
                      <span class="chip">{tag}</span>
                    {/each}
                    {#if tags.length > 4}
                      <span class="self-center text-sm text-faint">
                        +{tags.length - 4}
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
  </div>

  <aside
    class="grid content-start gap-10 border-t border-line pt-10 md:grid-cols-2 md:gap-x-12 lg:grid-cols-1 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10 xl:pl-14"
    aria-label="Activity, languages, and tools"
  >
    {#if hasStats || hasHeatmap}
      <section class="md:col-span-2 lg:col-span-1" aria-labelledby="activity">
        <h2 id="activity" class="text-lg font-semibold tracking-tight">Activity</h2>
        {#if hasStats}
          <dl class="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-sm text-muted">
            {#each stats as stat (stat.label)}
              <div class="flex items-baseline gap-1">
                <dt class="order-2">{stat.label}</dt>
                <dd class="order-1 font-semibold text-ink tabular-nums">
                  {stat.value.toLocaleString()}
                </dd>
              </div>
            {/each}
          </dl>
        {/if}
        {#if hasHeatmap}
          <div class="mt-5">
            <ContributionHeatmap calendar={profile.contributions} />
          </div>
        {/if}
      </section>
    {/if}

    <section aria-labelledby="languages">
      <h2 id="languages" class="text-lg font-semibold tracking-tight">Languages</h2>
      {#if hasLanguageData}
        <p class="mt-1 mb-5 text-sm text-muted">
          Weighted 70% by the last year of public commits, 30% by overall repository history.
        </p>
        <LanguageFrecency languages={profile.languages} />
      {:else}
        <p class="mt-1 mb-5 text-sm text-muted">
          Roughly where my time goes across distributed systems, infrastructure, backend, and
          machine learning.
        </p>
        <SkillsRadar data={skillDomains} label="Radar chart of focus across engineering domains" />
      {/if}
    </section>

    <section aria-labelledby="toolbox">
      <h2 id="toolbox" class="text-lg font-semibold tracking-tight">Toolbox</h2>
      <div class="mt-4 space-y-5">
        {#each skillCategories as category (category.name)}
          <div>
            <h3 class="text-sm text-muted">{category.name}</h3>
            <ul class="mt-2 flex flex-wrap gap-1.5">
              {#each category.skills as skill (skill)}
                <li class="chip text-ink">{skill}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </section>
  </aside>
</div>
