import type { PageLoad } from "./$types";

// Rendered per request so the current role's duration stays current.
export const prerender = false;

export const load: PageLoad = ({ setHeaders }) => {
  setHeaders({ "cache-control": "public, max-age=86400" });
};
