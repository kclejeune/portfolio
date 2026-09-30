import { scramblePoolSize } from "$lib/data/cube";
import { scramblePool } from "$lib/server/cube-state";
import type { PageServerLoad } from "./$types";

// Prerendered: fresh scrambles per deploy, and no cubing.js in the browser.
export const load: PageServerLoad = async () => ({
  cube: { pool: await scramblePool(scramblePoolSize) },
});
