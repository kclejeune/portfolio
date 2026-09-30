import { redirect } from "@sveltejs/kit";
import { siteConfig } from "$lib/config";
import type { RequestHandler } from "./$types";

// Merged into /projects.
export const GET: RequestHandler = () => {
  redirect(301, siteConfig.routes.projects.path);
};
