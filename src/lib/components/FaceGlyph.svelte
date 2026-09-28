<script lang="ts">
  import type { StickerColor } from "$lib/data/cube";

  // The site's logo: a tiny cube face. Solved in the current section's color,
  // or, when a page provides `pool` (one front face per prerendered scramble),
  // showing whichever scramble CubePicker picked.
  let { pool, class: className = "h-6 w-6" }: { pool?: StickerColor[][]; class?: string } =
    $props();

  const color = (c: StickerColor) => `var(--color-sticker-${c})`;

  function stickerStyle(i: number): string | undefined {
    if (!pool?.length) return undefined;
    const colors = pool.map((face) => color(face[i]));
    return (
      colors.map((c, n) => `--cube-${n}:${c};`).join("") +
      `background-color:var(--pick,${colors[0]})`
    );
  }
</script>

<span
  class="grid shrink-0 grid-cols-3 gap-[1.5px] rounded-[4px] bg-plastic p-[2px] {className}"
  aria-hidden="true"
>
  {#each { length: 9 }, i (i)}
    <span
      class="rounded-[1.5px] transition-colors duration-300 {pool?.length
        ? 'cube-pick'
        : 'bg-accent-sticker'}"
      style={stickerStyle(i)}
    ></span>
  {/each}
</span>
