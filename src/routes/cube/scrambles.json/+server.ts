import { json } from "@sveltejs/kit";
import { scrambleFeed } from "$lib/data/cube";
import { solvedScrambles } from "$lib/server/cube-state";
import type { RequestHandler } from "./$types";

// Static feed the player draws from once the home page's pool runs out.
export const prerender = true;

export const GET: RequestHandler = async () => json(await solvedScrambles(scrambleFeed.size));
