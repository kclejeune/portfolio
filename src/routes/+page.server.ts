import { scramblePoolSize } from "$lib/data/cube";
import { scramblePool } from "$lib/server/cube-state";
import type { PageServerLoad } from "./$types";

// Runs at prerender time, so every deploy gets a fresh set of scrambles and
// cubing.js never ships to the browser for the static drawing.
export const load: PageServerLoad = async () => ({
  cube: { pool: await scramblePool(scramblePoolSize) },
});
