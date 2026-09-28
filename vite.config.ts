import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  build: {
    // cubing.js runs its solver in a module worker that lazily imports more
    // chunks. Vite's preload helper for those imports touches `document`,
    // which throws inside a worker. SvelteKit still emits modulepreload links
    // for each page's own dependencies.
    modulePreload: false,
  },
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
