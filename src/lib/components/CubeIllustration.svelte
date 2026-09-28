<script lang="ts">
  import type { VisibleFace, VisibleFaces } from "$lib/data/cube";

  // A flat-shaded drawing of the cube from the 3D player's camera angle, so
  // it can stand in for the player without JavaScript or while it loads.
  let {
    faces,
    latitude = 28,
    longitude = 32,
    class: className = "",
  }: { faces: VisibleFaces; latitude?: number; longitude?: number; class?: string } = $props();

  type Vec = [number, number, number];

  const polygons = $derived.by(() => {
    const [th, ph] = [(longitude * Math.PI) / 180, (latitude * Math.PI) / 180];
    const right: Vec = [Math.cos(th), 0, -Math.sin(th)];
    const up: Vec = [-Math.sin(ph) * Math.sin(th), Math.cos(ph), -Math.sin(ph) * Math.cos(th)];
    const dot = (a: Vec, b: Vec) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const project = (p: Vec): [number, number] => [dot(p, right), -dot(p, up)];

    // Map a point on a face, in that face's own right/up axes, into 3D.
    const onFace: Record<VisibleFace, (a: number, b: number) => Vec> = {
      U: (a, b) => [a, 1.5, -b],
      F: (a, b) => [a, b, 1.5],
      R: (a, b) => [1.5, b, -a],
    };
    const square = (face: VisibleFace, cx: number, cy: number, half: number) =>
      [
        [cx - half, cy - half],
        [cx + half, cy - half],
        [cx + half, cy + half],
        [cx - half, cy + half],
      ].map(([a, b]) => project(onFace[face](a, b)));

    const shapes: { fill: string; points: [number, number][] }[] = [];
    for (const face of ["U", "F", "R"] as const) {
      shapes.push({ fill: "#111", points: square(face, 0, 0, 1.5) });
      faces[face].forEach((fill, i) => {
        const [row, col] = [Math.floor(i / 3), i % 3];
        shapes.push({ fill, points: square(face, col - 1, 1 - row, 0.43) });
      });
    }
    return shapes;
  });

  const viewBox = $derived.by(() => {
    const all = polygons.flatMap((p) => p.points);
    const xs = all.map(([x]) => x);
    const ys = all.map(([, y]) => y);
    const pad = 0.1;
    const [minX, minY] = [Math.min(...xs) - pad, Math.min(...ys) - pad];
    return `${minX.toFixed(2)} ${minY.toFixed(2)} ${(Math.max(...xs) - minX + pad).toFixed(2)} ${(Math.max(...ys) - minY + pad).toFixed(2)}`;
  });
</script>

<svg
  {viewBox}
  class={className}
  stroke="#111"
  stroke-width="0.04"
  stroke-linejoin="round"
  aria-hidden="true"
>
  {#each polygons as { fill, points }, i (i)}
    <polygon {fill} points={points.map(([x, y]) => `${x.toFixed(3)},${y.toFixed(3)}`).join(" ")} />
  {/each}
</svg>
