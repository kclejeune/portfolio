<script lang="ts">
  import Card from "$lib/components/Card.svelte";
  import Link from "$lib/components/Link.svelte";
  import Page from "$lib/components/Page.svelte";
  import type { Repository } from "$lib/utils";
  import { primaryBackground } from "$lib/utils/constants";

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
      arr.push(`Stars: ${repo.stargazerCount}`);
    }
    if (repo.forkCount > 0) {
      arr.push(`Forks: ${repo.forkCount}`);
    }
    return arr.join(", ");
  }

  interface Props {
    username?: string;
    repos: Repository[];
    backgroundClass?: string;
  }

  let {
    username = "kclejeune",
    repos,
    backgroundClass = primaryBackground,
  }: Props = $props();

  const githubUrl = `https://github.com/${username}`;
</script>

<Page id="projects" title="Projects" {backgroundClass}>
  {#if repos.length > 0}
    <div
      class="container mx-auto grid max-w-screen-xl gap-4 md:grid-cols-1 lg:grid-cols-2"
    >
      {#each repos as repo}
        <Card
          title={titleCase(repo.name.replace(/-/g, " "))}
          url={repo.url}
          tags={getRepoTags(repo)}
        >
          <span>
            {getRepoStats(repo)}
          </span>
          <div>
            {repo.description}
          </div>
        </Card>
      {/each}
    </div>
  {:else}
    <div class="container mx-auto max-w-screen-xl text-center py-8">
      <p class="text-lg">
        Check out my projects on <Link url={githubUrl}>GitHub</Link>
      </p>
    </div>
  {/if}
</Page>
