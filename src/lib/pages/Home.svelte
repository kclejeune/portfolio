<script lang="ts">
  let color = "text-primary-300";
  let hover = "sm:hover:text-primary-500";
  let colorClass = `${color} ${hover}`;
  import Anchor from "../components/Anchor.svelte";
  import IconButton from "../components/IconButton.svelte";
  import { scrollToElement } from "../utils";

  type Icon = {
    link: string;
    iconClass: string;
    name: string;
  };
  const icons: Array<Icon> = [
    {
      link: "https://github.com/kclejeune",
      iconClass: "fa-2x fab fa-github",
      name: "GitHub",
    },
    {
      link: "https://linkedin.com/in/kclejeune",
      iconClass: "fa-2x fab fa-linkedin",
      name: "LinkedIn",
    },
    {
      link: "https://keybase.io/kclejeune",
      iconClass: "fa-2x fab fa-keybase",
      name: "Keybase",
    },
    {
      link: "mailto:contact@kclj.io",
      iconClass: "fa-2x far fa-envelope",
      name: "Email",
    },
    {
      link: "https://kclejeune.keybase.pub/resume.pdf",
      iconClass: "fa-2x far fa-file-alt",
      name: "Resume",
    },
  ];
</script>

<Anchor id="home" />
<div
  class="flex flex-col items-center justify-center bg-center bg-no-repeat bg-cover page lg:bg-fixed"
  id="bg"
>
  <div class="text-center">
    <h1 class="text-5xl m-6 {color} font-light">Hi, I'm Kennan.</h1>
  </div>
  <div>
    <!-- <div class="pt-16" /> -->
    {#each icons as icon}
      <IconButton {...icon} {colorClass} customClass="mx-5" />
    {/each}
  </div>
  <IconButton
    link="#about"
    on:click={() => {
      scrollToElement("#about");
    }}
    name="scroll down"
    {colorClass}
    customClass="my-20"
    newTab={false}
    iconClass="fas fa-chevron-circle-down fa-2x"
  />
</div>

<style>
  #bg {
    /* The image used */
    background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.6) 100%
      ),
      url("/assets/images/cube.webp");
    background-color: rgba(0, 0, 0, 0.6);
  }
</style>
