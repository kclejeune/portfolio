<script lang="ts">
  import Link from "$lib/components/Link.svelte";
  import PageHeader from "$lib/components/PageHeader.svelte";
  import SocialLinks from "$lib/components/SocialLinks.svelte";
  import { jobs, isCurrentJob } from "$lib/data/jobs";
  import SEO from "svelte-seo";
  import { siteConfig } from "$lib/config.svelte";

  const current = jobs.find(isCurrentJob) ?? jobs[0];

  const focusAreas = [
    "Distributed Systems",
    "Infrastructure",
    "Mesh Networking",
    "Robotics & Autonomy",
  ];

  const interests = ["Cycling", "Skiing", "Open Source", "NixOS"];
</script>

<SEO
  title="{siteConfig.routes.about.title} | {siteConfig.name}"
  description="About {siteConfig.name} — a software engineer focused on distributed systems, infrastructure, and robotics software at Anduril Industries."
  canonical={siteConfig.routes.about.canonicalUrl}
/>

<div class="page-content">
  <div class="section-container">
    <PageHeader eyebrow="Get to know me" title="About Me">
      <SocialLinks
        links={[
          { label: "LinkedIn", href: "https://linkedin.com/in/kclejeune" },
          { label: "GitHub", href: "https://github.com/kclejeune" },
        ]}
      />
    </PageHeader>

    <!-- Lead: current role, front and center -->
    <div class="card mb-6 p-6 md:p-8">
      <p class="eyebrow mb-2">Currently</p>
      <h2 class="text-xl font-semibold text-slate-900 md:text-2xl dark:text-white">
        {current.title} at
        <Link url={current.employerUrl ?? "#"}>{current.employer}</Link>
      </h2>
      <p class="mt-1.5 text-slate-600 dark:text-slate-300">
        {#if current.location}{current.location} ·
        {/if}Building infrastructure for
        <Link url="https://www.anduril.com/lattice/mission-autonomy">
          Lattice Mission Autonomy
        </Link>, distributed mesh networking, and systems for running robotics software at scale.
      </p>
      <div class="mt-4 flex flex-wrap gap-2">
        {#each focusAreas as area (area)}
          <span class="tag-primary">{area}</span>
        {/each}
      </div>
    </div>

    <!-- Bio + interests -->
    <div class="grid gap-6 md:grid-cols-3">
      <div class="space-y-5 md:col-span-2">
        <div class="card p-6 md:p-8">
          <div class="space-y-4 leading-relaxed text-slate-600 dark:text-slate-300">
            <p class="text-lg text-slate-800 dark:text-slate-100">Hey, I'm Kennan!</p>
            <p>
              I started programming on TI-BASIC calculators in high school and have been hooked ever
              since. These days I'm most at home building the infrastructure and tooling that lets
              complex, distributed systems run reliably at scale.
            </p>
            <p>
              I earned my BS and MS in Computer Science at
              <Link url="https://case.edu/">Case Western Reserve University</Link>, where my thesis
              — "Dynamic Structure Adaptation for Communities of Learning Machines," advised by Dr.
              Soumya Ray — explored adaptive machine learning. Since then I've worked across applied
              ML, DevOps, and large-scale infrastructure.
            </p>
          </div>

          <!-- Fun fact -->
          <div class="mt-6 rounded-xl border border-accent-400/30 bg-accent-400/5 p-4">
            <p class="text-sm text-slate-600 dark:text-slate-300">
              <span class="font-semibold text-accent-500">Fun fact</span> — in a past life I was a
              competitive Rubik's Cube speedsolver, with a North American Record, 90 podium
              finishes, and a global #12 ranking for 3x3. Old habits:
              <Link url="https://www.worldcubeassociation.org/persons/2013LEJE03">
                my WCA profile
              </Link>.
            </p>
          </div>
        </div>
      </div>

      <aside>
        <div class="card p-6">
          <h3 class="mb-3 text-base font-semibold text-slate-900 dark:text-white">
            Outside of work
          </h3>
          <p class="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            When I'm away from the keyboard you'll usually find me on a bike, on the slopes, or
            tinkering with my
            <Link url="https://github.com/kclejeune/system">NixOS setup</Link>.
          </p>
          <div class="flex flex-wrap gap-2">
            {#each interests as interest (interest)}
              <span class="tag">{interest}</span>
            {/each}
          </div>
        </div>
      </aside>
    </div>
  </div>
</div>
