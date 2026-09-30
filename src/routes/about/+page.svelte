<script lang="ts">
  import { dev } from "$app/environment";
  import PageHeader from "$lib/components/PageHeader.svelte";
  import { currentJob as current, formatMonthYear } from "$lib/data/jobs";
  import { links } from "$lib/config";

  const focusAreas = [
    "Distributed systems",
    "Infrastructure",
    "Mesh networking",
    "Robotics and autonomy",
  ];

  const cubing = [
    { value: "1", label: "North American Record (NAR)" },
    { value: "90", label: "Podium finishes in WCA competitions" },
    { value: "12th", label: "Highest global rank for 3x3x3 average" },
  ];

  // Cloudflare Images resizes at the edge. Where /cdn-cgi is missing (`vite dev`,
  // `vite preview`), dev skips the srcset and onerror drops it.
  const photo = "/assets/images/cube.webp";
  const resized = (width: number) => `/cdn-cgi/image/width=${width},format=auto${photo} ${width}w`;
  const photoSrcset = dev ? undefined : [480, 800, 1236].map(resized).join(", ");
</script>

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

  <!-- Tablet up: photo beside highlights, caption beside the results link. -->
  <div
    class="mt-8 grid gap-y-10 md:grid-cols-2 md:gap-x-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:gap-y-3"
  >
    <figure class="md:contents">
      <img
        src={photo}
        srcset={photoSrcset}
        sizes="(min-width: 64rem) 402px, (min-width: 48rem) calc(50vw - 52px), calc(100vw - 32px)"
        onerror={(e) => e.currentTarget.removeAttribute("srcset")}
        alt="Kennan, in a plaid shirt, mid-solve at a speedcubing competition"
        width="1236"
        height="695"
        loading="lazy"
        class="aspect-[4/3] w-full rounded-xl object-cover object-[70%_center] md:col-start-1 md:row-start-1"
      />
      <figcaption class="mt-3 text-sm text-muted md:col-start-1 md:row-start-2 md:mt-0">
        Mid-solve at a
        <a href="https://www.worldcubeassociation.org/" class="link font-normal">WCA</a>
        competition.
      </figcaption>
    </figure>

    <dl
      class="divide-y divide-line border-y border-line md:col-start-2 md:row-start-1 md:grid md:grid-rows-3"
    >
      {#each cubing as stat (stat.label)}
        <div class="grid grid-cols-[4.5rem_1fr] content-center items-baseline gap-x-4 py-3 md:py-2">
          <dt class="col-start-2 row-start-1 text-muted">{stat.label}</dt>
          <dd class="display col-start-1 row-start-1 text-3xl text-accent">{stat.value}</dd>
        </div>
      {/each}
    </dl>

    <p class="-mt-4 text-sm md:col-start-2 md:row-start-2 md:mt-0">
      <a href="https://www.worldcubeassociation.org/persons/2013LEJE03" class="link">
        Official WCA Results
      </a>
    </p>
  </div>
</section>
