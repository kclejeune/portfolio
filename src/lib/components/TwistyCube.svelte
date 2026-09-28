<script lang="ts">
  import { prefersReducedMotion } from "svelte/motion";
  import type { TwistyPlayer } from "cubing/twisty";
  import CubeIllustration from "$lib/components/CubeIllustration.svelte";
  import type { VisibleFaces } from "$lib/data/cube";

  // The server renders `initial` as a static drawing (shown without JavaScript
  // and while the player loads); the player then picks up from that state.
  let { initial }: { initial: { scramble: string; faces: VisibleFaces } } = $props();

  // Seeded once from the prerendered state; later scrambles replace it.
  // svelte-ignore state_referenced_locally
  let scramble = $state(initial.scramble);
  let solution = $state<string[]>([]);
  // Number of solution moves already played.
  let played = $state(0);
  let phase = $state<"loading" | "scrambled" | "solving" | "solved">("loading");
  let playerReady = $state(false);

  let container: HTMLDivElement;
  // Observed for visibility; the player container stays hidden until ready.
  let frame: HTMLDivElement;
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

  /**
   * Resolve once the page has finished loading, the cube is near the viewport,
   * and the browser is idle, so cubing.js and three.js never compete with the
   * first paint (and are never fetched if the cube is never scrolled to).
   */
  function whenNeeded(el: HTMLElement, signal: AbortSignal): Promise<void> {
    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) =>
            window.addEventListener("load", () => resolve(), { once: true, signal }),
          );
    const visible = new Promise<void>((resolve) => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            observer.disconnect();
            resolve();
          }
        },
        { rootMargin: "200px" },
      );
      observer.observe(el);
      signal.addEventListener("abort", () => observer.disconnect());
    });
    return Promise.all([loaded, visible]).then(
      () =>
        new Promise<void>((resolve) => {
          if ("requestIdleCallback" in window)
            requestIdleCallback(() => resolve(), { timeout: 1500 });
          else setTimeout(resolve, 200);
        }),
    );
  }

  $effect(() => {
    const controller = new AbortController();
    const cancelled = () => controller.signal.aborted;

    (async () => {
      await whenNeeded(frame, controller.signal);
      if (cancelled()) return;

      const [{ TwistyPlayer }, { randomScrambleForEvent }, search, { cube3x3x3 }] =
        await Promise.all([
          import("cubing/twisty"),
          import("cubing/scramble"),
          import("cubing/search"),
          import("cubing/puzzles"),
        ]);
      if (cancelled()) return;
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
        // Keep in sync with CubeIllustration's defaults.
        cameraLatitude: 28,
        cameraLongitude: 32,
      });
      player.style.width = "100%";
      player.style.height = "100%";
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
      playerReady = true;
      if (!cancelled() && !prefersReducedMotion.current) setTimeout(solve, 900);
    })();

    return () => {
      controller.abort();
      player?.remove();
    };
  });

  const buttonLabels = {
    loading: "Loading…",
    scrambled: "Solve it",
    solving: "Solving…",
    solved: "Scramble it",
  } as const;

  const scrambleMoves = $derived(scramble.split(" ").filter(Boolean));

  // Random-state 3x3 scrambles and solutions top out at 21 moves. Every
  // move is at most two monospace characters, so an invisible row of the
  // longest case reserves the most lines a real one can wrap to, keeping the
  // layout still while scrambles and solutions change length.
  const longest = Array.from({ length: 21 }, () => "R2");
</script>

<div bind:this={frame} class="relative aspect-square w-full">
  {#if !playerReady}
    <CubeIllustration faces={initial.faces} class="absolute inset-0 m-auto h-[82%] w-auto" />
  {/if}
  <!-- No Svelte-managed children: cubing.js owns this subtree. -->
  <div
    bind:this={container}
    class="absolute inset-0 cursor-grab active:cursor-grabbing"
    role="img"
    aria-label="A 3D Rubik's Cube. Drag to turn it around."
    hidden={!playerReady}
  ></div>
</div>

<div class="mt-4 space-y-2 font-mono text-[0.8rem] leading-relaxed">
  <p class="flex gap-x-[1ch]">
    <span class="w-[9ch] shrink-0 text-muted">Scramble</span>
    <span class="grid min-w-0 flex-1">
      <span class="invisible col-start-1 row-start-1 flex flex-wrap gap-x-[1ch]" aria-hidden="true">
        {#each longest as move, i (i)}<span>{move}</span>{/each}
      </span>
      <span class="col-start-1 row-start-1 flex flex-wrap gap-x-[1ch]">
        {#each scrambleMoves as move, i (i)}<span>{move}</span>{/each}
      </span>
    </span>
  </p>
  <p class="flex gap-x-[1ch] no-js:hidden" aria-live="polite">
    <span class="w-[9ch] shrink-0 text-muted">Solution</span>
    <span class="grid min-w-0 flex-1">
      <span class="invisible col-start-1 row-start-1 flex flex-wrap gap-x-[1ch]" aria-hidden="true">
        {#each longest as move, i (i)}<span>{move}</span>{/each}
        <span>({longest.length})</span>
      </span>
      <span class="col-start-1 row-start-1 flex flex-wrap content-start gap-x-[1ch]">
        {#if solution.length === 0}
          <span class="text-faint">Searching…</span>
        {:else}
          {#each solution as move, i (i)}
            <span class="transition-colors {i < played ? 'text-accent' : ''}">{move}</span>
          {/each}
          <span class="text-faint">({solution.length})</span>
        {/if}
      </span>
    </span>
  </p>
</div>

<button
  type="button"
  onclick={onpress}
  disabled={phase === "loading" || phase === "solving"}
  class="mt-5 no-js:hidden rounded-lg border border-line bg-surface px-3.5 py-2 font-medium transition-colors enabled:hover:border-ink disabled:text-muted"
>
  <!-- Every label shares one grid cell, so the button keeps the widest one's size. -->
  <span class="grid justify-items-start">
    {#each Object.entries(buttonLabels) as [key, label] (key)}
      <span
        class="col-start-1 row-start-1 {key === phase ? '' : 'invisible'}"
        aria-hidden={key !== phase}>{label}</span
      >
    {/each}
  </span>
</button>
