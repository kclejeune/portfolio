<script lang="ts">
  import Card from "../components/Card.svelte";
  import Page from "../components/Page.svelte";
  import { primaryBackground, neutralBackground } from "../utils/constants";
  const skills: Array<string> = [
    "Python",
    "Scikit-Learn",
    "Tensorflow",
    "Keras",
    "NixOS",
    "Bash",
    "Awk",
    "TypeScript",
    "Javascript",
    "Angular",
    "Vue",
    "Svelte",
    "HTML",
    "CSS",
    "Java",
    "Kotlin",
    "SQL",
    "Scheme",
  ];

  export let backgroundClass = neutralBackground;
</script>

<Page id="skills" title="Technologies I Use" {backgroundClass}>
  <div
    class="container mx-auto grid max-w-screen-xl grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2"
  >
    {#each skills as skill}
      <Card>
        <div class="text-2xl font-medium text-center">
          {skill}
        </div>
      </Card>
    {/each}
  </div>
</Page>
