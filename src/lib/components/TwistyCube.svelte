<script lang="ts">
  import { prefersReducedMotion } from "svelte/motion";
  import type { TwistyPlayer } from "cubing/twisty";

  // A fixed scramble so the prerendered page has something to show; later
  // scrambles come from the official WCA random-state scrambler.
  let scramble = $state("D2 F' R2 U B2 L2 U' F2 R' D B' L U2 R F' D' L2 B U' R2");
  let solution = $state<string[]>([]);
  // Number of solution moves already played.
  let played = $state(0);
  let phase = $state<"loading" | "scrambled" | "solving" | "solved">("loading");

  let container: HTMLDivElement;
  let player: TwistyPlayer | undefined;
  let solve3x3: ((scramble: string) => Promise<string>) | undefined;
  let nextScramble: (() => Promise<string>) | undefined;

  async function setUp(alg: string) {
    if (!player || !solve3x3) return;
    phase = "loading";
    scramble = alg;
    solution = [];
    played = 0;
    player.experimentalSetupAlg = alg;
    player.alg = "";
    const solved = await solve3x3(alg);
    solution = solved.split(" ").filter(Boolean);
    player.alg = solved;
    player.jumpToStart();
    phase = "scrambled";
  }

  function solve() {
    if (!player || phase !== "scrambled") return;
    if (prefersReducedMotion.current) {
      player.jumpToEnd();
      return;
    }
    phase = "solving";
    player.play();
  }

  async function onpress() {
    if (phase === "scrambled") return solve();
    if (phase !== "solved" || !nextScramble) return;
    await setUp(await nextScramble());
    // Let the scrambled state register before solving it.
    if (!prefersReducedMotion.current) setTimeout(solve, 600);
  }

  $effect(() => {
    let cancelled = false;

    (async () => {
      const [{ TwistyPlayer }, { randomScrambleForEvent }, search, { cube3x3x3 }] =
        await Promise.all([
          import("cubing/twisty"),
          import("cubing/scramble"),
          import("cubing/search"),
          import("cubing/puzzles"),
        ]);
      if (cancelled) return;
      search.setSearchDebug({
        logPerf: false,
        // Bundlers break the default worker lookup; this path survives Vite builds.
        prioritizeEsbuildWorkaroundForWorkerInstantiation: true,
      });

      const kpuzzle = await cube3x3x3.kpuzzle();
      solve3x3 = async (alg) =>
        (
          await search.experimentalSolve3x3x3IgnoringCenters(kpuzzle.defaultPattern().applyAlg(alg))
        ).toString();
      nextScramble = async () => (await randomScrambleForEvent("333")).toString();

      player = new TwistyPlayer({
        puzzle: "3x3x3",
        visualization: "3D",
        background: "none",
        controlPanel: "none",
        hintFacelets: "none",
        backView: "none",
        experimentalDragInput: "auto",
        tempoScale: 6,
        cameraDistance: 5.2,
        cameraLatitude: 28,
        cameraLongitude: 32,
      });
      player.style.width = "100%";
      player.style.height = "100%";
      // The container has no Svelte-managed children; cubing.js owns this subtree.
      // eslint-disable-next-line svelte/no-dom-manipulating
      container.append(player);

      const model = player.experimentalModel;
      model.currentMoveInfo.addFreshListener((info) => {
        played = info.patternIndex;
      });
      model.coarseTimelineInfo.addFreshListener((timeline) => {
        if (timeline.atEnd && phase !== "loading") phase = "solved";
      });

      await setUp(scramble);
      if (!cancelled && !prefersReducedMotion.current) setTimeout(solve, 900);
    })();

    return () => {
      cancelled = true;
      player?.remove();
    };
  });

  const buttonLabel = $derived(
    {
      loading: "Loading…",
      scrambled: "Solve it",
      solving: "Solving…",
      solved: "Scramble it",
    }[phase],
  );
</script>

<div
  bind:this={container}
  class="aspect-square w-full cursor-grab active:cursor-grabbing"
  role="img"
  aria-label="A 3D Rubik's Cube. Drag to turn it around."
></div>

<div class="mt-4 space-y-2 font-mono text-[0.8rem] leading-relaxed">
  <p class="flex flex-wrap gap-x-[1ch]">
    <span class="w-[9ch] shrink-0 text-muted">Scramble</span>
    <span class="min-w-0 flex-1">{scramble}</span>
  </p>
  <p class="flex flex-wrap gap-x-[1ch]" aria-live="polite">
    <span class="w-[9ch] shrink-0 text-muted">Solution</span>
    <span class="flex min-w-0 flex-1 flex-wrap gap-x-[1ch]">
      {#if solution.length === 0}
        <span class="text-faint">Searching…</span>
      {:else}
        {#each solution as move, i (i)}
          <span class="transition-colors {i < played ? 'text-accent' : ''}">{move}</span>
        {/each}
        <span class="text-faint">({solution.length})</span>
      {/if}
    </span>
  </p>
</div>

<button
  type="button"
  onclick={onpress}
  disabled={phase === "loading" || phase === "solving"}
  class="mt-5 inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3.5 py-2 font-medium transition-colors enabled:hover:border-ink disabled:text-muted"
>
  {buttonLabel}
</button>
