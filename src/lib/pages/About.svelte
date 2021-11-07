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
      when I was actively competing,
      <Link url="https://www.worldcubeassociation.org/persons/2013LEJE03">
        my highlights
      </Link> included a North American Record, 90 podium finishes, and a top global
      rank of of 7th and 12th for the 2x2 and 3x3 Rubik's Cubes, respectively.
    </p>
    <br />
    <p>
      Currently, I work on graduate machine learning research in the <Link
        url="https://engineering.case.edu/computer-and-data-sciences/academics/computer-science/bachelor-science"
      >
        CWRU Department of Computer and Data Sciences
      </Link>
      under Dr. Soumya Ray. My thesis is focused on accelerated training in communicative
      learning networks using dynamic structure adaptation. After graduation, I'm
      transitioning to full time work on Software Engineering and Data Science at
      the
      <Link url="https://www.jhuapl.edu/">
        Johns Hopkins University Applied Physics Laboratory</Link
      >, where I work on automated systems for biological threat assessment and
      full stack software engineering with Angular, Kotlin, and Java Spring.
    </p>
  </Text>
</Page>
