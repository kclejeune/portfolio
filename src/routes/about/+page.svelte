<script lang="ts">
  import Link from "$lib/components/Link.svelte";
  import PageHeader from "$lib/components/PageHeader.svelte";
  import SocialLinks from "$lib/components/SocialLinks.svelte";
  import Stat from "$lib/components/Stat.svelte";
  import SEO from "svelte-seo";
  import { siteConfig } from "$lib/config.svelte";

  // Rubik's Cube speedsolving highlights (World Cube Association).
  const cubingHighlights = [
    { value: "NAR", label: "North American Record" },
    { value: "90", label: "Podium Finishes" },
    { value: "#12", label: "Global 3x3 Rank" },
  ];
</script>

<SEO
  title="{siteConfig.routes.about.title} | {siteConfig.name}"
  description="About {siteConfig.name} — software engineer, open-source contributor, and Rubik's Cube speedsolver."
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

    <div class="space-y-6">
      <div class="card p-6 md:p-8">
        <div class="space-y-4 leading-relaxed text-slate-600 dark:text-slate-300">
          <p class="text-lg text-slate-800 dark:text-slate-100">Hey, I'm Kennan!</p>

          <p>
            I first started programming on calculators with TI-BASIC back in high school, and I've
            been addicted ever since. In my spare time, I love cycling, skiing, and contributing to
            open-source software. Previously, I was an active competitor in the Rubik's Cube
            speedsolving community, where
            <Link url="https://www.worldcubeassociation.org/persons/2013LEJE03">my highlights</Link>
            included a North American Record, 90 podium finishes, and global 12th place rank for the 3x3
            Rubik's Cube.
          </p>

          <p>
            I completed my BS and MS in Computer Science at
            <Link url="https://case.edu/">Case Western Reserve University</Link>
            with my thesis "Dynamic Structure Adaptation for Communities of Learning Machines," supervised
            by Dr. Soumya Ray. Now, I'm a software engineer at
            <Link url="https://www.anduril.com/">Anduril Industries</Link>, where I'm building
            infrastructure for
            <Link url="https://www.anduril.com/lattice/mission-autonomy">
              Lattice Mission Autonomy
            </Link>, distributed mesh networking systems, and systems for managing robotics software
            at scale.
          </p>
        </div>
      </div>

      <!-- Cubing highlights -->
      <section>
        <h2
          class="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400"
        >
          Speedcubing Highlights
        </h2>
        <div class="grid grid-cols-3 gap-3 sm:gap-4">
          {#each cubingHighlights as stat (stat.label)}
            <Stat value={stat.value} label={stat.label} />
          {/each}
        </div>
      </section>
    </div>
  </div>
</div>
