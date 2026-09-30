<script lang="ts">
  // Logo: a cube face in the section's color, or on the home page the picked
  // scramble's front face (CubePicker's `--logo-*`).
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
