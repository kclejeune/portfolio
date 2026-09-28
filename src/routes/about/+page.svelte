<script lang="ts">
  import PageHeader from "$lib/components/PageHeader.svelte";
  import { currentJob as current, formatMonthYear } from "$lib/data/jobs";
  import SEO from "svelte-seo";
  import { links, siteConfig } from "$lib/config.svelte";

  const focusAreas = [
    "Distributed systems",
    "Infrastructure",
    "Mesh networking",
    "Robotics and autonomy",
  ];

  const cubing = [
    { value: "NAR", label: "North American record" },
    { value: "90", label: "Podium finishes" },
    { value: "12th", label: "In the world at 3x3" },
  ];
</script>

<SEO
  title="{siteConfig.routes.about.title} | {siteConfig.name}"
  description="About {siteConfig.name}, a software engineer at Anduril Industries working on infrastructure for distributed systems and robotics."
  canonical={siteConfig.routes.about.canonicalUrl}
/>

<PageHeader title="About">Software engineer, cyclist, skier, and former speedcuber.</PageHeader>

<div class="container-page grid gap-14 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-16 lg:gap-24">
  <div class="max-w-[62ch] space-y-6 text-lg leading-relaxed">
    <p>
      I'm a software engineer at
      <a href={current.employerUrl} class="link">{current.employer}</a>, where I work on
      infrastructure for
      <a href={links.lattice} class="link">Lattice Mission Autonomy</a>, including distributed mesh
      networking and the systems robotics software runs on.
    </p>
    <p>
      I started programming by writing TI-BASIC games on a graphing calculator in high school. Since
      then I've mostly worked on infrastructure: the tooling and platforms that help distributed
      systems ship quickly and run reliably.
    </p>
    <p>
      I have a BS and MS in Computer Science from
      <a href="https://case.edu/" class="link">Case Western Reserve University</a>. My thesis,
      “Dynamic Structure Adaptation for Communities of Learning Machines,” advised by Dr. Soumya
      Ray, explored adaptive machine learning. Before Anduril, I worked on applied ML, DevOps, and
      large-scale data pipelines at the Johns Hopkins Applied Physics Laboratory.
    </p>
  </div>

  <dl class="space-y-7 md:pt-1.5">
    <div>
      <dt class="label">Currently</dt>
      <dd class="mt-1.5">
        <span class="block font-semibold">{current.title}, {current.employer}</span>
        <span class="block text-muted">
          {current.location ? `${current.location}, s` : "S"}ince {formatMonthYear(
            current.startDate,
          )}
        </span>
      </dd>
    </div>
    <div>
      <dt class="label">Focus</dt>
      <dd class="mt-1.5">
        <ul>
          {#each focusAreas as area (area)}
            <li>{area}</li>
          {/each}
        </ul>
      </dd>
    </div>
    <div>
      <dt class="label">Education</dt>
      <dd class="mt-1.5">
        <span class="block font-semibold">BS and MS, Computer Science</span>
        <span class="block text-muted">Case Western Reserve University</span>
      </dd>
    </div>
    <div>
      <dt class="label">Off the clock</dt>
      <dd class="mt-1.5">
        <p class="text-muted">
          Cycling, skiing, and tinkering with my
          <a href="https://github.com/kclejeune/system" class="link">NixOS setup</a>.
        </p>
      </dd>
    </div>
  </dl>
</div>

<section class="container-page mt-20 sm:mt-28" aria-labelledby="cubing">
  <h2 id="cubing" class="display text-4xl sm:text-5xl">Speedcubing</h2>
  <p class="mt-3 text-lg leading-relaxed text-muted">
    Highlights from my former speedcubing career.
  </p>

  <div class="mt-8 grid items-center gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:gap-14">
    <figure>
      <img
        src="/assets/images/cube.webp"
        alt="Kennan, in a plaid shirt, mid-solve at a speedcubing competition"
        width="1236"
        height="695"
        loading="lazy"
        class="aspect-[4/3] w-full rounded-xl object-cover object-[70%_center]"
      />
      <figcaption class="mt-3 text-sm text-muted">
        Mid-solve at a World Cube Association competition.
      </figcaption>
    </figure>

    <div>
      <dl class="divide-y divide-line border-y border-line">
        {#each cubing as stat (stat.label)}
          <div class="flex items-baseline gap-5 py-3">
            <dt class="order-2 text-muted">{stat.label}</dt>
            <dd class="display w-20 shrink-0 text-3xl text-accent">{stat.value}</dd>
          </div>
        {/each}
      </dl>
      <p class="mt-6">
        <a href="https://www.worldcubeassociation.org/persons/2013LEJE03" class="link">
          My results on the WCA site
        </a>
      </p>
    </div>
  </div>
</section>
