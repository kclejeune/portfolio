<script lang="ts" module>
  let firstMount = true;

  /**
   * Which prerendered scramble to show. On a fresh page load it's the one the
   * inline script below picked before first paint; on later visits within the
   * same session, a new pick, made before the page is inserted.
   */
  export function pickScramble(size: number): number {
    const root = document.documentElement;
    let index = Number(root.dataset.cube);
    if (!firstMount || !Number.isInteger(index) || index < 0 || index >= size) {
      index = Math.floor(Math.random() * size);
      root.dataset.cube = String(index);
    }
    firstMount = false;
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
