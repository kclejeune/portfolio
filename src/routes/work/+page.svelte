<script lang="ts">
  import { jobs, formatMonthYear, formatDuration } from "$lib/data/jobs";
  import PageHeader from "$lib/components/PageHeader.svelte";
  import { links, siteConfig } from "$lib/config";
</script>

<PageHeader title={siteConfig.routes.work.title}>
  More detail is on my
  <a href={links.resume} class="link">resume</a> and
  <a href={links.linkedin} class="link">LinkedIn</a>.
</PageHeader>

<ol class="container-page">
  {#each jobs as job (job.employer)}
    <li
      class="grid gap-4 border-t border-line py-10 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10 md:py-12"
    >
      <div>
        <p class="display text-4xl tabular-nums {job.endDate ? '' : 'text-accent'}">
          {job.startDate.getFullYear()}–{job.endDate?.getFullYear() ?? "now"}
        </p>
        <p class="mt-2 text-sm text-muted">
          {formatMonthYear(job.startDate)} to {job.endDate
            ? formatMonthYear(job.endDate)
            : "present"}
          <br />
          {formatDuration(job.startDate, job.endDate)}
        </p>
      </div>

      <div class="max-w-[62ch]">
        <h2 class="text-2xl leading-tight font-semibold tracking-tight">
          {#if job.employerUrl}
            <a href={job.employerUrl} class="hover:underline hover:decoration-accent">
              {job.employer}
            </a>
          {:else}
            {job.employer}
          {/if}
        </h2>
        <p class="mt-1 text-lg text-muted">
          {job.title}{job.location ? `, ${job.location}` : ""}
        </p>

        <ul class="mt-5 space-y-2.5 text-lg leading-relaxed">
          {#each job.tasks as task (task)}
            <li class="flex gap-3.5">
              <span
                class="mt-[0.6em] h-2 w-2 shrink-0 rounded-[2px] bg-accent-sticker"
                aria-hidden="true"
              ></span>
              <span>{task}</span>
            </li>
          {/each}
        </ul>

        {#if job.tags && job.tags.length > 0}
          <ul class="mt-6 flex flex-wrap gap-1.5" aria-label="Tools">
            {#each job.tags as tag (tag)}
              <li class="chip">{tag}</li>
            {/each}
          </ul>
        {/if}
      </div>
    </li>
  {/each}
</ol>
