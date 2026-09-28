<script lang="ts">
  // The site's logo: a tiny cube face, solved in the current section's color.
  // On the home page, CubePicker defines `--logo-0` … `--logo-8` so it shows
  // the front face of the cube's picked scramble instead.
  let { class: className = "h-6 w-6" }: { class?: string } = $props();
</script>

<span
  class="grid shrink-0 grid-cols-3 gap-[1.5px] rounded-[4px] bg-plastic p-[2px] {className}"
  aria-hidden="true"
>
  {#each { length: 9 }, i (i)}
    <span
      class="rounded-[1.5px] transition-colors duration-300"
      style="background-color: var(--logo-{i}, var(--color-accent-sticker))"
    ></span>
  {/each}
</span>
