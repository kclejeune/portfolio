<script lang="ts" module>
  let firstMount = true;

  /**
   * Index of the scramble to show: on first load, the inline script's pick;
   * on client-side revisits, a fresh one that differs from the last.
   */
  export function pickScramble(size: number): number {
    const root = document.documentElement;
    const current = Number(root.dataset.cube);
    const valid = Number.isInteger(current) && current >= 0 && current < size;
    if (firstMount && valid) {
      firstMount = false;
      return current;
    }
    firstMount = false;
    let index = Math.floor(Math.random() * size);
    if (valid && size > 1 && index === current) index = (index + 1) % size;
    root.dataset.cube = String(index);
    return index;
  }
</script>

<script lang="ts">
  import { playerColors, type ScrambledCube } from "$lib/data/cube";

  // Picks a scramble before first paint and shows it with CSS alone: defines
  // `--cube-U0`…`--cube-R8` (drawing, player colors) and `--logo-0`…`--logo-8`
  // (logo, site colors), and hides the other `.cube-option`s. Without
  // JavaScript, the first scramble shows.
  let { pool }: { pool: ScrambledCube[] } = $props();

  const pickScript = $derived(
    `document.documentElement.dataset.cube=String(Math.floor(Math.random()*${pool.length}))`,
  );
  // Split so it doesn't close this component's own script block.
  const closeScript = "</" + "script>";

  const rules = $derived(
    pool
      .map(({ faces }, i) => {
        const stickers = (["U", "F", "R"] as const)
          .flatMap((face) => faces[face].map((c, n) => `--cube-${face}${n}:${playerColors[c]}`))
          .join(";");
        const logo = faces.F.map((c, n) => `--logo-${n}:var(--color-sticker-${c})`).join(";");
        // The first also covers no-JS.
        const root =
          i === 0 ? `:root:not([data-cube]),:root[data-cube="0"]` : `:root[data-cube="${i}"]`;
        const others = i === 0 ? `:root:not([data-cube]) .cube-option:not([data-option="0"]),` : "";
        return (
          `${root}{${stickers};${logo}}` +
          `${others}:root[data-cube="${i}"] .cube-option:not([data-option="${i}"]){display:none}`
        );
      })
      .join(""),
  );
</script>

<svelte:head>
  <!-- Generated from prerendered cube data, not user input. -->
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html `<script>${pickScript}${closeScript}<style>${rules}</style>`}
</svelte:head>
