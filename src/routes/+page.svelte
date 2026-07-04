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
  <!-- Layered overlay: a light scrim in light mode, a dark one in dark mode,
       plus a vertical gradient for text legibility at the center/edges. -->
  <div class="absolute inset-0 bg-white/5 dark:bg-slate-950/30"></div>
  <div
    class="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/25 dark:from-primary-950/25 dark:via-transparent dark:to-slate-950/50"
  ></div>
  <!-- Uniform blur keeps the photo atmospheric while text stays readable
       without heavy global scrims. -->
  <div class="absolute inset-0 backdrop-blur-md"></div>
  <!-- Theme-matched radial behind the text: light glow / dark shade. -->
  <div
    class="absolute inset-0 bg-[radial-gradient(ellipse_52%_42%_at_50%_46%,rgb(255_255_255/0.7),transparent_70%)] dark:bg-[radial-gradient(ellipse_52%_42%_at_50%_46%,rgb(8_11_18/0.5),transparent_70%)]"
  ></div>
</div>

<!-- Hero content -->
<div class="flex flex-1 flex-col items-center justify-center px-4">
  <div class="text-center">
    <h1
      class="mb-5 text-4xl font-light text-slate-900 md:text-6xl dark:text-white"
      style="animation: var(--animate-fade-up); animation-delay: 0ms;"
    >
      Hi, I'm Kennan.
    </h1>

    <p
      class="mx-auto mb-10 max-w-xl text-base text-pretty text-slate-800 md:text-lg dark:text-primary-100/90"
      style="animation: var(--animate-fade-up); animation-delay: 100ms;"
    >
      I build infrastructure for distributed systems, autonomy, and robotics software at scale.
    </p>

    <!-- Social icons -->
    <div
      class="mb-12 flex justify-center gap-7"
      style="animation: var(--animate-fade-up); animation-delay: 200ms;"
    >
      {#each socials as social (social.name)}
        <IconButton link={social.link} name={social.name}>
          <social.icon
            class="h-7 w-7 text-slate-700 transition-colors hover:text-slate-950 dark:text-primary-100 dark:hover:text-white"
          />
        </IconButton>
      {/each}
    </div>

    <!-- Scroll cue -->
    <a
      href="/about"
      class="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/40 text-slate-700/80 transition-colors hover:border-slate-700/70 hover:text-slate-900 dark:border-primary-200/40 dark:text-primary-100/70 dark:hover:border-primary-200/70 dark:hover:text-primary-100"
      style="animation: var(--animate-fade-in); animation-delay: 360ms;"
      aria-label="Learn more about me"
    >
      {#each pulses as pulse, i (i)}
        <span
          class="absolute inset-0 rounded-full border-[1.5px] border-slate-600 dark:border-primary-200"
          style="transform: scale({pulse.current.scale}); opacity: {pulse.current.opacity};"
        ></span>
      {/each}
      <ChevronDownIcon class="relative z-10 h-5 w-5" />
    </a>
  </div>
</div>
