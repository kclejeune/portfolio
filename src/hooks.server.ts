import type { Handle } from "@sveltejs/kit";

export const handle: Handle = ({ event, resolve }) => {
  // Cloudflare answers /cdn-cgi at the edge, so only the prerenderer (following
  // image srcsets) reaches the app; skip handleError's 404 log for it.
  if (event.url.pathname.startsWith("/cdn-cgi/")) return new Response(null, { status: 404 });
  return resolve(event);
};
