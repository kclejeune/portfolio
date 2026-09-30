<script lang="ts">
  import { onMount } from "svelte";
  import { prefersReducedMotion } from "svelte/motion";
  import type { TwistyPlayer } from "cubing/twisty";
  import { browser } from "$app/environment";
  import CubeIllustration from "$lib/components/CubeIllustration.svelte";
  import CubePicker, { pickScramble } from "$lib/components/CubePicker.svelte";
  import { camera, scrambleFeed, type ScrambledCube, type SolvedScramble } from "$lib/data/cube";

  // A prerendered pool of scrambles, drawn statically until the 3D player
  // loads and continues from the one picked for this visit.
  let { pool }: { pool: ScrambledCube[] } = $props();

  // svelte-ignore state_referenced_locally
  const picked = browser ? pickScramble(pool.length) : 0;
  let current = $state<SolvedScramble>();
  // The rest of the pool plays next, then the prerendered feed.
  // svelte-ignore state_referenced_locally
  const upcoming: SolvedScramble[] = pool.filter((_, i) => i !== picked);
  let feed: Promise<SolvedScramble[]> | undefined;
  // Until mounted, every pooled scramble renders (matching SSR); CubePicker's CSS shows one.
  let mounted = $state(false);
  // Solution moves played or playing, for highlighting.
  let played = $state(0);
  let phase = $state<"scrambled" | "solving" | "solved">("scrambled");
  let busy = $state(false);
  let loadError = $state(false);
  // The drawing covers the player until it has fully rendered, then they swap
  // in one frame: no overlap, no blank gap.
  let showDrawing = $state(true);

  let container: HTMLDivElement;
  let player: TwistyPlayer | undefined;
  let ready: Promise<void> | undefined;
  let disposed = false;

  function setUp(cube: SolvedScramble) {
    if (!player) return;
    current = cube;
    played = 0;
    player.experimentalSetupAlg = cube.scramble;
    player.alg = cube.solution;
    player.jumpToStart();
    phase = "scrambled";
  }

  /** The prerendered feed, fetched once (and again if that fails). */
  function loadFeed() {
    return (feed ??= fetch(scrambleFeed.path)
      .then((res) => {
        if (!res.ok) throw new Error(`Scramble feed: ${res.status}`);
        return res.json() as Promise<SolvedScramble[]>;
      })
      .catch((error) => {
        feed = undefined;
        throw error;
      }));
  }

  /**
   * The next scramble. The feed is fetched as the pool's last one is taken and
   * replayed from a random offset, so visitors don't all see the same sequence.
   */
  async function nextCube(): Promise<SolvedScramble> {
    if (upcoming.length === 0) {
      const all = await loadFeed();
      const start = Math.floor(Math.random() * all.length);
      upcoming.push(...all.slice(start), ...all.slice(0, start));
    }
    const next = upcoming.shift()!;
    if (upcoming.length === 0) loadFeed().catch(() => {});
    return next;
  }

  function solve() {
    if (!player || phase !== "scrambled") return;
    phase = "solving";
    if (prefersReducedMotion.current) {
      player.jumpToEnd();
      return;
    }
    player.play();
  }

  async function onpress() {
    if (busy || phase === "solving") return;
    busy = true;
    loadError = false;
    try {
      await ensurePlayer();
      if (disposed) return;
      if (phase === "scrambled") solve();
      else {
        const cube = await nextCube();
        if (!disposed) setUp(cube);
      }
    } catch (error) {
      console.error("Cube loading failed:", error);
      loadError = true;
    } finally {
      busy = false;
    }
  }

  // Warms the player on hover/focus; a failure here is retried on press.
  function prefetch() {
    ensurePlayer().catch(() => {});
  }

  /** Resolves once the puzzle is loaded, its canvas attached, and cubing.js's fade-in done. */
  async function revealed(player: TwistyPlayer) {
    await player.experimentalCurrentThreeJSPuzzleObject();
    const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));
    const deadline = performance.now() + 3000;
    while (!disposed && performance.now() < deadline) {
      await nextFrame();
      // Empty until the view exists.
      const canvases = await player.experimentalCurrentCanvases();
      const attached = canvases.filter((c) => c.isConnected);
      if (attached.length === 0) continue;
      // Reading computed style starts pending animations, so getAnimations() sees the fade.
      const opacities = attached.map((c) => getComputedStyle(c).opacity);
      const fades = attached.flatMap((c) => c.getAnimations());
      if (fades.length > 0) {
        await Promise.allSettled(fades.map((f) => f.finished));
        return;
      }
      if (opacities.every((o) => o === "1")) return;
    }
  }

  onMount(() => {
    mounted = true;
    return () => {
      disposed = true;
      player?.pause();
      player?.remove();
      player = undefined;
    };
  });

  function ensurePlayer(): Promise<void> {
    return (ready ??= initializePlayer().catch((error) => {
      player?.remove();
      player = undefined;
      ready = undefined;
      throw error;
    }));
  }

  async function initializePlayer() {
    // Renderer only; solutions were prerendered, so no solver.
    const { TwistyPlayer } = await import("cubing/twisty");
    if (disposed) return;

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
      // `patternIndex` excludes moves animating or finishing (the last move
      // only ever finishes); count them so the highlight keeps pace.
      const count = info.patternIndex + info.currentMoves.length + info.movesFinishing.length;
      played = Math.min(count, solution.length);
    });
    model.coarseTimelineInfo.addFreshListener((timeline) => {
      // An empty timeline is also at its end, before the first scramble is set.
      if (timeline.atEnd && phase === "solving") {
        phase = "solved";
        played = solution.length;
      }
    });

    setUp(pool[picked]);
    await revealed(player);
    if (disposed) return;
    showDrawing = false;
  }

  const buttonLabels = {
    loading: "Loading…",
    scrambled: "Solve",
    solving: "Solving…",
    solved: "Scramble",
  } as const;

  const scrambleMoves = $derived((current ?? pool[picked]).scramble.split(" ").filter(Boolean));
  const solution = $derived(current?.solution.split(" ").filter(Boolean) ?? []);

  // Scrambles and solutions are at most 21 moves of at most 2 chars; rendering
  // that invisibly reserves the max wrapped height so the layout never shifts.
  const longest = Array.from({ length: 21 }, () => "R2");
