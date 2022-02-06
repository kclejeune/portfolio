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
    <p>
      I first started programming on calculators with TI-BASIC back in high
      school, and I've been addicted ever since. Outside of my studies, I'm an
      avid cyclist, musician, linux enthusiast. Prior to college, I was an
      active competitor in the Rubik's Cube speedsolving community. During the
      years when I was actively competing,
      <Link url="https://www.worldcubeassociation.org/persons/2013LEJE03">
        my highlights
      </Link> included a North American Record, 90 podium finishes, and a top global
      rank of of 7th and 12th for the 2x2 and 3x3 Rubik's Cubes, respectively.
    </p>
    <p>
      I recently completed my BS and MS in Computer Science at
      <Link url="https://case.edu/">Case Western Reserve University</Link>
      under Dr. Soumya Ray, with research focused on accelerated training in networked
      learning systems. Now, I work on Software Engineering and Data Science at the
      <Link url="https://www.jhuapl.edu/">
        Johns Hopkins University Applied Physics Laboratory
      </Link>. My current work involves developing automated systems for
      biological threat assessment, full stack software engineering with Angular
      and Java, and DevOps using Ansible and NixOS.
    </p>
  </Text>
</Page>
