<script lang="ts">
  import { camera as defaultCamera } from "$lib/data/cube";
  import type { StickerColor, VisibleFace, VisibleFaces } from "$lib/data/cube";

  // A flat-shaded drawing of the cube through the same perspective camera and
  // geometry as cubing.js's 3D player, so it can stand in for the player
  // (without JavaScript, or while it loads) and line up with it exactly.
  // The drawing fills a square box the same way the player's canvas does.
  let {
    faces,
    latitude = defaultCamera.latitude,
    longitude = defaultCamera.longitude,
    distance = defaultCamera.distance,
    class: className = "",
  }: {
    faces: VisibleFaces;
    latitude?: number;
    longitude?: number;
    distance?: number;
    class?: string;
  } = $props();

  type Vec = [number, number, number];

  // The flat colors cubing.js's 3D player renders, so the swap is seamless.
  const playerColors: Record<StickerColor, string> = {
    white: "#fff",
    yellow: "#ff0",
    red: "#f00",
    orange: "#f90",
    blue: "#26f",
    green: "#0f0",
  };

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

  const polygons = $derived.by(() => {
    // Camera on a sphere around the origin, as three.js's Spherical places it:
    // polar angle from +y is 90° − latitude, azimuth from +z is longitude.
    const polar = ((90 - latitude) * Math.PI) / 180;
    const azimuth = (longitude * Math.PI) / 180;
    const camera: Vec = [
      distance * Math.sin(polar) * Math.sin(azimuth),
      distance * Math.cos(polar),
      distance * Math.sin(polar) * Math.cos(azimuth),
    ];
    const forward = normalize(sub([0, 0, 0], camera));
    const right = normalize(cross(forward, [0, 1, 0]));
    const up = cross(right, forward);
    const focal = 1 / Math.tan(((fieldOfView / 2) * Math.PI) / 180);

    // Perspective-project a world point into the unit square (0–1, y down).
    const project = (p: Vec): [number, number] => {
      const v = sub(p, camera);
      const depth = dot(v, forward);
      return [(1 + (focal * dot(v, right)) / depth) / 2, (1 - (focal * dot(v, up)) / depth) / 2];
    };

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
      ].map(([a, b]) => project(onFace[face](a, b)));

    const shapes: { fill: string; opacity?: number; points: [number, number][] }[] = [];

    // Translucent cubie bodies, farthest first (as three.js sorts transparent
    // objects), drawing only the faces that point toward the camera.
    const cubies: Vec[] = [];
    for (const x of [-1, 0, 1])
      for (const y of [-1, 0, 1])
        for (const z of [-1, 0, 1]) if (x || y || z) cubies.push([x * cubie, y * cubie, z * cubie]);
    const distanceTo = (p: Vec) => Math.hypot(...sub(p, camera));
    cubies.sort((a, b) => distanceTo(b) - distanceTo(a));
    const r = cubie / 2;
    for (const center of cubies) {
      for (const axis of [0, 1, 2]) {
        for (const sign of [-1, 1]) {
          const faceCenter = [...center] as Vec;
          faceCenter[axis] += sign * r;
          const normal: Vec = [0, 0, 0];
          normal[axis] = sign;
          if (dot(sub(camera, faceCenter), normal) <= 0) continue;
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
          shapes.push({ fill: "#000", opacity: cubieOpacity, points: corners });
        }
      }
    }

    for (const face of ["U", "F", "R"] as const) {
      faces[face].forEach((color, i) => {
        const [row, col] = [Math.floor(i / 3), i % 3];
        shapes.push({
          fill: playerColors[color],
          points: square(face, (col - 1) * cubie, (1 - row) * cubie, stickerHalf),
        });
      });
    }
    return shapes;
  });
</script>

<svg viewBox="0 0 1 1" class={className} aria-hidden="true">
  {#each polygons as { fill, opacity, points }, i (i)}
    <polygon
      {fill}
      fill-opacity={opacity}
      points={points.map(([x, y]) => `${x.toFixed(4)},${y.toFixed(4)}`).join(" ")}
    />
  {/each}
</svg>
