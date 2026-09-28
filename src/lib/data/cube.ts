/**
 * How many random scrambles the home page prerenders. One is picked before
 * first paint on each visit (see `CubePicker`), drawn statically, then solved
 * by the 3D player once it loads; later scrambles come from the player.
 */
export const scramblePoolSize = 5;

/** The 3D player's camera, shared with the static drawing so they line up. */
export const camera = { latitude: 28, longitude: 32, distance: 5.2 } as const;

export type StickerColor = "white" | "yellow" | "red" | "orange" | "blue" | "green";
export type VisibleFace = "U" | "F" | "R";
/** Sticker colors, row by row as seen looking straight at each face. */
export type VisibleFaces = Record<VisibleFace, StickerColor[]>;

/** A scramble and the faces it leaves showing, for drawing without JavaScript. */
export interface ScrambledCube {
  scramble: string;
  faces: VisibleFaces;
}
