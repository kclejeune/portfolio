<script lang="ts">
  import { Tween } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import IconButton from "$lib/components/IconButton.svelte";
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

  // Pulse animation state
  const pulse = new Tween(
    { scale: 1, opacity: 0.5 },
    { duration: 2000, easing: cubicOut }
  );

  const animate = () => {
    pulse.set({ scale: 1, opacity: 0.5 }, { duration: 0 });
    pulse.set({ scale: 1.8, opacity: 0 });
  };

  $effect(() => {
    animate();
    const interval = setInterval(animate, 2000);
    return () => clearInterval(interval);
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
        <svg
          class="w-7 h-7 text-primary-200 hover:text-white transition-colors"
          viewBox="0 0 496 512"
          fill="currentColor"
        >
          <path
            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
          />
        </svg>
      </IconButton>

      <IconButton link={icons.linkedin.link} name={icons.linkedin.name}>
        <svg
          class="w-7 h-7 text-primary-200 hover:text-white transition-colors"
          viewBox="0 0 448 512"
          fill="currentColor"
        >
          <path
            d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
          />
        </svg>
      </IconButton>

      <IconButton link={icons.email.link} name={icons.email.name}>
        <svg
          class="w-7 h-7 text-primary-200 hover:text-white transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      </IconButton>

      <IconButton link={icons.resume.link} name={icons.resume.name}>
        <svg
          class="w-7 h-7 text-primary-200 hover:text-white transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </IconButton>
    </div>

    <!-- Scroll indicator -->
    <a
      href="/about"
      class="group relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-primary-200/40 text-primary-200/70 hover:text-primary-100 hover:border-primary-200/60 transition-colors"
      aria-label="Learn more about me"
    >
      <!-- Ripple ring -->
      <span
        class="absolute inset-0 rounded-full border-[1.5px] border-primary-200"
        style="transform: scale({pulse.current.scale}); opacity: {pulse.current
          .opacity};"
      ></span>
      <svg
        class="w-5 h-5 relative z-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="3px"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </a>
  </div>
</div>
