<script lang="ts">
  import { jobs, formatDateRange, isCurrentJob } from "$lib/data/jobs";
  import PageNav from "$lib/components/PageNav.svelte";
  import { ExternalLinkIcon } from "$lib/components/icons";
  import SEO from "svelte-seo";
  import { siteConfig } from "$lib/config.svelte";
</script>

<SEO
  title="{siteConfig.routes.work.title} | {siteConfig.name}"
  description="Professional experience of {siteConfig.name} - software engineering roles at Anduril Industries and JHU APL."
  canonical={siteConfig.routes.work.canonicalUrl}
/>

<div class="page-content">
  <div class="section-container">
    <!-- Header -->
    <div class="mb-6 md:mb-10">
      <PageNav>
        <h1
          class="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white"
        >
          Work Experience
        </h1>
      </PageNav>
      <p
        class="mt-2 text-slate-600 dark:text-slate-400 text-center flex items-center justify-center gap-4"
      >
        <a
          href="https://linkedin.com/in/kclejeune"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          LinkedIn
          <ExternalLinkIcon />
        </a>
        <span class="text-slate-300 dark:text-slate-600">|</span>
        <a
          href="https://assets.kclj.io/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          Resume
          <ExternalLinkIcon />
        </a>
      </p>
    </div>

    <!-- Timeline -->
    <div>
      <div class="relative">
        <!-- Timeline line (hidden on mobile) -->
        <div
          class="hidden md:block absolute right-[82px] translate-x-px top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"
        ></div>

        {#each jobs as job}
          <div class="relative md:flex md:items-center mb-4 sm:mb-6 last:mb-0">
            <!-- Content card -->
            <div class="md:mr-[100px] flex-1">
              <div class="card card-hover p-5">
                <!-- Header -->
                <div class="mb-3">
                  <h3
                    class="text-lg font-semibold text-slate-900 dark:text-white"
                  >
                    {job.employer}
                  </h3>
                  <p
                    class="text-primary-500 dark:text-primary-400 text-base font-medium"
                  >
                    {job.title}
                  </p>
                  <!-- Date range shown on mobile only -->
                  <p
                    class="md:hidden text-sm text-slate-500 dark:text-slate-400 mt-1"
                  >
                    {formatDateRange(job.startDate, job.endDate)}
                  </p>
                </div>

                <!-- Tasks -->
                <ul
                  class="space-y-1.5 text-base text-slate-600 dark:text-slate-300"
                >
                  {#each job.tasks as task}
                    <li class="flex items-start gap-2">
                      <span
                        class="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0"
                      ></span>
                      <span>{task}</span>
                    </li>
                  {/each}
                </ul>

                <!-- Tags -->
                {#if job.tags && job.tags.length > 0}
                  <div class="flex flex-wrap gap-1.5 mt-3">
                    {#each job.tags as tag}
                      <span class="tag">{tag}</span>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>

            <!-- Timeline dot (hidden on mobile) -->
            <div class="hidden md:block absolute right-[82px] translate-x-1/2">
              <div
                class="w-3 h-3 rounded-full ring-4 ring-slate-100 dark:ring-slate-900 {isCurrentJob(
                  job
                )
                  ? 'bg-primary-400'
                  : 'bg-slate-100 dark:bg-slate-900 border-2 border-primary-400'}"
              ></div>
            </div>

            <!-- Date label (hidden on mobile) -->
            <div
              class="hidden md:flex absolute right-0 w-[75px] justify-start pl-2"
            >
              <span
                class="text-xs font-medium text-slate-500 dark:text-slate-400 text-left leading-tight"
              >
                {job.startDate.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
                –
                {job.endDate.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
