<script lang="ts">
  import IconButton from "$lib/components/IconButton.svelte";

  let color = "text-primary-300";
  let hover = "sm:hover:text-primary-400";
  let colorClass = `${color} ${hover}`;
  let spacingClass = "mx-5";
  let sizeClass = "h-8 w-8";

  type Icon = {
    link: string;
    iconClass: string;
    name: string;
  };
  const icons: Record<string, Icon> = {
    github: {
      link: "https://github.com/kclejeune",
      iconClass: "fa-2x fab fa-github",
      name: "GitHub",
    },
    linkedin: {
      link: "https://linkedin.com/in/kclejeune",
      iconClass: "fa-2x fab fa-linkedin",
      name: "LinkedIn",
    },
    keybase: {
      link: "https://keybase.io/kclejeune",
      iconClass: "fa-2x fab fa-keybase",
      name: "Keybase",
    },
    email: {
      link: "mailto:kennan@case.edu",
      iconClass: "fa-2x far fa-envelope",
      name: "Email",
    },
    resume: {
      link: "https://kclejeune.keybase.pub/resume.pdf",
      iconClass: "fa-2x far fa-file-alt",
      name: "Resume",
    },
  };
</script>

<div
  class="flex flex-col items-center justify-center bg-center bg-no-repeat bg-cover page lg:bg-fixed bg-surface-600 bg-blend-soft-light dark:bg-blend-soft-light dark:bg-surface-700"
  id="home"
>
  <div class="text-center">
    <h1 class="text-5xl m-6 {color} font-light">Hi, I'm Kennan.</h1>
  </div>
  <div class="flex justify-evenly">
    <!-- github icon -->
    <IconButton link={icons.github.link} name={icons.github.name}>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="github"
        class="svg-inline--fa fa-github fa-w-16 {colorClass} {spacingClass} {sizeClass}"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 496 512"
        ><path
          fill="currentColor"
          d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
        /></svg
      >
    </IconButton>

    <!-- linkedin -->
    <IconButton link={icons.linkedin.link} name={icons.linkedin.name}>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="linkedin"
        class="svg-inline--fa fa-linkedin fa-w-14 {colorClass} {spacingClass} {sizeClass}"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        ><path
          fill="currentColor"
          d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
        /></svg
      >
    </IconButton>

    <!-- keybase -->
    <IconButton link={icons.keybase.link} name={icons.keybase.name}>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="keybase"
        class="svg-inline--fa fa-keybase fa-w-14 {colorClass} {spacingClass} {sizeClass}"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        ><path
          fill="currentColor"
          d="M286.17 419a18 18 0 1 0 18 18 18 18 0 0 0-18-18zm111.92-147.6c-9.5-14.62-39.37-52.45-87.26-73.71q-9.1-4.06-18.38-7.27a78.43 78.43 0 0 0-47.88-104.13c-12.41-4.1-23.33-6-32.41-5.77-.6-2-1.89-11 9.4-35L198.66 32l-5.48 7.56c-8.69 12.06-16.92 23.55-24.34 34.89a51 51 0 0 0-8.29-1.25c-41.53-2.45-39-2.33-41.06-2.33-50.61 0-50.75 52.12-50.75 45.88l-2.36 36.68c-1.61 27 19.75 50.21 47.63 51.85l8.93.54a214 214 0 0 0-46.29 35.54C14 304.66 14 374 14 429.77v33.64l23.32-29.8a148.6 148.6 0 0 0 14.56 37.56c5.78 10.13 14.87 9.45 19.64 7.33 4.21-1.87 10-6.92 3.75-20.11a178.29 178.29 0 0 1-15.76-53.13l46.82-59.83-24.66 74.11c58.23-42.4 157.38-61.76 236.25-38.59 34.2 10.05 67.45.69 84.74-23.84.72-1 1.2-2.16 1.85-3.22a156.09 156.09 0 0 1 2.8 28.43c0 23.3-3.69 52.93-14.88 81.64-2.52 6.46 1.76 14.5 8.6 15.74 7.42 1.57 15.33-3.1 18.37-11.15C429 443 434 414 434 382.32c0-38.58-13-77.46-35.91-110.92zM142.37 128.58l-15.7-.93-1.39 21.79 13.13.78a93 93 0 0 0 .32 19.57l-22.38-1.34a12.28 12.28 0 0 1-11.76-12.79L107 119c1-12.17 13.87-11.27 13.26-11.32l29.11 1.73a144.35 144.35 0 0 0-7 19.17zm148.42 172.18a10.51 10.51 0 0 1-14.35-1.39l-9.68-11.49-34.42 27a8.09 8.09 0 0 1-11.13-1.08l-15.78-18.64a7.38 7.38 0 0 1 1.34-10.34l34.57-27.18-14.14-16.74-17.09 13.45a7.75 7.75 0 0 1-10.59-1s-3.72-4.42-3.8-4.53a7.38 7.38 0 0 1 1.37-10.34L214 225.19s-18.51-22-18.6-22.14a9.56 9.56 0 0 1 1.74-13.42 10.38 10.38 0 0 1 14.3 1.37l81.09 96.32a9.58 9.58 0 0 1-1.74 13.44zM187.44 419a18 18 0 1 0 18 18 18 18 0 0 0-18-18z"
        /></svg
      >
    </IconButton>
    <IconButton link={icons.email.link} name={icons.email.name}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="{colorClass} {spacingClass} {sizeClass}"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    </IconButton>
    <IconButton link={icons.resume.link} name={icons.resume.name}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="{colorClass} {spacingClass} {sizeClass}"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </IconButton>
  </div>
  <div>
    <IconButton link="#about" name="scroll down" newTab={false}>
      <svg
        on:click|preventDefault={() => {
          document?.getElementById("about")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="chevron-circle-down"
        class="svg-inline--fa fa-chevron-circle-down fa-w-16 {colorClass} my-20 {sizeClass}"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        ><path
          fill="currentColor"
          d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM273 369.9l135.5-135.5c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L256 285.1 154.4 183.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L239 369.9c9.4 9.4 24.6 9.4 34 0z"
        /></svg
      >
    </IconButton>
  </div>
</div>

<style>
  #home {
    /* The image used */
    background-image: url("/assets/images/cube.webp");
  }
</style>
