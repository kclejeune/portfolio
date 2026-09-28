<script lang="ts">
  import type { PageData } from "./$types";
  import TwistyCube from "$lib/components/TwistyCube.svelte";
  import { GitHubIcon, LinkedInIcon, EmailIcon, ResumeIcon } from "$lib/components/icons";
  import { jobs, isCurrentJob } from "$lib/data/jobs";
  import { links, sections, siteConfig } from "$lib/config.svelte";
  import SEO from "svelte-seo";

  let { data }: { data: PageData } = $props();

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
  description="{siteConfig.name} is a software engineer building infrastructure for distributed systems and robotics."
  canonical={siteConfig.routes.home.canonicalUrl}
/>

<!-- From tablet width up, the hero and section links fill exactly one screen
     below the header (h-20), with the links pinned to the bottom edge. -->
<div class="md:flex md:min-h-[calc(100svh-5rem)] md:flex-col">
  <section
    class="container-page grid items-center gap-14 pt-8 pb-20 md:flex-1 md:grid-cols-[minmax(0,1fr)_19rem] md:py-8 short:py-4 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20"
  >
    <div>
      <h1
        class="display text-display short:text-[min(8.5rem,11vw,15svh)] shorter:text-[min(8.5rem,11vw,14svh)]"
      >
        Hi, I'm<br />Kennan.
      </h1>

      <p
        class="mt-8 max-w-[30ch] text-2xl leading-snug font-medium text-pretty sm:text-[1.75rem] short:mt-5 short:text-2xl shorter:text-xl"
      >
        I'm a software engineer building infrastructure for distributed systems and robotics.
      </p>

      <p class="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted short:mt-3">
        Currently at
        <a href={current.employerUrl} class="link">{current.employer}</a>{current.location
          ? ` in ${current.location}`
          : ""}, working on Lattice Mission Autonomy.
      </p>

      <ul class="mt-9 flex flex-wrap gap-2.5 short:mt-6">
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

    <figure class="mx-auto w-full max-w-xs md:max-w-none">
      <figcaption class="mb-2 text-[0.95rem] leading-snug text-muted">
        I used to solve these competitively.
        <span class="block no-js:hidden">Drag to rotate.</span>
      </figcaption>
      <TwistyCube initial={data.cube} />
    </figure>
  </section>

  <nav class="container-page mb-20 sm:mb-28 md:mb-0 md:pb-10 short:pb-6" aria-label="Sections">
    <ul class="grid gap-10 sm:grid-cols-3 sm:gap-6">
      {#each sections as section (section.path)}
        <li>
          <a
            href={section.path}
            data-sveltekit-preload-data
            class="group block border-t-[5px] pt-5 short:pt-3 {faceBorder[section.face]}"
          >
            <span
              class="display block text-4xl transition-transform duration-300 group-hover:translate-x-1 short:text-3xl"
            >
              {section.title}
            </span>
            <span class="mt-2 block text-muted shorter:hidden">{section.blurb}</span>
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</div>
