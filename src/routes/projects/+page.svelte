<script lang="ts">
  import type { Repository } from "$lib/utils/index";
  import PageNav from "$lib/components/PageNav.svelte";
  import SEO from "svelte-seo";
  import { siteConfig } from "$lib/config.svelte";

  interface PageData {
    repos: Repository[];
  }

  let { data }: { data: PageData } = $props();

  const username = "kclejeune";
  const githubUrl = `https://github.com/${username}`;

  function titleCase(str: string): string {
    if (str.includes(username)) {
      return str;
    }
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1);
    });
  }

  function getRepoTags(repo: Repository): string[] {
    const tags = Array.from(
      new Set<string>(
        repo.repositoryTopics
          .concat(repo.languages)
          .filter((e) => e)
          .map((e) => e.toLowerCase().trim())
      )
    );
    return tags.sort();
  }

  function getRepoStats(repo: Repository) {
    const arr = [];
    if (repo.stargazerCount > 0) {
      arr.push({ icon: "star", count: repo.stargazerCount });
    }
    if (repo.forkCount > 0) {
      arr.push({ icon: "fork", count: repo.forkCount });
    }
    return arr;
  }
</script>

<SEO
  title="{siteConfig.routes.projects.title} | {siteConfig.name}"
  description="Open source projects and repositories by {siteConfig.name}."
  canonical={siteConfig.routes.projects.canonicalUrl}
/>

<div class="page-content">
  <div class="section-container">
    <!-- Header -->
    <div class="mb-6 md:mb-10">
      <PageNav>
        <h1
          class="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white"
        >
          Projects
        </h1>
      </PageNav>
    </div>

    <!-- Projects Grid -->
    {#if data.repos && data.repos.length > 0}
      <div class="grid gap-4 sm:gap-6 md:grid-cols-2">
        {#each data.repos as repo}
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            class="group card card-hover p-5 block"
          >
            <!-- Header -->
            <div class="flex items-start justify-between mb-2">
              <h3
                class="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
              >
                {titleCase(repo.name.replace(/-/g, " "))}
              </h3>
              <svg
                class="w-4 h-4 text-slate-400 group-hover:text-primary-500 transition-colors flex-shrink-0 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <!-- Stats -->
            {#if getRepoStats(repo).length > 0}
              <div class="flex items-center gap-3 mb-2">
                {#each getRepoStats(repo) as stat}
                  <div
                    class="flex items-center gap-1 text-xs text-primary-400 dark:text-primary-400"
                  >
                    {#if stat.icon === "star"}
                      <svg
                        class="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    {:else}
                      <svg
                        class="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"
                        />
                      </svg>
                    {/if}
                    <span>{stat.count}</span>
                  </div>
                {/each}
              </div>
            {/if}

            <!-- Description -->
            <p
              class="text-base text-slate-600 dark:text-slate-300 mb-3 line-clamp-2"
            >
              {repo.description || "No description available"}
            </p>

            <!-- Tags -->
            {#if getRepoTags(repo).length > 0}
              <div class="flex flex-wrap gap-1.5">
                {#each getRepoTags(repo).slice(0, 4) as tag}
                  <span class="tag text-xs">{tag}</span>
                {/each}
                {#if getRepoTags(repo).length > 4}
                  <span class="text-xs text-slate-400">
                    +{getRepoTags(repo).length - 4}
                  </span>
                {/if}
              </div>
            {/if}
          </a>
        {/each}
      </div>
    {:else}
      <div class="card p-8 text-center">
        <p class="text-slate-600 dark:text-slate-400 mb-4">
          Check out my projects on GitHub
        </p>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors inline-block"
        >
          View on GitHub
        </a>
      </div>
    {/if}
  </div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
