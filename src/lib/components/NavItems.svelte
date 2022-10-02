<script lang="ts">
  import { isDrawerOpen } from "$lib/utils/stores";
  import type { Route } from "$lib/utils/types";

  export let routes: Route[] = [];
  export let activeHash: string = "";
  export let margin = "";
  export let extraClasses = "";
</script>

{#each routes as route}
  <a
    href={route.id}
    on:click|preventDefault={() => {
      $isDrawerOpen = false;
      document?.getElementById(route.name)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }}
    class:dark:bg-primary-700={activeHash === route.id}
    class:bg-primary-300={activeHash === route.id}
    class:dark:bg-surface-700={activeHash !== route.id}
    class:bg-surface-300={activeHash !== route.id}
    class="{margin} text-sm btn btn-base {extraClasses} dark:text-surface-100 text-surface-800"
    aria-current="page">{route.title}</a
  >
{/each}
