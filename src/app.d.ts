/// <reference types="@sveltejs/kit" />

// See https://svelte.dev/docs/kit/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}

    /** The subset of Workers KV used here (see wrangler.jsonc). */
    interface KVNamespace {
      get<T = unknown>(key: string, type: "json"): Promise<T | null>;
      put(key: string, value: string): Promise<void>;
    }

    interface Platform {
      env?: { GITHUB_CACHE?: KVNamespace };
      context?: { waitUntil(promise: Promise<unknown>): void };
    }
  }
}

export {};
