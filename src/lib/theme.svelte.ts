import { browser } from "$app/environment";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";

function systemPrefersDark(): boolean {
  return browser && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function readStored(): Theme {
  if (!browser) return "system";
  const value = localStorage.getItem(STORAGE_KEY);
  return value === "light" || value === "dark" ? value : "system";
}

function apply(theme: Theme) {
  if (!browser) return;
  const dark = theme === "dark" || (theme === "system" && systemPrefersDark());
  document.documentElement.classList.toggle("dark", dark);
  // Keep the browser chrome (mobile address bar, etc.) matching the theme.
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? "#0f1117" : "#f8f9fb");
}

class ThemeStore {
  current = $state<Theme>("system");

  constructor() {
    if (browser) {
      this.current = readStored();
      // Keep the document in sync with the OS while in "system" mode.
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        if (this.current === "system") apply("system");
      });
    }
  }

  /** The theme actually shown on screen (resolves "system"). */
  get resolved(): "light" | "dark" {
    if (this.current === "system") {
      return systemPrefersDark() ? "dark" : "light";
    }
    return this.current;
  }

  set(theme: Theme) {
    this.current = theme;
    if (browser) {
      if (theme === "system") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, theme);
      apply(theme);
    }
  }

  /** Flip between light and dark based on what's currently shown. */
  toggle() {
    this.set(this.resolved === "dark" ? "light" : "dark");
  }
}

export const theme = new ThemeStore();
