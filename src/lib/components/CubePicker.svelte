<script lang="ts" module>
  let firstMount = true;

  /**
   * Which prerendered scramble to show. On a fresh page load it's the one the
   * inline script below picked before first paint; on later visits within the
   * same session, a new pick (never the one just shown), made before the page
   * is inserted.
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
    // Skip over the scramble just shown, so a return visit always changes.
    if (valid && size > 1 && index === current) index = (index + 1) % size;
    root.dataset.cube = String(index);
    return index;
  }
</script>

<script lang="ts">
  import { playerColors, type ScrambledCube } from "$lib/data/cube";

  // Picks one of the prerendered scrambles before first paint and shows it
  // through CSS alone. For the picked scramble it defines `--cube-U0` …
  // `--cube-R8` (the drawing's stickers, in the 3D player's colors) and
  // `--logo-0` … `--logo-8` (the logo's front face, in the site's colors), and
  // hides every `.cube-option` but its own. Without JavaScript nothing is
  // picked and the first scramble shows.
  let { pool }: { pool: ScrambledCube[] } = $props();

  const pickScript = $derived(
    `document.documentElement.dataset.cube=String(Math.floor(Math.random()*${pool.length}))`,
  );
  // Split so no closing script tag appears in this file's own script block.
  const closeScript = "</" + "script>";

  const rules = $derived(
    pool
      .map(({ faces }, i) => {
        const stickers = (["U", "F", "R"] as const)
          .flatMap((face) => faces[face].map((c, n) => `--cube-${face}${n}:${playerColors[c]}`))
          .join(";");
        const logo = faces.F.map((c, n) => `--logo-${n}:var(--color-sticker-${c})`).join(";");
        // The first scramble also covers the no-JavaScript case.
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
