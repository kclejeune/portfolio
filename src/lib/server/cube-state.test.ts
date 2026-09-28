import { cube3x3x3 } from "cubing/puzzles";
import { describe, expect, it } from "vitest";
import { scramblePool, visibleFaces } from "./cube-state";

const [white, yellow, red, orange, blue, green] = [
  "white",
  "yellow",
  "red",
  "orange",
  "blue",
  "green",
] as const;

describe("visibleFaces", () => {
  it("shows a solved cube in the standard color scheme", async () => {
    const faces = await visibleFaces("");
    expect(faces.U).toEqual(Array(9).fill(white));
    expect(faces.F).toEqual(Array(9).fill(green));
    expect(faces.R).toEqual(Array(9).fill(red));
  });

  it("U brings the right face's top row to the front", async () => {
    const { F } = await visibleFaces("U");
    expect(F).toEqual([red, red, red, ...Array(6).fill(green)]);
  });

  it("R brings the bottom face up the front's right column", async () => {
    const { F, U } = await visibleFaces("R");
    expect([F[2], F[5], F[8]]).toEqual([yellow, yellow, yellow]);
    expect([U[2], U[5], U[8]]).toEqual([green, green, green]);
  });

  it("F moves the left face onto the top's bottom row", async () => {
    const { U } = await visibleFaces("F");
    expect(U.slice(6)).toEqual([orange, orange, orange]);
  });

  it("matches the 3D player's render of the initial scramble", async () => {
    const faces = await visibleFaces("D2 F' R2 U B2 L2 U' F2 R' D B' L U2 R F' D' L2 B U' R2");
    expect(faces.F).toEqual([orange, yellow, white, white, green, red, red, white, red]);
    expect(faces.U).toEqual([yellow, yellow, orange, blue, white, red, blue, green, orange]);
    expect(faces.R).toEqual([blue, white, green, blue, red, red, green, yellow, green]);
  });

  it("builds a pool of distinct random-state scrambles, each with a solution", async () => {
    const pool = await scramblePool(4);
    expect(pool).toHaveLength(4);
    expect(new Set(pool.map((p) => p.scramble)).size).toBe(4);
    const puzzle = await cube3x3x3.kpuzzle();
    for (const { scramble, faces, solution } of pool) {
      expect(scramble.split(" ").length).toBeLessThanOrEqual(21);
      expect(solution.split(" ").length).toBeLessThanOrEqual(21);
      expect(
        puzzle
          .defaultPattern()
          .applyAlg(scramble)
          .applyAlg(solution)
          .experimentalIsSolved({ ignorePuzzleOrientation: true, ignoreCenterOrientation: true }),
      ).toBe(true);
      expect(faces.U[4]).toBe(white);
      expect(faces.F[4]).toBe(green);
      expect(faces.R[4]).toBe(red);
      expect(Object.values(faces).every((f) => f.length === 9)).toBe(true);
    }
  }, 30_000);
});
