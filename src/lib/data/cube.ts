/**
 * How many random scrambles the home page prerenders. One is picked before
 * first paint on each visit (see `CubePicker`), drawn statically, then solved
 * by the 3D player once it loads; the rest are played next.
 */
export const scramblePoolSize = 5;

/**
 * Where further scrambles come from once the home page's run out: a
 * prerendered JSON list, so the browser never loads cubing.js's solver.
 */
export const scrambleFeed = { path: "/cube/scrambles.json", size: 100 } as const;

/** The 3D player's camera, shared with the static drawing so they line up. */
export const camera = { latitude: 28, longitude: 32, distance: 5.2 } as const;

export type StickerColor = "white" | "yellow" | "red" | "orange" | "blue" | "green";
export type VisibleFace = "U" | "F" | "R";
/** Sticker colors, row by row as seen looking straight at each face. */
export type VisibleFaces = Record<VisibleFace, StickerColor[]>;

/** The flat sticker colors cubing.js's 3D player renders. */
export const playerColors: Record<StickerColor, string> = {
  white: "#fff",
  yellow: "#ff0",
  red: "#f00",
  orange: "#f90",
  blue: "#26f",
  green: "#0f0",
};

/** A scramble and a solution for it. */
export interface SolvedScramble {
  scramble: string;
  solution: string;
}

/** A solved scramble and the faces it leaves showing, for drawing without JavaScript. */
export interface ScrambledCube extends SolvedScramble {
  faces: VisibleFaces;
}
