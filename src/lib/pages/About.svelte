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
      I first started programming on calculators with TI-BASIC back in high school, and I've been addicted ever since.
      Outside of my studies, I'm an avid cyclist, musician, linux enthusiast.
      Prior to college, I was an active competitor in the Rubik's Cube speedsolving community, where
      <Link url="https://www.worldcubeassociation.org/persons/2013LEJE03">
        my highlights
      </Link> included a North American Record, 90 podium finishes, and global 12th place rank for the 3x3 Rubik's Cube.
    </p>
    <p>
      I recently completed my BS and MS in Computer Science at <Link url="https://case.edu/">Case Western Reserve University</Link>
      with my thesis "Dynamic Structure Adaptation for Communities of Learning Machines," supervised by Dr. Soumya Ray.
      Post-graduation, I'm working on Software Engineering and Data Science at the
      <Link url="https://www.jhuapl.edu/">
        Johns Hopkins University Applied Physics Laboratory
      </Link>.
      My current work involves building automated software systems for chemical/biological threat assessment and detecting weapons of mass destruction.
    </p>
  </Text>
</Page>
