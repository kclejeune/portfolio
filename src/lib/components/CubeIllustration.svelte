<script lang="ts" module>
  import { camera, type VisibleFace } from "$lib/data/cube";

  // Flat drawing of the cube through cubing.js's camera and geometry, so it
  // lines up exactly with the 3D player it stands in for. Computed once per
  // module; sticker colors come from CubePicker's `--cube-*` variables.

  type Vec = [number, number, number];

  // cubing.js's camera and 3x3 geometry: a 20° vertical field of view, a cube
  // spanning ±0.5 (unit cubies scaled by 1/3), and stickers covering 85% of
  // each cubie face. Each cubie is a black box at 30% opacity, so the gaps
  // between stickers darken where several cubies overlap.
  const fieldOfView = 20;
  const half = 0.5;
  const cubie = 1 / 3;
  const stickerHalf = (0.85 * cubie) / 2;
  const cubieOpacity = 0.3;

  const sub = (a: Vec, b: Vec): Vec => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const dot = (a: Vec, b: Vec) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a: Vec, b: Vec): Vec => [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
  const normalize = (v: Vec): Vec => {
    const length = Math.hypot(...v);
    return [v[0] / length, v[1] / length, v[2] / length];
  };

  // The eye sits on a sphere around the origin, as three.js's Spherical places
  // it: polar angle from +y is 90° − latitude, azimuth from +z is longitude.
  const polar = ((90 - camera.latitude) * Math.PI) / 180;
  const azimuth = (camera.longitude * Math.PI) / 180;
  const eye: Vec = [
    camera.distance * Math.sin(polar) * Math.sin(azimuth),
    camera.distance * Math.cos(polar),
    camera.distance * Math.sin(polar) * Math.cos(azimuth),
  ];
  const forward = normalize(sub([0, 0, 0], eye));
  const right = normalize(cross(forward, [0, 1, 0]));
  const up = cross(right, forward);
  const focal = 1 / Math.tan(((fieldOfView / 2) * Math.PI) / 180);

  // Perspective-project a world point into the unit square (0–1, y down).
  function project(p: Vec): string {
    const v = sub(p, eye);
    const depth = dot(v, forward);
    const x = (1 + (focal * dot(v, right)) / depth) / 2;
    const y = (1 - (focal * dot(v, up)) / depth) / 2;
    return `${x.toFixed(4)},${y.toFixed(4)}`;
  }

  // A point on a face, in that face's own right/up axes, in world space.
  const onFace: Record<VisibleFace, (a: number, b: number) => Vec> = {
    U: (a, b) => [a, half, -b],
    F: (a, b) => [a, b, half],
    R: (a, b) => [half, b, -a],
  };
  const square = (face: VisibleFace, cx: number, cy: number, r: number) =>
    [
      [cx - r, cy - r],
      [cx + r, cy - r],
      [cx + r, cy + r],
      [cx - r, cy + r],
    ]
      .map(([a, b]) => project(onFace[face](a, b)))
      .join(" ");

  // Translucent cubie bodies, farthest first (as three.js sorts transparent
  // objects), drawing only the faces that point toward the camera.
  const bodies: string[] = [];
  const cubies: Vec[] = [];
  for (const x of [-1, 0, 1])
    for (const y of [-1, 0, 1])
      for (const z of [-1, 0, 1]) if (x || y || z) cubies.push([x * cubie, y * cubie, z * cubie]);
  const distanceTo = (p: Vec) => Math.hypot(...sub(p, eye));
  cubies.sort((a, b) => distanceTo(b) - distanceTo(a));
  const r = cubie / 2;
  for (const center of cubies) {
    for (const axis of [0, 1, 2]) {
      for (const sign of [-1, 1]) {
        const faceCenter = [...center] as Vec;
        faceCenter[axis] += sign * r;
        const normal: Vec = [0, 0, 0];
        normal[axis] = sign;
        if (dot(sub(eye, faceCenter), normal) <= 0) continue;
        // The face's two in-plane axes.
        const [u, v] = [0, 1, 2].filter((a) => a !== axis);
        const corners = [
          [-r, -r],
          [r, -r],
          [r, r],
          [-r, r],
        ].map(([du, dv]) => {
          const point = [...faceCenter] as Vec;
          point[u] += du;
          point[v] += dv;
          return project(point);
        });
        bodies.push(corners.join(" "));
      }
    }
  }

  const stickers = (["U", "F", "R"] as const).flatMap((face) =>
    Array.from({ length: 9 }, (_, i) => ({
      color: `var(--cube-${face}${i})`,
      points: square(face, ((i % 3) - 1) * cubie, (1 - Math.floor(i / 3)) * cubie, stickerHalf),
    })),
  );
</script>

<script lang="ts">
  let { class: className = "" }: { class?: string } = $props();
</script>

<svg viewBox="0 0 1 1" class={className} aria-hidden="true">
  {#each bodies as points, i (i)}
    <polygon fill="#000" fill-opacity={cubieOpacity} {points} />
  {/each}
  {#each stickers as { color, points }, i (i)}
    <polygon style="fill: {color}" {points} />
  {/each}
</svg>
