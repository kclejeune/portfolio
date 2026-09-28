<script lang="ts">
  import { onMount } from "svelte";
  import { prefersReducedMotion } from "svelte/motion";
  import type { TwistyPlayer } from "cubing/twisty";
  import { browser } from "$app/environment";
  import CubeIllustration from "$lib/components/CubeIllustration.svelte";
  import CubePicker, { pickScramble } from "$lib/components/CubePicker.svelte";
  import { camera, type ScrambledCube } from "$lib/data/cube";

  // The server prerenders a pool of scrambles as a static drawing (shown
  // without JavaScript and while the player loads); one is picked per visit,
  // and the player then picks up from that state.
  let { pool }: { pool: ScrambledCube[] } = $props();

  // Seeded once from the picked scramble; later scrambles replace it.
  // svelte-ignore state_referenced_locally
  let scramble = $state(pool[browser ? pickScramble(pool.length) : 0].scramble);
  // Until mounted, render every pooled scramble's text so the markup matches
  // the server's; CubePicker's CSS shows the picked one.
  let mounted = $state(false);
  let solution = $state<string[]>([]);
  // Number of solution moves already played.
  let played = $state(0);
  let phase = $state<"loading" | "scrambled" | "solving" | "solved">("loading");
  // The server-rendered drawing shows until the 3D cube has fully rendered
  // (off-screen, behind it); then the two swap in a single frame, so they're
  // never visible at the same time and there's no blank gap between them.
  let showDrawing = $state(true);

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

  let solveTimer: ReturnType<typeof setTimeout> | undefined;

  /** Solve after a short pause, so the scrambled state registers first. */
  function solveSoon() {
    if (!prefersReducedMotion.current) solveTimer = setTimeout(solve, 600);
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
    solveSoon();
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

  /**
   * Resolve once the 3D cube is actually on screen: its puzzle has loaded, its
   * canvas is in the page, and cubing.js's own canvas fade-in has finished.
   */
  async function revealed(player: TwistyPlayer) {
    await player.experimentalCurrentThreeJSPuzzleObject();
    const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));
    const deadline = performance.now() + 3000;
    while (performance.now() < deadline) {
      await nextFrame();
      // Asked each frame: early on, before the view exists, this is empty.
      const canvases = await player.experimentalCurrentCanvases();
      const attached = canvases.filter((c) => c.isConnected);
      if (attached.length === 0) continue;
      // Reading computed style starts any pending CSS animation, so the fade
      // is visible to getAnimations() even on the frame the canvas attaches.
      const opacities = attached.map((c) => getComputedStyle(c).opacity);
      const fades = attached.flatMap((c) => c.getAnimations());
      if (fades.length > 0) {
        await Promise.allSettled(fades.map((f) => f.finished));
        return;
      }
      if (opacities.every((o) => o === "1")) return;
    }
  }

  onMount(() => (mounted = true));

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
        cameraDistance: camera.distance,
        cameraLatitude: camera.latitude,
        cameraLongitude: camera.longitude,
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

      await Promise.all([setUp(scramble), revealed(player)]);
      if (cancelled()) return;
      showDrawing = false;
      solveSoon();
    })();

    return () => {
      controller.abort();
      clearTimeout(solveTimer);
      player?.remove();
      player = undefined;
    };
  });

  const buttonLabels = {
    loading: "Loading…",
    scrambled: "Solve",
    solving: "Solving…",
    solved: "Scramble",
  } as const;

  const scrambleMoves = $derived(scramble.split(" ").filter(Boolean));

  // Random-state 3x3 scrambles and solutions top out at 21 moves. Every
  // move is at most two monospace characters, so an invisible row of the
  // longest case reserves the most lines a real one can wrap to, keeping the
  // layout still while scrambles and solutions change length.
  const longest = Array.from({ length: 21 }, () => "R2");
</script>

<div
  bind:this={frame}
  class="relative mx-auto aspect-square w-full short:max-w-[36svh] shorter:max-w-[32svh]"
>
  {#if showDrawing}
    <!-- Same camera and geometry as the player, filling the frame like its canvas. -->
    <CubeIllustration class="absolute inset-0 h-full w-full" />
  {/if}
  <!-- No Svelte-managed children: cubing.js owns this subtree. -->
  <div
    bind:this={container}
    class="absolute inset-0 cursor-grab active:cursor-grabbing {showDrawing
      ? 'pointer-events-none opacity-0'
      : ''}"
    role="img"
    aria-label="A 3D Rubik's Cube. Drag to turn it around."
  ></div>
</div>

<!-- An invisible row of the longest case, sharing a grid cell with the real
     text so the row always reserves the most lines it can wrap to. -->
{#snippet reserve(suffix?: string)}
  <span class="invisible col-start-1 row-start-1 flex flex-wrap gap-x-[1ch]" aria-hidden="true">
    {#each longest as move, i (i)}<span>{move}</span>{/each}
    {#if suffix}<span>{suffix}</span>{/if}
  </span>
{/snippet}

<div class="mt-4 space-y-2 font-mono text-[0.8rem] leading-relaxed short:mt-2 short:space-y-1">
  <p class="flex gap-x-[1ch]">
    <span class="w-[9ch] shrink-0 text-muted">Scramble</span>
    <span class="grid min-w-0 flex-1">
      {@render reserve()}
      <span class="col-start-1 row-start-1 flex flex-wrap content-start gap-x-[1ch]">
        {#if mounted}
          {#each scrambleMoves as move, i (i)}<span>{move}</span>{/each}
        {:else}
          {#each pool as option, n (n)}
            <span class="cube-option contents" data-option={n}>
              {#each option.scramble.split(" ") as move, i (i)}<span>{move}</span>{/each}
            </span>
          {/each}
        {/if}
      </span>
    </span>
  </p>
  <p class="flex gap-x-[1ch] no-js:hidden" aria-live="polite">
    <span class="w-[9ch] shrink-0 text-muted">Solution</span>
    <span class="grid min-w-0 flex-1">
      {@render reserve(`(${longest.length})`)}
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
  class="button mt-5 no-js:hidden short:mt-3"
>
  <!-- Every label shares one grid cell, so the button keeps the widest one's size. -->
  <span class="grid justify-items-center">
    {#each Object.entries(buttonLabels) as [key, label] (key)}
      <span
        class="col-start-1 row-start-1 {key === phase ? '' : 'invisible'}"
        aria-hidden={key !== phase}>{label}</span
      >
    {/each}
  </span>
</button>

<CubePicker {pool} />
