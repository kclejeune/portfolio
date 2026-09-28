import { initialScramble } from "$lib/data/cube";
import { visibleFaces } from "$lib/server/cube-state";
import type { PageServerLoad } from "./$types";

// Computed at prerender time, so cubing.js never ships for the static drawing.
export const load: PageServerLoad = async () => ({
  cube: { scramble: initialScramble, faces: await visibleFaces(initialScramble) },
});
