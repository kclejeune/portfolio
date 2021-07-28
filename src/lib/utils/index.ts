import * as animateScroll from "svelte-scrollto";

export function scrollToElement(selector: string) {
  animateScroll.scrollTo({ element: selector });
}
