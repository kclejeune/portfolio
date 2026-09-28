import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    prerender: {
      // Cloudflare's /cdn-cgi paths (image resizing) exist only at the edge.
      handleHttpError: ({ path, message }) => {
        if (path.startsWith("/cdn-cgi/")) return;
        throw new Error(message);
      },
    },
  },
};

export default config;
