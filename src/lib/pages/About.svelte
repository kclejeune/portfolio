<script lang="ts">
  import Link from "$lib/components/Link.svelte";
  import Page from "$lib/components/Page.svelte";
  import Text from "$lib/components/Text.svelte";
  import { primaryBackground } from "$lib/utils/constants";

  interface Props {
    backgroundClass?: string;
  }

  let { backgroundClass = primaryBackground }: Props = $props();
</script>

<Page id="about" title="The Essentials" {backgroundClass}>
  <Text>
    <p>Hey, I'm Kennan!</p>
    <p>
      I first started programming on calculators with TI-BASIC back in high
      school, and I've been addicted ever since. In my spare time, I love
      cycling, skiing, and contributing to open-source software. Previously, I
      was an active competitor in the Rubik's Cube speedsolving community, where
      <Link url="https://www.worldcubeassociation.org/persons/2013LEJE03">
        my highlights
      </Link> included a North American Record, 90 podium finishes, and global 12th
      place rank for the 3x3 Rubik's Cube.
    </p>
    <p>
      I completed my BS and MS in Computer Science at <Link
        url="https://case.edu/"
      >
        Case Western Reserve University
      </Link>
      with my thesis "Dynamic Structure Adaptation for Communities of Learning Machines,"
      supervised by Dr. Soumya Ray. Now, I'm a full-stack software engineer at <Link
        url="https://www.jhuapl.edu/"
      >
        the Johns Hopkins University Applied Physics Laboratory,
      </Link>
      where my current work focuses on applying NLP and semantic knowledge representation
      methods to detect early stage biothreats from large-scale public data sources.
      In conjunction with this work, I specialize in using DevOps tools to build
      higher quality software and optimize developer workflows.
    </p>
  </Text>
</Page>
