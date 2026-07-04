import { redirect } from "@sveltejs/kit";
import { siteConfig } from "$lib/config.svelte";
import type { RequestHandler } from "./$types";

// Skills now lives on the consolidated Projects & Skills page.
export const GET: RequestHandler = () => {
  redirect(301, siteConfig.routes.projects.path);
};
