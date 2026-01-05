<script lang="ts">
  import PageNav from "$lib/components/PageNav.svelte";
  import { ExternalLinkIcon } from "$lib/components/icons";
  import { siteConfig } from "$lib/config.svelte";
  import SEO from "svelte-seo";

  const skillCategories = [
    {
      name: "Machine Learning & AI",
      icon: "brain",
      skills: ["Python", "Scikit-Learn", "Tensorflow", "Keras"],
    },
    {
      name: "Frontend Development",
      icon: "code",
      skills: ["TypeScript", "Javascript", "Angular", "Vue", "Svelte"],
    },
    {
      name: "Backend & Systems",
      icon: "server",
      skills: ["Java", "Kotlin", "NixOS"],
    },
  ];
</script>

<SEO
  title="{siteConfig.routes.skills.title} | {siteConfig.name}"
  description="Technical skills and expertise of {siteConfig.name} - machine learning, frontend development, backend systems, and infrastructure."
  canonical={siteConfig.routes.skills.canonicalUrl}
/>

<div class="page-content">
  <div class="section-container">
    <!-- Header -->
    <div class="mb-6 md:mb-10">
      <PageNav>
        <h1
          class="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white"
        >
          Skills & Technologies
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
          href="https://github.com/kclejeune"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          GitHub
          <ExternalLinkIcon />
        </a>
      </p>
    </div>

    <!-- Skills by Category -->
    <div class="space-y-6">
      {#each skillCategories as category}
        <div class="card card-hover p-6">
          <div class="flex items-center gap-3 mb-4">
            {#if category.icon === "brain"}
              <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/50">
                <svg
                  class="w-5 h-5 text-primary-600 dark:text-primary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                  />
                </svg>
              </div>
            {:else if category.icon === "code"}
              <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/50">
                <svg
                  class="w-5 h-5 text-primary-600 dark:text-primary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                  />
                </svg>
              </div>
            {:else}
              <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/50">
                <svg
                  class="w-5 h-5 text-primary-600 dark:text-primary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"
                  />
                </svg>
              </div>
            {/if}
            <h2 class="text-base font-semibold text-slate-900 dark:text-white">
              {category.name}
            </h2>
          </div>

          <div class="flex flex-wrap gap-2">
            {#each category.skills as skill}
              <span
                class="px-3 py-1.5 text-sm font-medium rounded-full bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-200"
              >
                {skill}
              </span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
