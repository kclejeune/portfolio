<script lang="ts">
  import { jobs, formatMonthYear, formatDuration, isCurrentJob } from "$lib/data/jobs";
  import PageHeader from "$lib/components/PageHeader.svelte";
  import SocialLinks from "$lib/components/SocialLinks.svelte";
  import { ChevronDownIcon, ExternalLinkIcon } from "$lib/components/icons";
  import SEO from "svelte-seo";
  import { slide } from "svelte/transition";
  import { SvelteSet } from "svelte/reactivity";
  import { siteConfig } from "$lib/config.svelte";

  // Expanded roles — the current role starts open.
  const open = new SvelteSet(jobs.filter(isCurrentJob).map((j) => j.employer));

  function toggle(employer: string) {
    if (open.has(employer)) open.delete(employer);
    else open.add(employer);
  }
</script>

<SEO
  title="{siteConfig.routes.work.title} | {siteConfig.name}"
  description="Professional experience of {siteConfig.name} — software engineering roles at Anduril Industries and JHU APL."
  canonical={siteConfig.routes.work.canonicalUrl}
/>

<div class="page-content">
  <div class="section-container">
    <PageHeader eyebrow="Where I've worked" title="Work Experience">
      <SocialLinks
        links={[
          { label: "LinkedIn", href: "https://linkedin.com/in/kclejeune" },
          { label: "Resume", href: "https://assets.kclj.io/resume.pdf" },
        ]}
      />
    </PageHeader>

    <ol class="relative ml-1 space-y-5 border-l border-slate-200 pl-4 dark:border-slate-800">
      {#each jobs as job (job.employer)}
        {@const isOpen = open.has(job.employer)}
        {@const current = isCurrentJob(job)}
        <li class="relative">
          <!-- Timeline node, centered on the rail (pl-4 + half node + half border) -->
          <span
            class="absolute top-5 -left-[23px] flex h-3.5 w-3.5 items-center justify-center rounded-full ring-4 ring-slate-50 dark:ring-slate-950 {current
              ? 'bg-primary-500'
              : 'border-2 border-primary-400 bg-slate-50 dark:bg-slate-950'}"
          >
            {#if current}
              <span class="absolute h-3.5 w-3.5 animate-ping rounded-full bg-primary-500/60"></span>
            {/if}
          </span>

          <div class="card card-hover overflow-hidden">
            <button
              type="button"
              onclick={() => toggle(job.employer)}
              class="flex w-full items-start justify-between gap-3 p-5 text-left"
              aria-expanded={isOpen}
            >
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
                    {job.employer}
                  </h3>
                  {#if current}
                    <span
                      class="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-500/15 dark:text-primary-300"
                    >
                      Current
                    </span>
                  {/if}
                </div>
                <p class="text-base font-medium text-primary-600 dark:text-primary-400">
                  {job.title}
                </p>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {formatMonthYear(job.startDate)} – {current
                    ? "Present"
                    : formatMonthYear(job.endDate)}
                  <span class="text-slate-300 dark:text-slate-600">·</span>
                  {formatDuration(job.startDate, job.endDate)}
                  {#if job.location}
                    <span class="text-slate-300 dark:text-slate-600">·</span>
                    {job.location}
                  {/if}
                </p>
              </div>

              <ChevronDownIcon
                class="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 {isOpen
                  ? 'rotate-180'
                  : ''}"
              />
            </button>

            {#if isOpen}
              <div transition:slide={{ duration: 200 }}>
                <div class="border-t border-slate-100 px-5 pt-4 pb-5 dark:border-slate-800">
                  <ul class="space-y-2 text-base text-slate-600 dark:text-slate-300">
                    {#each job.tasks as task (task)}
                      <li class="flex items-start gap-2.5">
                        <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400"></span>
                        <span>{task}</span>
                      </li>
                    {/each}
                  </ul>

                  {#if job.tags && job.tags.length > 0}
                    <div class="mt-4 flex flex-wrap gap-1.5">
                      {#each job.tags as tag (tag)}
                        <span class="tag">{tag}</span>
                      {/each}
                    </div>
                  {/if}

                  {#if job.employerUrl}
                    <a
                      href={job.employerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="mt-4 inline-flex items-center gap-1 text-sm text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      Visit {job.employer}
                      <ExternalLinkIcon class="h-3.5 w-3.5" />
                    </a>
                  {/if}
                </div>
              </div>
            {/if}
          </div>
        </li>
      {/each}
    </ol>
  </div>
</div>
