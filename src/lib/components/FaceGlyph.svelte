<script lang="ts">
  import type { StickerColor } from "$lib/data/cube";

  // The site's logo: a tiny cube face. Solved in the current section's color,
  // or showing `stickers` (row by row) when a page provides them.
  let { stickers, class: className = "h-6 w-6" }: { stickers?: StickerColor[]; class?: string } =
    $props();

  // Full class strings so Tailwind picks them up during scanning.
  const stickerClass: Record<StickerColor, string> = {
    white: "bg-sticker-white",
    yellow: "bg-sticker-yellow",
    red: "bg-sticker-red",
    orange: "bg-sticker-orange",
    blue: "bg-sticker-blue",
    green: "bg-sticker-green",
  };
</script>

<span
  class="grid shrink-0 grid-cols-3 gap-[1.5px] rounded-[4px] bg-plastic p-[2px] {className}"
  aria-hidden="true"
>
  {#each { length: 9 }, i (i)}
    <span
      class="rounded-[1.5px] transition-colors duration-300 {stickers
        ? stickerClass[stickers[i]]
        : 'bg-accent-sticker'}"
    ></span>
  {/each}
</span>
