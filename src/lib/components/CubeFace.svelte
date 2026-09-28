<script lang="ts">
  import { prefersReducedMotion } from "svelte/motion";
  import {
    applyMoves,
    faceColorsOf,
    parseMoves,
    randomScramble,
    solvedCube,
    type Color,
    type Move,
  } from "$lib/cube";

  // Full class strings so Tailwind picks them up during scanning.
  const stickerClass: Record<Color, string> = {
    white: "bg-sticker-white",
    yellow: "bg-sticker-yellow",
    red: "bg-sticker-red",
    orange: "bg-sticker-orange",
    blue: "bg-sticker-blue",
    green: "bg-sticker-green",
  };

  const solved = solvedCube();

  // A fixed scramble so the prerendered page matches the first client render.
  let scramble = $state<Move[]>(
    parseMoves("D2 F' R2 U B2 L2 U' F2 R' D B' L U2 R F' D' L2 B U' R2"),
  );
  // How many scramble moves are currently applied. Solving undoes them in
  // reverse, one face turn at a time, so every frame is a real cube state.
  let applied = $state(scramble.length);
  let busy = $state(false);

  const front = $derived(faceColorsOf(applyMoves(solved, scramble.slice(0, applied)), "F"));
  const isSolved = $derived(applied === 0);

  const scrambleInterval = 70;
  const solveInterval = 160;
  let timer: ReturnType<typeof setTimeout> | undefined;

  /** Step `applied` toward `target`, one move per `interval`. */
  function step(target: number, interval: number, then?: () => void) {
    clearTimeout(timer);
    if (applied === target) {
      then?.();
      return;
    }
    timer = setTimeout(() => {
      applied += applied < target ? 1 : -1;
      step(target, interval, then);
    }, interval);
  }

  function solve(delay: number) {
    busy = true;
    if (prefersReducedMotion.current) {
      applied = 0;
      busy = false;
      return;
    }
    timer = setTimeout(() => step(0, solveInterval, () => (busy = false)), delay);
  }

  function onpress() {
    if (busy) return;
    if (prefersReducedMotion.current) {
      // No animation: one press scrambles, the next solves.
      if (isSolved) scramble = randomScramble();
      applied = isSolved ? scramble.length : 0;
      return;
    }
    scramble = randomScramble();
    busy = true;
    applied = 0;
    step(scramble.length, scrambleInterval, () => solve(700));
  }

  $effect(() => {
    solve(900);
    return () => clearTimeout(timer);
  });

  // Flip a sticker in when its color changes, like a layer turning past.
  function turn(node: HTMLElement, color: Color) {
    let shown = color;
    return {
      update(next: Color) {
        if (next === shown) return;
        shown = next;
        if (prefersReducedMotion.current) return;
        node.animate(
          [
            { transform: "perspective(300px) rotateX(-90deg)", filter: "brightness(0.6)" },
            { transform: "none", filter: "none" },
          ],
          { duration: 150, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
        );
      },
    };
  }
</script>

<button
  type="button"
  onclick={onpress}
  class="@container block aspect-square w-full -rotate-3 cursor-pointer rounded-[9%] bg-plastic p-[4.5%] shadow-[0_24px_48px_-20px_rgb(0_0_0/0.45)] transition-transform duration-500 ease-[var(--ease-out-quint)] hover:-rotate-1 focus-visible:-rotate-1"
  aria-label={isSolved
    ? "A solved Rubik's Cube face. Press to scramble it."
    : "A scrambled Rubik's Cube face, being solved."}
>
  <!-- cqw keeps row and column gaps equal; a % row gap would overflow the body. -->
  <span class="grid h-full grid-cols-3 grid-rows-3 gap-[3cqw]">
    {#each front as color, i (i)}
      <span
        use:turn={color}
        class="rounded-[9%] shadow-[inset_0_-0.3rem_0_rgb(0_0_0/0.12),inset_0_0.15rem_0_rgb(255_255_255/0.25)] {stickerClass[
          color
        ]}"
      ></span>
    {/each}
  </span>
</button>

<p class="mt-8 flex flex-wrap gap-x-[0.75ch] text-sm leading-relaxed text-muted">
  {#each scramble as move, i (i)}
    <span class="transition-opacity duration-150 {i < applied ? 'text-ink' : 'opacity-35'}"
      >{move}</span
    >
  {/each}
</p>
