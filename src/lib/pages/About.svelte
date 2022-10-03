<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  import { primaryBackground } from "$lib/utils/constants";

  export let backgroundClass = primaryBackground;
</script>

<Page id="about" title="The Essentials" {backgroundClass}>
  <div
    class="container mx-auto leading-relaxed prose md:max-w-prose dark:prose-invert"
  >
    <p>Hey, I'm Kennan!</p>
    <p>
      I first started programming on calculators with TI-BASIC back in high
      school, and I've been addicted ever since. Outside of my studies, I'm an
      avid cyclist, musician, linux enthusiast. Prior to college, I was an
      active competitor in the Rubik's Cube speedsolving community, where
      <a href="https://www.worldcubeassociation.org/persons/2013LEJE03"
        >my highlights</a
      > included a North American Record, 90 podium finishes, and global 12th place
      rank for the 3x3 Rubik's Cube.
    </p>
    <p>
      I recently completed my BS and MS in Computer Science at <a
        href="https://case.edu/">Case Western Reserve University</a
      >
      with my thesis
      <a href="http://rave.ohiolink.edu/etdc/view?acc_num=case1651513645805196"
        >"Dynamic Structure Adaptation for Communities of Learning Machines,"</a
      >
      supervised by Dr. Soumya Ray. Post-graduation, I'm working on Software Engineering
      and Data Science at the
      <a href="https://www.jhuapl.edu/"
        >Johns Hopkins University Applied Physics Laboratory</a
      >. My current work involves building automated software systems for
      chemical/biological threat assessment and detecting weapons of mass
      destruction.
    </p>
  </div>
</Page>
