<script lang="ts">
  import Link from "$lib/components/Link.svelte";
  import Page from "$lib/components/Page.svelte";
  import Text from "$lib/components/Text.svelte";
  import { primaryBackground } from "$lib/utils/constants";

  export let backgroundClass = primaryBackground;
</script>

<Page id="about" title="The Essentials" {backgroundClass}>
  <Text>
    <p>Hey, I'm Kennan!</p>
    <br />
    <p>
      I started programming on calculators with TI-BASIC back in high school,
      and I've been addicted ever since. Outside of my studies, I'm an avid
      cyclist, musician, linux enthusiast. Prior to college, I was an active
      competitor in the Rubik's Cube speedsolving community. During the years
      when I was actively competing, my highlights included a North American
      Record, 90 top 3 finishes (35 gold, 32 silver, 23 bronze), and a top rank
      of 12th in the world for the 3x3 Rubik's Cube.
    </p>
    <br />
    <p>
      I work on graduate research in the <Link
        url="https://engineering.case.edu/computer-and-data-sciences/academics/computer-science/bachelor-science"
      >
        CWRU Department of Computer and Data Sciences
      </Link>
      under Dr. Soumya Ray. My work investigates knowledge propogation through networks
      in multi-agent learning systems, and aims to develop dynamic optimization methods
      to improve overall network performance with fixed allocation of expert resources.
    </p>
    <br />
    <p>
      After graduation, I'm transitioning to full time work on Software
      Engineering and Data Science at the
      <Link url="https://www.jhuapl.edu/">
        Johns Hopkins University Applied Physics Laboratory</Link
      >, where I do work on automated biological threat assessment and full stack software engineering with Angular and Java Spring.
    </p>
  </Text>
</Page>
