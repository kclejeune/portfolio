import { json } from "@sveltejs/kit";
import { scrambleFeed } from "$lib/data/cube";
import { solvedScrambles } from "$lib/server/cube-state";
import type { RequestHandler } from "./$types";

// Written at build time, like the home page's scrambles, and served as a
// static file: the player's supply once those run out.
export const prerender = true;

export const GET: RequestHandler = async () => json(await solvedScrambles(scrambleFeed.size));
