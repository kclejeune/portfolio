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
  // Picks one of `size` prerendered scrambles before first paint, and shows
  // it through CSS alone: elements marked `cube-pick` carry a `--cube-N` value
  // per scramble and use `var(--pick)`; `cube-option` elements are one variant
  // per scramble. Without JavaScript nothing is picked and the first shows.
  let { size }: { size: number } = $props();

  const pickScript = $derived(
    `document.documentElement.dataset.cube=String(Math.floor(Math.random()*${size}))`,
  );
  // Split so no closing script tag appears in this file's own script block.
  const closeScript = "</" + "script>";
  const rules = $derived(
    Array.from(
      { length: size },
      (_, i) =>
        `:root[data-cube="${i}"] .cube-pick{--pick:var(--cube-${i})}` +
        `:root[data-cube="${i}"] .cube-option:not([data-option="${i}"]){display:none}`,
    ).join("") + `:root:not([data-cube]) .cube-option:not([data-option="0"]){display:none}`,
  );
</script>

<svelte:head>
  <!-- Generated from a number, not user input. -->
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html `<script>${pickScript}${closeScript}<style>${rules}</style>`}
</svelte:head>
