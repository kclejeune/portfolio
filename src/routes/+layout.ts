// Prerender all static pages at build time so they're served directly from
// Workers Assets without invoking the Worker. Dynamic routes opt out.
export const prerender = true;
