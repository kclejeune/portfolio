<script>
  import { fade } from "svelte/transition";
  import { isDrawerOpen } from "$lib/utils/stores";
  export let menuDuration = 200;
</script>

<!-- Mobile menu button-->
<button
  on:click={() => ($isDrawerOpen = !$isDrawerOpen)}
  type="button"
  class="inline-flex items-center justify-center p-2 rounded-md bg-surface-300 dark:bg-surface-700 sm:hidden"
  aria-controls="mobile-menu"
  aria-expanded={$isDrawerOpen}
>
  {#if !$isDrawerOpen}
    <span class="sr-only">Open main menu</span>
    <svg
      class="w-6 h-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
      in:fade={{ duration: menuDuration }}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  {:else}
    <span class="sr-only">Close main menu</span>
    <svg
      class="w-6 h-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden={!$isDrawerOpen}
      in:fade={{ duration: menuDuration }}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  {/if}
</button>
