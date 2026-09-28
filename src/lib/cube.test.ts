import { describe, expect, it } from "vitest";
import {
  applyMove,
  applyMoves,
  faceColorsOf,
  invertMove,
  parseMoves,
  randomScramble,
  solvedCube,
  type Face,
} from "./cube";

const faces: Face[] = ["U", "D", "R", "L", "F", "B"];
const isSolved = (cube: ReturnType<typeof solvedCube>) =>
  faces.every((f) => new Set(faceColorsOf(cube, f)).size === 1);

describe("cube model", () => {
  it("starts solved in the standard color scheme", () => {
    const cube = solvedCube();
    expect(cube).toHaveLength(54);
    expect(faceColorsOf(cube, "F")).toEqual(Array(9).fill("green"));
    expect(faceColorsOf(cube, "U")).toEqual(Array(9).fill("white"));
    expect(faceColorsOf(cube, "R")).toEqual(Array(9).fill("red"));
  });

  it("U brings the right face's top row to the front", () => {
    const front = faceColorsOf(applyMove(solvedCube(), "U"), "F");
    expect(front.slice(0, 3)).toEqual(["red", "red", "red"]);
    expect(front.slice(3)).toEqual(Array(6).fill("green"));
  });

  it("R brings the bottom face up the front's right column", () => {
    const front = faceColorsOf(applyMove(solvedCube(), "R"), "F");
    expect([front[2], front[5], front[8]]).toEqual(["yellow", "yellow", "yellow"]);
    expect([front[0], front[3], front[6]]).toEqual(["green", "green", "green"]);
  });

  it("F moves the left face onto the top's bottom row", () => {
    const cube = applyMove(solvedCube(), "F");
    expect(faceColorsOf(cube, "F")).toEqual(Array(9).fill("green"));
    expect(faceColorsOf(cube, "U").slice(6)).toEqual(["orange", "orange", "orange"]);
  });

  it("repeating a move four times is the identity", () => {
    for (const face of faces) {
      expect(isSolved(applyMoves(solvedCube(), [face, face, face, face]))).toBe(true);
    }
  });

  it("(R U R' U') six times returns to solved", () => {
    const sexy = parseMoves("R U R' U'");
    expect(isSolved(applyMoves(solvedCube(), Array(6).fill(sexy).flat()))).toBe(true);
    expect(isSolved(applyMoves(solvedCube(), Array(5).fill(sexy).flat()))).toBe(false);
  });

  it("undoing a scramble in reverse solves the cube", () => {
    const scramble = randomScramble();
    const scrambled = applyMoves(solvedCube(), scramble);
    expect(isSolved(scrambled)).toBe(false);
    const undo = scramble.toReversed().map(invertMove);
    expect(isSolved(applyMoves(scrambled, undo))).toBe(true);
  });

  it("keeps nine of each color and fixed centers when scrambled", () => {
    const cube = applyMoves(solvedCube(), randomScramble(40));
    const counts = new Map<string, number>();
    for (const s of cube) counts.set(s.color, (counts.get(s.color) ?? 0) + 1);
    expect([...counts.values()]).toEqual(Array(6).fill(9));
    expect(faceColorsOf(cube, "F")[4]).toBe("green");
  });

  it("generates WCA-style scrambles without redundant turns", () => {
    for (let i = 0; i < 50; i++) {
      const moves = randomScramble(25);
      expect(moves).toHaveLength(25);
      for (let j = 1; j < moves.length; j++) expect(moves[j][0]).not.toBe(moves[j - 1][0]);
    }
  });
});
