<script lang="ts">
  import Link from "$lib/components/Link.svelte";
  import PageNav from "$lib/components/PageNav.svelte";
  import { ExternalLinkIcon } from "$lib/components/icons";
  import SEO from "svelte-seo";
  import { siteConfig } from "$lib/config.svelte";
</script>

<SEO
  title="{siteConfig.routes.about.title} | {siteConfig.name}"
  description="About {siteConfig.name} - software engineer, open-source contributor, and Rubik's Cube speedsolver."
  canonical={siteConfig.routes.about.canonicalUrl}
/>

<div class="page-content">
  <div class="section-container">
    <!-- Header -->
    <div class="mb-6 md:mb-10">
      <PageNav>
        <h1
          class="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white"
        >
          About Me
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

    <!-- Content -->
    <div>
      <div class="card card-hover p-6 md:p-8">
        <div class="space-y-4 text-slate-600 dark:text-slate-300">
          <p>Hey, I'm Kennan!</p>

          <p>
            I first started programming on calculators with TI-BASIC back in
            high school, and I've been addicted ever since. In my spare time, I
            love cycling, skiing, and contributing to open-source software.
            Previously, I was an active competitor in the Rubik's Cube
            speedsolving community, where
            <Link url="https://www.worldcubeassociation.org/persons/2013LEJE03">
              my highlights
            </Link>
            included a North American Record, 90 podium finishes, and global 12th
            place rank for the 3x3 Rubik's Cube.
          </p>

          <p>
            I completed my BS and MS in Computer Science at
            <Link url="https://case.edu/">Case Western Reserve University</Link>
            with my thesis "Dynamic Structure Adaptation for Communities of Learning
            Machines," supervised by Dr. Soumya Ray. Now, I'm a software engineer
            at
            <Link url="https://www.anduril.com/">Anduril Industries</Link>,
            where I'm building infrastructure for
            <Link url="https://www.anduril.com/lattice/mission-autonomy">
              Lattice Mission Autonomy
            </Link>, distributed mesh networking systems, and systems for
            managing robotics software at scale.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
