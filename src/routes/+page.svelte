<script lang="ts">
  import { Tween } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import IconButton from "$lib/components/IconButton.svelte";
  import {
    GitHubIcon,
    LinkedInIcon,
    EmailIcon,
    ResumeIcon,
    ChevronDownIcon,
  } from "$lib/components/icons";
  import SEO from "svelte-seo";
  import { siteConfig } from "$lib/config.svelte";

  const socials = [
    { link: "https://github.com/kclejeune", name: "GitHub", icon: GitHubIcon },
    {
      link: "https://linkedin.com/in/kclejeune",
      name: "LinkedIn",
      icon: LinkedInIcon,
    },
    { link: "mailto:contact@kclj.io", name: "Email", icon: EmailIcon },
    {
      link: "https://assets.kclj.io/resume.pdf",
      name: "Resume",
      icon: ResumeIcon,
    },
  ];

  // Concentric ripples behind the scroll cue.
  const pulseCount = 3;
  const pulseDuration = 3000;
  const pulses = Array.from(
    { length: pulseCount },
    () => new Tween({ scale: 1, opacity: 0 }, { duration: pulseDuration, easing: cubicOut }),
  );

  const animateRipple = (pulse: Tween<{ scale: number; opacity: number }>) => {
    pulse.set({ scale: 1, opacity: 0.4 }, { duration: 0 });
    pulse.set({ scale: 2, opacity: 0 });
  };

  $effect(() => {
    const intervals: ReturnType<typeof setInterval>[] = [];
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    pulses.forEach((pulse, i) => {
      const delay = (pulseDuration / pulseCount) * i;
      const timeout = setTimeout(() => {
        animateRipple(pulse);
        intervals.push(setInterval(() => animateRipple(pulse), pulseDuration));
      }, delay);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  });
</script>

<SEO
  title="{siteConfig.name} | Software Engineer"
  description="Hi, I'm {siteConfig.name} — a full-stack software engineer specializing in distributed systems, infrastructure, and robotics software."
  canonical={siteConfig.routes.home.canonicalUrl}
/>

<!-- Full-viewport background (sits behind the navbar too) -->
<div
  class="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
  style="background-image: url('/assets/images/cube.webp');"
>
  <!-- Layered overlay: darken for legibility + primary tint + vignette -->
  <div class="absolute inset-0 bg-slate-950/55"></div>
  <div
    class="absolute inset-0 bg-gradient-to-b from-primary-950/40 via-transparent to-slate-950/70"
  ></div>
</div>

<!-- Hero content -->
<div class="flex flex-1 flex-col items-center justify-center px-4">
  <div class="text-center">
    <p
      class="mb-4 text-xs font-semibold tracking-[0.22em] text-primary-200/90 uppercase"
      style="animation: var(--animate-fade-up); animation-delay: 0ms;"
    >
      Full-stack Software Engineer
    </p>

    <h1
      class="mb-5 text-4xl font-light text-white md:text-6xl"
      style="animation: var(--animate-fade-up); animation-delay: 80ms;"
    >
      Hi, I'm <span class="font-semibold">Kennan</span>.
    </h1>

    <p
      class="mx-auto mb-10 max-w-xl text-base text-pretty text-primary-100/80 md:text-lg"
      style="animation: var(--animate-fade-up); animation-delay: 160ms;"
    >
      I build infrastructure for distributed systems, autonomy, and robotics software at scale.
    </p>

    <!-- Social icons -->
    <div
      class="mb-12 flex justify-center gap-7"
      style="animation: var(--animate-fade-up); animation-delay: 240ms;"
    >
      {#each socials as social (social.name)}
        <IconButton link={social.link} name={social.name}>
          <social.icon class="h-7 w-7 text-primary-100 transition-colors hover:text-white" />
        </IconButton>
      {/each}
    </div>

    <!-- Scroll cue -->
    <a
      href="/about"
      class="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-200/40 text-primary-100/70 transition-colors hover:border-primary-200/70 hover:text-primary-100"
      style="animation: var(--animate-fade-in); animation-delay: 400ms;"
      aria-label="Learn more about me"
    >
      {#each pulses as pulse, i (i)}
        <span
          class="absolute inset-0 rounded-full border-[1.5px] border-primary-200"
          style="transform: scale({pulse.current.scale}); opacity: {pulse.current.opacity};"
        ></span>
      {/each}
      <ChevronDownIcon class="relative z-10 h-5 w-5" />
    </a>
  </div>
</div>
