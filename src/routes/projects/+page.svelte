<script lang="ts">
  import type { GithubProfile, Repository } from "$lib/utils";
  import PageHeader from "$lib/components/PageHeader.svelte";
  import SocialLinks from "$lib/components/SocialLinks.svelte";
  import Stat from "$lib/components/Stat.svelte";
  import ContributionHeatmap from "$lib/components/ContributionHeatmap.svelte";
  import { ArrowUpRightIcon, StarIcon, ForkIcon, RepoIcon, UsersIcon } from "$lib/components/icons";
  import SEO from "svelte-seo";
  import { siteConfig } from "$lib/config.svelte";

  let { data }: { data: { profile: GithubProfile } } = $props();

  const username = "kclejeune";
  const githubUrl = `https://github.com/${username}`;

  const profile = $derived(data.profile);
  const hasStats = $derived(profile.stats.publicRepos > 0 || profile.contributions.total > 0);
  const hasHeatmap = $derived(profile.contributions.weeks.length > 0);

  function titleCase(str: string): string {
    if (str.includes(username)) return str;
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1));
  }

  function repoTags(repo: Repository): string[] {
    return Array.from(
      new Set<string>(
        repo.repositoryTopics
          .concat(repo.languages)
          .filter(Boolean)
          .map((e) => e.toLowerCase().trim()),
      ),
    ).sort();
  }
</script>

<SEO
  title="{siteConfig.routes.projects.title} | {siteConfig.name}"
  description="Open source projects and repositories by {siteConfig.name}."
  canonical={siteConfig.routes.projects.canonicalUrl}
/>

<div class="page-content">
  <div class="section-container">
    <PageHeader eyebrow="Things I've built" title="Projects">
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

    {#if hasHeatmap}
      <div class="card mb-6 p-5 md:p-6">
        <h2 class="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
          Contribution activity
        </h2>
        <ContributionHeatmap calendar={profile.contributions} />
      </div>
    {/if}

    {#if profile.repos.length > 0}
      <h2
        class="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400"
      >
        Featured repositories
      </h2>
      <div class="grid gap-4 sm:gap-5 md:grid-cols-2">
        {#each profile.repos as repo (repo.url)}
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            class="group card card-hover block p-5"
          >
            <div class="mb-2 flex items-start justify-between gap-2">
              <h3
                class="text-lg font-semibold text-slate-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400"
              >
                {titleCase(repo.name.replace(/-/g, " "))}
              </h3>
              <ArrowUpRightIcon
                class="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-500"
              />
            </div>

            {#if repo.stargazerCount > 0 || repo.forkCount > 0}
              <div class="mb-2 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                {#if repo.stargazerCount > 0}
                  <span class="flex items-center gap-1">
                    <StarIcon class="h-3.5 w-3.5 text-accent-400" />
                    {repo.stargazerCount}
                  </span>
                {/if}
                {#if repo.forkCount > 0}
                  <span class="flex items-center gap-1">
                    <ForkIcon class="h-3.5 w-3.5" />
                    {repo.forkCount}
                  </span>
                {/if}
              </div>
            {/if}

            <p class="mb-3 line-clamp-2 text-base text-slate-600 dark:text-slate-300">
              {repo.description || "No description available"}
            </p>

            {#if repoTags(repo).length > 0}
              <div class="flex flex-wrap gap-1.5">
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
          </a>
        {/each}
      </div>
    {:else}
      <div class="card p-8 text-center">
        <p class="mb-4 text-slate-600 dark:text-slate-400">Check out my projects on GitHub</p>
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" class="btn">
          View on GitHub
        </a>
      </div>
    {/if}
  </div>
</div>
