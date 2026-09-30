<script lang="ts">
  import { Tween } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  let {
    data,
    label,
  }: {
    data: { axis: string; level: number }[];
    /** Accessible description of what the chart shows. */
    label: string;
  } = $props();

  const size = 280;
  const center = size / 2;
  const radius = size / 2 - 56; // room for axis labels
  const rings = 4;
  const max = 5;

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

  const ringPolys = $derived(
    Array.from({ length: rings }, (_, r) =>
      data.map((_, i) => point(i, (radius * (r + 1)) / rings).join(",")).join(" "),
    ),
  );

  const levels = $derived(data.map((d) => d.level));

  // Grows the data polygon outward on mount.
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
  {#each ringPolys as poly (poly)}
    <polygon points={poly} class="fill-none stroke-line" stroke-width="1" />
  {/each}

  {#each data as d, i (d.axis)}
    {@const outer = point(i, radius)}
    {@const lp = point(i, radius + 16)}
    <line
      x1={center}
      y1={center}
      x2={outer[0]}
      y2={outer[1]}
      class="stroke-line"
      stroke-width="1"
    />
    <text
      x={lp[0]}
      y={lp[1]}
      text-anchor={labelAnchor(lp[0])}
      dominant-baseline="middle"
      class="fill-muted text-[10px] font-medium"
    >
      {d.axis}
    </text>
  {/each}

  <polygon
    points={polygon(levels, grow.current)}
    class="fill-accent-sticker/20 stroke-accent"
    stroke-width="2"
    stroke-linejoin="round"
  />

  {#each levels as level, i (data[i].axis)}
    {@const p = point(i, (level / max) * radius * grow.current)}
    <circle cx={p[0]} cy={p[1]} r="3" class="fill-accent">
      <title>{data[i].axis}: {Math.round(level)}</title>
    </circle>
  {/each}
</svg>
