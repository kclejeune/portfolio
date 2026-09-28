/// <reference types="@sveltejs/kit" />

// See https://svelte.dev/docs/kit/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      /** The home page's prerendered cube scrambles, also read by the logo. */
      cube?: { pool: import("$lib/data/cube").ScrambledCube[] };
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
