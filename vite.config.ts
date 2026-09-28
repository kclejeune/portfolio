import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";

/**
 * cubing.js runs its solver in a module worker whose chunks lazily import more
 * chunks. Vite's preload helper for those imports touches `document`, which
 * throws inside a worker. This collects every chunk reachable from cubing.js's
 * worker entry, so preloading can be skipped for imports made from them (and
 * only them).
 */
function cubingWorkerChunks(): Plugin & { chunks: Set<string> } {
  const chunks = new Set<string>();
  return {
    name: "cubing-worker-chunks",
    chunks,
    generateBundle: {
      // Before Vite's import analysis, which calls resolveDependencies.
      order: "pre",
      handler(_, bundle) {
        const entry = Object.values(bundle).find(
          (output) =>
            output.type === "chunk" &&
            output.moduleIds.some((id) => /cubing.*search-worker-entry\.js$/.test(id)),
        );
        const queue = entry ? [entry.fileName] : [];
        for (let file = queue.pop(); file; file = queue.pop()) {
          if (chunks.has(file)) continue;
          chunks.add(file);
          const output = bundle[file];
          if (output?.type === "chunk") queue.push(...output.imports, ...output.dynamicImports);
        }
      },
    },
  };
}

const cubingWorker = cubingWorkerChunks();

export default defineConfig({
  plugins: [tailwindcss(), sveltekit(), cubingWorker],
  build: {
    modulePreload: {
      resolveDependencies: (_, deps, { hostId }) => (cubingWorker.chunks.has(hostId) ? [] : deps),
    },
  },
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
