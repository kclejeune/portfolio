import { browser } from "$app/environment";
import { MediaQuery } from "svelte/reactivity";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";
const prefersDark = new MediaQuery("(prefers-color-scheme: dark)");

// localStorage throws when storage is blocked (e.g. some private modes).
function readStored(): Theme {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : "system";
  } catch {
    return "system";
  }
}

function writeStored(theme: Theme) {
  try {
    if (theme === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Not persisted; still applied for this page.
  }
}

function apply(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  // Match the browser chrome (e.g. mobile address bar) to the page.
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", getComputedStyle(document.body).backgroundColor);
}

class ThemeStore {
  current = $state<Theme>(browser ? readStored() : "system");

  constructor() {
    if (browser) {
      $effect.root(() => {
        $effect(() => apply(this.resolved === "dark"));
      });
    }
  }

  /** The theme on screen, with "system" resolved. */
  get resolved(): "light" | "dark" {
    if (this.current !== "system") return this.current;
    return prefersDark.current ? "dark" : "light";
  }

  set(theme: Theme) {
    this.current = theme;
    if (browser) writeStored(theme);
  }

  toggle() {
    this.set(this.resolved === "dark" ? "light" : "dark");
  }
}

export const theme = new ThemeStore();
