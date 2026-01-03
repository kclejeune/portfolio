<script lang="ts">
  import { jobs, formatDateRange } from "$lib/data/jobs";
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
    <div class="text-center mb-6 md:mb-10">
      <h1
        class="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white"
      >
        Work Experience
      </h1>
    </div>

    <!-- Timeline -->
    <div class="max-w-3xl mx-auto">
      <div class="relative">
        <!-- Timeline line (hidden on mobile) -->
        <div
          class="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"
        ></div>

        {#each jobs as job, index}
          <div class="relative mb-6 md:mb-8 last:mb-0">
            <!-- Timeline dot (hidden on mobile) -->
            <div
              class="hidden md:block absolute left-1/2 -translate-x-1/2 mt-1.5"
            >
              <div
                class="w-3 h-3 rounded-full bg-primary-500 ring-4 ring-slate-100 dark:ring-slate-900"
              ></div>
            </div>

            <!-- Content card -->
            <div
              class="md:w-[calc(50%-1.5rem)] {index % 2 === 0
                ? 'md:mr-auto md:pr-0'
                : 'md:ml-auto md:pl-0'}"
            >
              <div class="card card-hover p-5">
                <!-- Header -->
                <div class="mb-3">
                  <h3
                    class="text-lg font-semibold text-slate-900 dark:text-white"
                  >
                    {job.employer}
                  </h3>
                  <p
                    class="text-primary-600 dark:text-primary-400 text-base font-medium"
                  >
                    {job.title}
                  </p>
                  <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
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
                        class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"
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
          </div>
        {/each}
      </div>
    </div>

    <!-- CTA -->
    <div class="mt-10 text-center">
      <a
        href="https://assets.kclj.io/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        class="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors"
      >
        Download Resume
      </a>
    </div>
  </div>
</div>
