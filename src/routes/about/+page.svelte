<script lang="ts">
  import PageHeader from "$lib/components/PageHeader.svelte";
  import { jobs, isCurrentJob, formatMonthYear } from "$lib/data/jobs";
  import SEO from "svelte-seo";
  import { siteConfig } from "$lib/config.svelte";

  const current = jobs.find(isCurrentJob) ?? jobs[0];

  const focusAreas = [
    "Distributed systems",
    "Infrastructure",
    "Mesh networking",
    "Robotics and autonomy",
  ];

  const interests = ["Cycling", "Skiing", "Open source", "NixOS"];

  const cubing = [
    { value: "NAR", label: "North American record" },
    { value: "90", label: "Podium finishes" },
    { value: "12th", label: "In the world at 3x3" },
  ];
</script>

<SEO
  title="{siteConfig.routes.about.title} | {siteConfig.name}"
  description="About {siteConfig.name} — a software engineer focused on distributed systems, infrastructure, and robotics software at Anduril Industries."
  canonical={siteConfig.routes.about.canonicalUrl}
/>

<PageHeader title="About">
  Engineer by trade, cyclist and skier by choice, speedcuber in a past life.
</PageHeader>

<div class="container-page grid gap-14 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-16 lg:gap-24">
  <div class="max-w-[62ch] space-y-6 text-lg leading-relaxed">
    <p>
      I'm a software engineer at
      <a href={current.employerUrl} class="link">{current.employer}</a>, where I build
      infrastructure for
      <a href="https://www.anduril.com/lattice/mission-autonomy" class="link"
        >Lattice Mission Autonomy</a
      >: distributed mesh networking and the systems that let robotics software run reliably at
      scale.
    </p>
    <p>
      I got hooked on programming writing TI-BASIC games on graphing calculators in high school, and
      the through-line ever since has been infrastructure: the tooling, platforms, and plumbing that
      let complex distributed systems ship quickly and run dependably.
    </p>
    <p>
      I earned my BS and MS in Computer Science at
      <a href="https://case.edu/" class="link">Case Western Reserve University</a>, where my thesis,
      “Dynamic Structure Adaptation for Communities of Learning Machines,” advised by Dr. Soumya
      Ray, explored adaptive machine learning. Before Anduril, I worked across applied ML, DevOps,
      and large-scale data pipelines at the Johns Hopkins Applied Physics Laboratory.
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
          Usually on a bike, on the slopes, or tinkering with my
          <a href="https://github.com/kclejeune/system" class="link">NixOS setup</a>.
        </p>
        <div class="mt-3 flex flex-wrap gap-1.5">
          {#each interests as interest (interest)}
            <span class="chip">{interest}</span>
          {/each}
        </div>
      </dd>
    </div>
  </dl>
</div>

<section
  class="container-page mt-20 grid items-center gap-10 sm:mt-28 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-14"
  aria-labelledby="cubing"
>
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
    <h2 id="cubing" class="display text-4xl sm:text-5xl">The speedcubing years</h2>
    <p class="mt-5 text-lg leading-relaxed">
      Before any of this, I was a competitive Rubik's Cube speedsolver. Old habits die hard.
    </p>
    <dl class="mt-7 divide-y divide-line border-y border-line">
      {#each cubing as stat (stat.label)}
        <div class="flex items-baseline gap-5 py-3">
          <dt class="order-2 text-muted">{stat.label}</dt>
          <dd class="display w-20 shrink-0 text-3xl text-accent">{stat.value}</dd>
        </div>
      {/each}
    </dl>
    <p class="mt-6">
      <a href="https://www.worldcubeassociation.org/persons/2013LEJE03" class="link">
        See my competition results
      </a>
    </p>
  </div>
</section>
