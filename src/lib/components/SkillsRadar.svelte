<script lang="ts">
  import { Tween } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  let {
    data,
    max = 5,
    label = "Radar chart of relative language usage across repositories",
    showValues = false,
  }: {
    data: { axis: string; level: number }[];
    max?: number;
    /** Accessible description of what the chart shows. */
    label?: string;
    /** Render each axis value (rounded percent) next to its label. */
    showValues?: boolean;
  } = $props();

  const size = 280;
  const center = size / 2;
  const radius = size / 2 - 56; // leave room for labels
  const rings = 4;

  // Vertex angle for axis i (starting at the top, clockwise).
  function angle(i: number): number {
    return (Math.PI * 2 * i) / data.length - Math.PI / 2;
  }

  function point(i: number, r: number): [number, number] {
    return [center + r * Math.cos(angle(i)), center + r * Math.sin(angle(i))];
  }

  function polygon(values: number[], scale = 1): string {
    return values.map((v, i) => point(i, (v / max) * radius * scale).join(",")).join(" ");
  }

  // Grid rings (as fractions of the radius).
  const ringPolys = Array.from({ length: rings }, (_, r) =>
    data.map((_, i) => point(i, (radius * (r + 1)) / rings).join(",")).join(" "),
  );

  const levels = $derived(data.map((d) => d.level));

  // Animate the data polygon outward on mount.
  const grow = new Tween(0, { duration: 800, easing: cubicOut });
  $effect(() => {
    grow.set(1);
  });

  function labelAnchor(x: number): "start" | "middle" | "end" {
    if (x < center - 1) return "end";
    if (x > center + 1) return "start";
    return "middle";
  }
</script>

<svg
  viewBox="0 0 {size} {size}"
  class="mx-auto h-auto w-full max-w-[320px] overflow-visible"
  role="img"
  aria-label={label}
>
  <!-- Grid rings -->
  {#each ringPolys as poly (poly)}
    <polygon
      points={poly}
      class="fill-none stroke-slate-200 dark:stroke-slate-800"
      stroke-width="1"
    />
  {/each}

  <!-- Axes + labels -->
  {#each data as d, i (d.axis)}
    {@const outer = point(i, radius)}
    {@const lp = point(i, radius + 16)}
    <line
      x1={center}
      y1={center}
      x2={outer[0]}
      y2={outer[1]}
      class="stroke-slate-200 dark:stroke-slate-800"
      stroke-width="1"
    />
    <text
      x={lp[0]}
      y={lp[1]}
      text-anchor={labelAnchor(lp[0])}
      dominant-baseline="middle"
      class="fill-slate-600 text-[10px] font-medium dark:fill-slate-300"
    >
      {d.axis}{#if showValues}<tspan class="fill-slate-400 dark:fill-slate-500" dx="3"
          >{Math.round(d.level)}%</tspan
        >{/if}
    </text>
  {/each}

  <!-- Data polygon -->
  <polygon
    points={polygon(levels, grow.current)}
    class="fill-primary-500/20 stroke-primary-500"
    stroke-width="2"
    stroke-linejoin="round"
  />

  <!-- Vertices -->
  {#each levels as level, i (data[i].axis)}
    {@const p = point(i, (level / max) * radius * grow.current)}
    <circle cx={p[0]} cy={p[1]} r="3" class="fill-primary-500">
      <title>{data[i].axis}: {Math.round(level)}{showValues ? "%" : ""}</title>
    </circle>
  {/each}
</svg>
