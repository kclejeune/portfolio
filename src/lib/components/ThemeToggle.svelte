<script lang="ts">
  import { theme } from "$lib/theme.svelte";
  import { SunIcon, MoonIcon } from "$lib/components/icons";

  const isDark = $derived(theme.resolved === "dark");
  const label = $derived(isDark ? "Switch to light theme" : "Switch to dark theme");
</script>

<button
  type="button"
  onclick={() => theme.toggle()}
  class="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-sunken hover:text-ink"
  aria-label={label}
  title={label}
>
  {#if isDark}
    <SunIcon class="h-5 w-5" />
  {:else}
    <MoonIcon class="h-5 w-5" />
  {/if}
</button>
