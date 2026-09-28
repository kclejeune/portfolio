<script lang="ts" module>
  export type Sticker = "white" | "yellow" | "red" | "orange" | "blue" | "green";

  // Full class strings so Tailwind picks them up during scanning.
  export const stickerClass: Record<Sticker, string> = {
    white: "bg-sticker-white",
    yellow: "bg-sticker-yellow",
    red: "bg-sticker-red",
    orange: "bg-sticker-orange",
    blue: "bg-sticker-blue",
    green: "bg-sticker-green",
  };
</script>

<script lang="ts">
  import { prefersReducedMotion } from "svelte/motion";

  const colors: Sticker[] = ["white", "yellow", "red", "orange", "blue", "green"];
  const solved: Sticker = "green";

  // A fixed scramble so the prerendered page matches the first client render.
  // Index 4 is the center, which never moves on a real cube.
  let stickers = $state<Sticker[]>([
    "red",
    "white",
    "blue",
    "yellow",
    solved,
    "orange",
    "blue",
    "red",
    "yellow",
  ]);
  let solving = $state(true);

  // Layer by layer, bottom row first — the way a beginner solves.
  const layers = [
    [6, 7, 8],
    [3, 5],
    [0, 1, 2],
  ];
  const layerDelay = 420;
  let timers: ReturnType<typeof setTimeout>[] = [];

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function solve(startDelay: number) {
    clearTimers();
    solving = true;
    if (prefersReducedMotion.current) {
      stickers = stickers.map(() => solved);
      solving = false;
      return;
    }
    layers.forEach((layer, i) => {
      timers.push(
        setTimeout(
          () => {
            for (const index of layer) stickers[index] = solved;
            if (i === layers.length - 1) solving = false;
          },
          startDelay + i * layerDelay,
        ),
      );
    });
  }

  function scramble() {
    if (solving) return;
    const random = () => colors[Math.floor(Math.random() * colors.length)];
    stickers = stickers.map((_, i) => (i === 4 ? solved : random()));
    // Guarantee at least one sticker is visibly out of place.
    if (stickers.every((s) => s === solved)) stickers[0] = "orange";
    solve(900);
  }

  $effect(() => {
    solve(700);
    return clearTimers;
  });

  // Flip a sticker in when its color changes, like a layer turning past.
  function turn(node: HTMLElement, color: Sticker) {
    let shown = color;
    return {
      update(next: Sticker) {
        if (next === shown) return;
        shown = next;
        if (prefersReducedMotion.current) return;
        node.animate(
          [
            { transform: "perspective(300px) rotateX(-90deg)", filter: "brightness(0.6)" },
            { transform: "none", filter: "none" },
          ],
          { duration: 360, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
        );
      },
    };
  }

  const isSolved = $derived(stickers.every((s) => s === solved));
</script>

<button
  type="button"
  onclick={scramble}
  class="group block w-full -rotate-3 cursor-pointer rounded-[9%] bg-plastic p-[4%] shadow-[0_24px_48px_-20px_rgb(0_0_0/0.45)] transition-transform duration-500 ease-[var(--ease-out-quint)] hover:-rotate-1 focus-visible:-rotate-1"
  aria-label={isSolved
    ? "A solved Rubik's Cube face. Press to scramble it."
    : "A Rubik's Cube face, being solved."}
>
  <span class="grid grid-cols-3 gap-[3%]">
    {#each stickers as color, i (i)}
      <span
        use:turn={color}
        class="aspect-square rounded-[9%] shadow-[inset_0_-0.3rem_0_rgb(0_0_0/0.12),inset_0_0.15rem_0_rgb(255_255_255/0.25)] {stickerClass[
          color
        ]}"
      ></span>
    {/each}
  </span>
</button>
