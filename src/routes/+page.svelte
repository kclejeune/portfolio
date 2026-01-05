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

  type Icon = {
    link: string;
    name: string;
  };

  const icons: Record<string, Icon> = {
    github: {
      link: "https://github.com/kclejeune",
      name: "GitHub",
    },
    linkedin: {
      link: "https://linkedin.com/in/kclejeune",
      name: "LinkedIn",
    },
    email: {
      link: "mailto:contact@kclj.io",
      name: "Email",
    },
    resume: {
      link: "https://assets.kclj.io/resume.pdf",
      name: "Resume",
    },
  };

  // Pulse animation state - multiple ripples
  const pulseCount = 3;
  const pulseDuration = 3000;
  const pulses = Array.from(
    { length: pulseCount },
    () =>
      new Tween(
        { scale: 1, opacity: 0 },
        { duration: pulseDuration, easing: cubicOut }
      )
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
  description="Hi, I'm {siteConfig.name} - a full-stack software engineer specializing in distributed systems, infrastructure, and robotics software."
  canonical={siteConfig.routes.home.canonicalUrl}
/>

<!-- Full viewport background (behind navbar too) -->
<div
  class="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
  style="background-image: url('/assets/images/cube.webp');"
>
  <div class="absolute inset-0 bg-primary-900/50 dark:bg-primary-950/60"></div>
</div>

<!-- Hero content - fills remaining space between navbar and footer -->
<div class="flex-1 flex flex-col items-center justify-center">
  <div class="text-center px-4">
    <h1 class="text-4xl md:text-5xl font-light text-primary-200 mb-6">
      Hi, I'm Kennan.
    </h1>

    <!-- Social Icons -->
    <div class="flex justify-center gap-7 mb-12">
      <IconButton link={icons.github.link} name={icons.github.name}>
        <GitHubIcon
          class="w-7 h-7 text-primary-200 hover:text-white transition-colors"
        />
      </IconButton>

      <IconButton link={icons.linkedin.link} name={icons.linkedin.name}>
        <LinkedInIcon
          class="w-7 h-7 text-primary-200 hover:text-white transition-colors"
        />
      </IconButton>

      <IconButton link={icons.email.link} name={icons.email.name}>
        <EmailIcon
          class="w-7 h-7 text-primary-200 hover:text-white transition-colors"
        />
      </IconButton>

      <IconButton link={icons.resume.link} name={icons.resume.name}>
        <ResumeIcon
          class="w-7 h-7 text-primary-200 hover:text-white transition-colors"
        />
      </IconButton>
    </div>

    <!-- Scroll indicator -->
    <a
      href="/about"
      class="group relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-primary-200/40 text-primary-200/70 hover:text-primary-100 hover:border-primary-200/60 transition-colors"
      aria-label="Learn more about me"
    >
      <!-- Ripple rings -->
      {#each pulses as pulse}
        <span
          class="absolute inset-0 rounded-full border-[1.5px] border-primary-200"
          style="transform: scale({pulse.current.scale}); opacity: {pulse
            .current.opacity};"
        ></span>
      {/each}
      <ChevronDownIcon class="w-5 h-5 relative z-10" />
    </a>
  </div>
</div>
