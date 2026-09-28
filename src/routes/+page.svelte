<script lang="ts">
  import CubeFace from "$lib/components/CubeFace.svelte";
  import { GitHubIcon, LinkedInIcon, EmailIcon, ResumeIcon } from "$lib/components/icons";
  import { jobs, isCurrentJob } from "$lib/data/jobs";
  import { links, sections, siteConfig } from "$lib/config.svelte";
  import SEO from "svelte-seo";

  const current = jobs.find(isCurrentJob) ?? jobs[0];

  const contacts = [
    { href: links.github, label: "GitHub", icon: GitHubIcon },
    { href: links.linkedin, label: "LinkedIn", icon: LinkedInIcon },
    { href: links.email, label: "Email", icon: EmailIcon },
    { href: links.resume, label: "Resume", icon: ResumeIcon },
  ];

  // Full class strings so Tailwind picks them up during scanning.
  const faceBorder = {
    green: "border-sticker-green",
    orange: "border-sticker-orange",
    blue: "border-sticker-blue",
  } as const;
</script>

<SEO
  title="{siteConfig.name} | Software Engineer"
  description="Hi, I'm {siteConfig.name} — a full-stack software engineer specializing in distributed systems, infrastructure, and robotics software."
  canonical={siteConfig.routes.home.canonicalUrl}
/>

<section
  class="container-page grid items-center gap-14 pt-8 pb-20 md:grid-cols-[minmax(0,1fr)_17rem] md:pt-16 md:pb-28 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20"
>
  <div>
    <h1 class="display text-display">Hi, I'm<br />Kennan.</h1>

    <p class="mt-8 max-w-[30ch] text-2xl leading-snug font-medium text-pretty sm:text-[1.75rem]">
      I build infrastructure for distributed systems, autonomy, and robotics software at scale.
    </p>

    <p class="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
      Right now that's at
      <a href={current.employerUrl} class="link">{current.employer}</a>{current.location
        ? ` in ${current.location}`
        : ""}, working on Lattice Mission Autonomy.
    </p>

    <ul class="mt-9 flex flex-wrap gap-2.5">
      {#each contacts as contact (contact.label)}
        <li>
          <a
            href={contact.href}
            class="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3.5 py-2 font-medium transition-colors hover:border-ink"
          >
            <contact.icon class="h-4.5 w-4.5 text-muted" />
            {contact.label}
          </a>
        </li>
      {/each}
    </ul>
  </div>

  <figure class="mx-auto w-full max-w-56 md:max-w-none">
    <CubeFace />
    <figcaption class="mt-9 text-[0.95rem] leading-snug text-muted">
      Before infrastructure, I solved these competitively. Press the cube to scramble it.
    </figcaption>
  </figure>
</section>

<nav class="container-page" aria-label="Sections">
  <ul class="grid gap-10 sm:grid-cols-3 sm:gap-6">
    {#each sections as section (section.path)}
      <li>
        <a
          href={section.path}
          data-sveltekit-preload-data
          class="group block border-t-[5px] pt-5 {faceBorder[section.face]}"
        >
          <span
            class="display block text-4xl transition-transform duration-300 group-hover:translate-x-1"
          >
            {section.title}
          </span>
          <span class="mt-2 block max-w-[28ch] text-muted">{section.blurb}</span>
        </a>
      </li>
    {/each}
  </ul>
</nav>