</script>

<div
  role="img"
  aria-label="A 3D Rubik’s Cube. Drag to turn it around once loaded."
  onpointerenter={prefetch}
  onpointerdown={prefetch}
  class="relative mx-auto aspect-square w-full short:max-w-[36svh] shorter:max-w-[32svh]"
>
  {#if showDrawing}
    <CubeIllustration class="absolute inset-0 h-full w-full" />
  {/if}
  <!-- No Svelte-managed children: cubing.js owns this subtree. -->
  <div
    bind:this={container}
    class="absolute inset-0 cursor-grab active:cursor-grabbing {showDrawing
      ? 'pointer-events-none opacity-0'
      : ''}"
  ></div>
</div>

<!-- Shares a grid cell with the real text (see `longest`). -->
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
        <!-- Hidden until Solve, so warming the player on hover changes nothing visible. -->
        {#if phase === "scrambled" || solution.length === 0}
          <span class="text-faint">Click Solve to play.</span>
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
  onpointerenter={prefetch}
  onfocus={prefetch}
  onpointerdown={prefetch}
  disabled={busy || phase === "solving"}
  class="button mt-5 no-js:hidden short:mt-3"
>
  <!-- Labels share one grid cell, so the button keeps the widest one's width. -->
  <span class="grid justify-items-center">
    {#each Object.entries(buttonLabels) as [key, label] (key)}
      <span
        class="col-start-1 row-start-1 {key === (busy ? 'loading' : phase) ? '' : 'invisible'}"
        aria-hidden={key !== (busy ? "loading" : phase)}>{label}</span
      >
    {/each}
  </span>
</button>

{#if loadError}
  <p class="mt-2 text-sm text-muted" role="status">The cube couldn’t load. Please try again.</p>
{/if}

<CubePicker {pool} />
