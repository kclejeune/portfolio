import { readable, writable, type Readable, type Writable } from "svelte/store";
import type { Route } from "$lib/utils/types";

// maintain nav drawer state
export const isDrawerOpen: Writable<boolean> = writable(true);

// maintain current page location
export const activeHash: Writable<string> = writable("");

// maintain list of available routes for nav items
export const routes: Readable<Route[]> = readable([
  {
    id: "#home",
    route: "/home",
    name: "home",
    title: "Home",
  },
  {
    id: "#about",
    route: "/about",
    name: "about",
    title: "About Me",
  },
  {
    id: "#work",
    route: "/work",
    name: "work",
    title: "Work Experience",
  },
  {
    id: "#projects",
    route: "/projects",
    name: "projects",
    title: "Projects",
  },
  {
    id: "#skills",
    route: "/skills",
    name: "skills",
    title: "Skills",
  },
]);
