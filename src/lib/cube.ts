/**
 * A minimal 3x3 Rubik's Cube model. Each sticker has a position and an outward
 * normal in cube coordinates (x right, y up, z toward the viewer); a face turn
 * rotates every sticker in that layer 90° about the face's axis, so any state
 * reached through moves is a real, solvable cube.
 */

export type Color = "white" | "yellow" | "red" | "orange" | "blue" | "green";
export type Face = "U" | "D" | "R" | "L" | "F" | "B";
export type Move = `${Face}${"" | "'" | "2"}`;

type Vec = readonly [number, number, number];

interface Sticker {
  pos: Vec;
  normal: Vec;
  color: Color;
}

export type Cube = readonly Sticker[];

const normals: Record<Face, Vec> = {
  U: [0, 1, 0],
  D: [0, -1, 0],
  R: [1, 0, 0],
  L: [-1, 0, 0],
  F: [0, 0, 1],
  B: [0, 0, -1],
};

// Standard WCA color scheme: white top, green front.
const faceColors: Record<Face, Color> = {
  U: "white",
  D: "yellow",
  R: "red",
  L: "orange",
  F: "green",
  B: "blue",
};

const faces = Object.keys(normals) as Face[];

const dot = (a: Vec, b: Vec) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

/** Rotate v 90° clockwise, as seen looking at the face whose normal is n. */
function rotate(v: Vec, n: Vec): Vec {
  const cross: Vec = [
    n[1] * v[2] - n[2] * v[1],
    n[2] * v[0] - n[0] * v[2],
    n[0] * v[1] - n[1] * v[0],
  ];
  const along = dot(n, v);
  return [n[0] * along - cross[0], n[1] * along - cross[1], n[2] * along - cross[2]];
}

export function solvedCube(): Cube {
  const cube: Sticker[] = [];
  for (const x of [-1, 0, 1])
    for (const y of [-1, 0, 1])
      for (const z of [-1, 0, 1])
        for (const face of faces) {
          const pos: Vec = [x, y, z];
          if (dot(pos, normals[face]) === 1) {
            cube.push({ pos, normal: normals[face], color: faceColors[face] });
          }
        }
  return cube;
}

function turn(cube: Cube, face: Face): Cube {
  const n = normals[face];
  return cube.map((s) =>
    dot(s.pos, n) === 1 ? { ...s, pos: rotate(s.pos, n), normal: rotate(s.normal, n) } : s,
  );
}

export function applyMove(cube: Cube, move: Move): Cube {
  const face = move[0] as Face;
  const times = move.endsWith("2") ? 2 : move.endsWith("'") ? 3 : 1;
  for (let i = 0; i < times; i++) cube = turn(cube, face);
  return cube;
}

export function applyMoves(cube: Cube, moves: readonly Move[]): Cube {
  return moves.reduce(applyMove, cube);
}

export function invertMove(move: Move): Move {
  if (move.endsWith("2")) return move;
  return (move.endsWith("'") ? move[0] : `${move}'`) as Move;
}

export function parseMoves(notation: string): Move[] {
  return notation.trim().split(/\s+/) as Move[];
}

/** The nine stickers of one face, row by row as seen looking straight at it. */
export function faceColorsOf(cube: Cube, face: Face): Color[] {
  const n = normals[face];
  // Screen axes for each face: [right, up] in cube coordinates.
  const axes: Record<Face, [Vec, Vec]> = {
    F: [
      [1, 0, 0],
      [0, 1, 0],
    ],
    B: [
      [-1, 0, 0],
      [0, 1, 0],
    ],
    R: [
      [0, 0, -1],
      [0, 1, 0],
    ],
    L: [
      [0, 0, 1],
      [0, 1, 0],
    ],
    U: [
      [1, 0, 0],
      [0, 0, -1],
    ],
    D: [
      [1, 0, 0],
      [0, 0, 1],
    ],
  };
  const [right, up] = axes[face];
  const grid: Color[] = Array.from({ length: 9 });
  for (const s of cube) {
    if (dot(s.normal, n) !== 1) continue;
    grid[(1 - dot(s.pos, up)) * 3 + (dot(s.pos, right) + 1)] = s.color;
  }
  return grid;
}

const axisOf: Record<Face, number> = { U: 1, D: 1, R: 0, L: 0, F: 2, B: 2 };

/**
 * A random-move scramble in WCA style: never the same face twice in a row, and
 * never three turns on one axis in a row (e.g. R L R), which would cancel.
 */
export function randomScramble(length = 20, random = Math.random): Move[] {
  const suffixes = ["", "'", "2"] as const;
  const moves: Move[] = [];
  while (moves.length < length) {
    const face = faces[Math.floor(random() * faces.length)];
    const prev = moves.at(-1)?.[0] as Face | undefined;
    const prev2 = moves.at(-2)?.[0] as Face | undefined;
    if (face === prev) continue;
    if (prev && prev2 && axisOf[face] === axisOf[prev] && axisOf[prev] === axisOf[prev2]) continue;
    moves.push(`${face}${suffixes[Math.floor(random() * suffixes.length)]}`);
  }
  return moves;
}
