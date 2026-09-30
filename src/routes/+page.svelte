<script lang="ts">
  import type { PageProps } from "./$types";
  import PageHeader from "$lib/components/PageHeader.svelte";
  import TwistyCube from "$lib/components/TwistyCube.svelte";
  import { currentJob as current } from "$lib/data/jobs";
  import { contacts, links, sections } from "$lib/config";

  let { data }: PageProps = $props();
</script>

<!-- From tablet up, hero and section links fill the screen below the header. -->
<div class="md:flex md:min-h-[calc(100svh-var(--header-h))] md:flex-col">
  <section
    class="container-page grid items-start gap-x-14 pb-20 md:flex-1 md:grid-cols-[minmax(0,1fr)_19rem] md:pb-8 shorter:pb-2 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-x-20"
  >
    <div>
      <PageHeader title="Hi, I'm Kennan." marker={false} contained={false}>
        I'm a full-stack software engineer building platform infrastructure, networking, and
        hardware integration for distributed robotic systems.
      </PageHeader>

      <p class="max-w-[52ch] text-lg leading-relaxed text-muted">
        Currently at
        <a href={current.employerUrl} class="link">{current.employer}</a>{current.location
          ? ` in ${current.location}`
          : ""}, working on
        <a href={links.lattice} class="link">Lattice Mission Autonomy</a>.
      </p>

      <ul class="mt-7 flex flex-wrap gap-2.5 short:mt-5">
        {#each contacts as contact (contact.label)}
          <li>
            <a href={contact.href} class="button">
              <contact.icon class="h-4.5 w-4.5 text-muted" />
              {contact.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>

    <figure class="mx-auto mt-14 w-full max-w-xs md:mt-0 md:max-w-none md:pt-14 shorter:pt-6">
      <figcaption class="mb-2 text-[0.95rem] leading-snug text-muted">
        I used to solve these competitively.
        <span class="block no-js:hidden">Drag to rotate.</span>
      </figcaption>
      <TwistyCube pool={data.cube.pool} />
    </figure>
  </section>

  <nav
    class="container-page mb-20 sm:mb-28 md:mb-0 md:pb-10 short:pb-6 shorter:pb-4"
    aria-label="Sections"
  >
    <ul class="grid gap-10 sm:grid-cols-3 sm:gap-6">
      {#each sections as section (section.path)}
        <li>
          <a
            href={section.path}
            data-sveltekit-preload-data
            data-face={section.face}
            class="group block border-t-[5px] border-accent-sticker pt-5 short:pt-3"
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
