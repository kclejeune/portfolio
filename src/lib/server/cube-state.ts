import { cube3x3x3 } from "cubing/puzzles";
import type { VisibleFace, VisibleFaces } from "$lib/data/cube";

// cubing.js's net-diagram colors, mapped to the ones its 3D player renders.
const playerColors: Record<string, string> = {
  white: "#fff",
  yellow: "#ff0",
  red: "#f00",
  orange: "#f90",
  limegreen: "#0f0",
  "#26f": "#26f",
};

// Faces on cubing.js's 3x3 net, keyed by [column, row] of 3.2-unit blocks.
const netFaces: Record<string, VisibleFace> = { "1,0": "U", "1,1": "F", "2,1": "R" };

interface Slot {
  orbit: string;
  location: number;
  orientation: number;
  face: VisibleFace | undefined;
  index: number;
  color: string;
}

let slots: Promise<Slot[]> | undefined;

/**
 * Every sticker slot in cubing.js's 3x3 diagram: which piece location and
 * orientation it shows, where it sits on the net, and its solved color.
 */
function loadSlots(): Promise<Slot[]> {
  slots ??= cube3x3x3.svg().then((svg) =>
    [
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
        color: playerColors[fill.trim()] ?? fill.trim(),
      };
    }),
  );
  return slots;
}

/** The U, F, and R faces after applying `scramble` to a solved cube. */
export async function visibleFaces(scramble: string): Promise<VisibleFaces> {
  const [kpuzzle, allSlots] = await Promise.all([cube3x3x3.kpuzzle(), loadSlots()]);
  const pattern = kpuzzle.defaultPattern().applyAlg(scramble).patternData;
  const orientations = Object.fromEntries(
    kpuzzle.definition.orbits.map((o) => [o.orbitName, o.numOrientations]),
  );
  const solved = new Map(
    allSlots.map((s) => [`${s.orbit}-${s.location}-${s.orientation}`, s.color]),
  );

  const faces: VisibleFaces = { U: [], F: [], R: [] };
  for (const slot of allSlots) {
    if (!slot.face) continue;
    const { pieces, orientation } = pattern[slot.orbit];
    const n = orientations[slot.orbit];
    // The piece now in this slot, turned by its orientation offset.
    const shown = (((slot.orientation - orientation[slot.location]) % n) + n) % n;
    faces[slot.face][slot.index] = solved.get(`${slot.orbit}-${pieces[slot.location]}-${shown}`)!;
  }
  return faces;
}
