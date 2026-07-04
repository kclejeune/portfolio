<script lang="ts">
  import Link from "$lib/components/Link.svelte";
  import PageHeader from "$lib/components/PageHeader.svelte";
  import SocialLinks from "$lib/components/SocialLinks.svelte";
  import { jobs, isCurrentJob, formatMonthYear } from "$lib/data/jobs";
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

    <div class="grid gap-8 md:grid-cols-3 md:gap-10">
      <!-- Snapshot rail — first in source so professional info leads on mobile -->
      <aside class="md:order-2">
        <div class="card divide-y divide-slate-200/70 md:sticky md:top-20 dark:divide-slate-800">
          <section class="p-5">
            <p class="eyebrow mb-2">Currently</p>
            <p class="font-semibold text-slate-900 dark:text-white">{current.title}</p>
            <p class="mt-0.5 text-sm">
              <Link url={current.employerUrl ?? "#"}>{current.employer}</Link>
            </p>
            <p class="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              {#if current.location}
                {current.location} ·
              {/if}
              Since {formatMonthYear(current.startDate)}
            </p>
          </section>

          <section class="p-5">
            <p class="eyebrow mb-2.5">Focus</p>
            <div class="flex flex-wrap gap-1.5">
              {#each focusAreas as area (area)}
                <span class="tag-primary">{area}</span>
              {/each}
            </div>
          </section>

          <section class="p-5">
            <p class="eyebrow mb-2">Education</p>
            <p class="text-sm font-medium text-slate-900 dark:text-white">
              BS &amp; MS, Computer Science
            </p>
            <p class="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              <Link url="https://case.edu/">Case Western Reserve University</Link>
            </p>
          </section>

          <section class="p-5">
            <p class="eyebrow mb-2.5">Off the clock</p>
            <p class="mb-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Usually on a bike, on the slopes, or tinkering with my
              <Link url="https://github.com/kclejeune/system">NixOS setup</Link>.
            </p>
            <div class="flex flex-wrap gap-1.5">
              {#each interests as interest (interest)}
                <span class="tag">{interest}</span>
              {/each}
            </div>
          </section>
        </div>
      </aside>

      <!-- Narrative -->
      <div class="md:order-1 md:col-span-2">
        <h2
          class="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl dark:text-white"
        >
          Hey, I'm Kennan.
        </h2>

        <div class="mt-5 space-y-5 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          <p>
            I'm a software engineer at
            <Link url={current.employerUrl ?? "#"}>{current.employer}</Link>, where I build
            infrastructure for
            <Link url="https://www.anduril.com/lattice/mission-autonomy">
              Lattice Mission Autonomy
            </Link>
            — distributed mesh networking and the systems that let robotics software run reliably at scale.
          </p>
          <p>
            I got hooked on programming writing TI-BASIC games on graphing calculators in high
            school, and the through-line ever since has been infrastructure: the tooling, platforms,
            and plumbing that let complex distributed systems ship quickly and run dependably.
          </p>
          <p>
            I earned my BS and MS in Computer Science at
            <Link url="https://case.edu/">Case Western Reserve University</Link>, where my thesis —
            "Dynamic Structure Adaptation for Communities of Learning Machines," advised by Dr.
            Soumya Ray — explored adaptive machine learning. Before Anduril, I worked across applied
            ML, DevOps, and large-scale data pipelines at the Johns Hopkins Applied Physics
            Laboratory.
          </p>
        </div>

        <!-- Fun fact — quiet aside rather than a competing card -->
        <div class="mt-7 border-l-2 border-accent-400 pl-4">
          <p class="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            <span class="font-semibold text-accent-500">Fun fact</span> — in a past life I was a
            competitive Rubik's Cube speedsolver, with a North American Record, 90 podium finishes,
            and a global #12 ranking for 3x3. Old habits:
            <Link url="https://www.worldcubeassociation.org/persons/2013LEJE03">
              my WCA profile
            </Link>.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
