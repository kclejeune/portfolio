<script lang="ts">
  import Card from "$lib/components/Card.svelte";
  import Page from "$lib/components/Page.svelte";
  import { jobs, formatDateRange } from "$lib/data/jobs";
  import { neutralBackground } from "$lib/utils/constants";

  interface Props {
    backgroundClass?: string;
  }

  let { backgroundClass = neutralBackground }: Props = $props();
</script>

<Page id="work" title="Experience" {backgroundClass}>
  <div
    class="container mx-auto grid max-w-screen-xl gap-4 md:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-4"
  >
    {#each jobs as job}
      <Card
        title={job.employer}
        subtitle={`${job.title}, ${formatDateRange(job.startDate, job.endDate)}`}
        tags={job.tags}
      >
        {#if job.description}
          <div class="mb-1">
            {job.description}
          </div>
        {/if}
        <ul class="list-disc list-inside">
          {#each job.tasks as task}
            <li>{task}</li>
          {/each}
        </ul>
      </Card>
    {/each}
  </div>
</Page>
