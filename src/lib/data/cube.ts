/**
 * The scramble shown on first load. It's rendered as a static drawing on the
 * server, then solved by the 3D player once it loads; later scrambles come
 * from the official WCA random-state scrambler.
 */
export const initialScramble = "D2 F' R2 U B2 L2 U' F2 R' D B' L U2 R F' D' L2 B U' R2";

export type StickerColor = "white" | "yellow" | "red" | "orange" | "blue" | "green";
export type VisibleFace = "U" | "F" | "R";
/** Sticker colors, row by row as seen looking straight at each face. */
export type VisibleFaces = Record<VisibleFace, StickerColor[]>;
