import { cube3x3x3 } from "cubing/puzzles";
import type {
  ScrambledCube,
  SolvedScramble,
  StickerColor,
  VisibleFace,
  VisibleFaces,
} from "$lib/data/cube";

// cubing.js's net-diagram fills, by color name.
const fillColors: Record<string, StickerColor> = {
  white: "white",
  yellow: "yellow",
  red: "red",
  orange: "orange",
  limegreen: "green",
  "#26f": "blue",
};

// Faces on cubing.js's 3x3 net, keyed by [column, row] of 3.2-unit blocks.
const netFaces: Record<string, VisibleFace> = { "1,0": "U", "1,1": "F", "2,1": "R" };

interface Slot {
  orbit: string;
  location: number;
  orientation: number;
  face: VisibleFace | undefined;
  index: number;
  color: StickerColor;
}

interface Model {
  kpuzzle: Awaited<ReturnType<typeof cube3x3x3.kpuzzle>>;
  /** Orientations per orbit (e.g. 3 for corners). */
  orientations: Record<string, number>;
  /** Solved color of every slot, keyed `orbit-location-orientation`. */
  solved: Map<string, StickerColor>;
  /** The slots on the U, F, and R faces. */
  visible: Slot[];
}

let model: Promise<Model> | undefined;

/**
 * Everything that depends only on the puzzle, computed once: cubing.js's 3x3
 * definition and every sticker slot in its diagram (which piece location and
 * orientation it shows, where it sits on the net, and its solved color).
 */
function loadModel(): Promise<Model> {
  model ??= Promise.all([cube3x3x3.kpuzzle(), cube3x3x3.svg()]).then(([kpuzzle, svg]) => {
    const slots: Slot[] = [
      ...svg.matchAll(
        /<use\s+id="([A-Z]+)-l(\d+)-o(\d+)"\s+href="#sticker"\s+transform="translate\(([\d.]+),\s*([\d.]+)\)"\s+style="fill:\s*([^"]+)"/g,
      ),
    ].map(([, orbit, location, orientation, x, y, fill]) => {
      const [bx, by] = [Math.floor(+x / 3.2), Math.floor(+y / 3.2)];
      const col = Math.round(+x - bx * 3.2 - 0.1);
      const row = Math.round(+y - by * 3.2 - 0.1);
      return {
        orbit,
        location: +location,
        orientation: +orientation,
        face: netFaces[`${bx},${by}`],
        index: row * 3 + col,
        color: fillColors[fill.trim()],
      };
    });
    return {
      kpuzzle,
      orientations: Object.fromEntries(
        kpuzzle.definition.orbits.map((o) => [o.orbitName, o.numOrientations]),
      ),
      solved: new Map(slots.map((s) => [`${s.orbit}-${s.location}-${s.orientation}`, s.color])),
      visible: slots.filter((s) => s.face),
    };
  });
  return model;
}

/** The U, F, and R faces after applying `scramble` to a solved cube. */
export async function visibleFaces(scramble: string): Promise<VisibleFaces> {
  const { kpuzzle, orientations, solved, visible } = await loadModel();
  const pattern = kpuzzle.defaultPattern().applyAlg(scramble).patternData;

  const faces: VisibleFaces = { U: [], F: [], R: [] };
  for (const slot of visible) {
    const { pieces, orientation } = pattern[slot.orbit];
    const n = orientations[slot.orbit];
    // The piece now in this slot, turned by its orientation offset.
    const shown = (((slot.orientation - orientation[slot.location]) % n) + n) % n;
    faces[slot.face!][slot.index] = solved.get(`${slot.orbit}-${pieces[slot.location]}-${shown}`)!;
  }
  return faces;
}

/**
 * `size` official WCA random-state 3x3 scrambles, each with a solution, so the
 * browser can play them back without loading the solver.
 */
export async function solvedScrambles(size: number): Promise<SolvedScramble[]> {
  const [{ randomScrambleForEvent }, search, { kpuzzle }] = await Promise.all([
    import("cubing/scramble"),
    import("cubing/search"),
    loadModel(),
  ]);
  search.setSearchDebug({ logPerf: false });
  return Promise.all(
    Array.from({ length: size }, async () => {
      const scramble = await randomScrambleForEvent("333");
      const solution = await search.experimentalSolve3x3x3IgnoringCenters(
        kpuzzle.defaultPattern().applyAlg(scramble),
      );
      return { scramble: scramble.toString(), solution: solution.toString() };
    }),
  );
}

/** `size` solved scrambles, with the faces each shows. */
export async function scramblePool(size: number): Promise<ScrambledCube[]> {
  return Promise.all(
    (await solvedScrambles(size)).map(async (solved) => ({
      ...solved,
      faces: await visibleFaces(solved.scramble),
    })),
  );
}
