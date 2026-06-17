<script lang="ts">
  import { theme } from "$lib/theme.svelte";
  import { SunIcon, MoonIcon, MonitorIcon } from "$lib/components/icons";

  let {
    themable = true,
  }: {
    themable?: boolean;
  } = $props();

  const label = $derived(
    theme.current === "system"
      ? "Theme: system"
      : theme.current === "dark"
        ? "Theme: dark"
        : "Theme: light",
  );

  const buttonClass = $derived(
    themable
      ? "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
      : "text-white/70 hover:bg-white/10 hover:text-white",
  );
</script>

<button
  type="button"
  onclick={() => theme.toggle()}
  class="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors {buttonClass}"
  aria-label={label}
  title={label}
>
  {#if theme.current === "system"}
    <MonitorIcon class="h-5 w-5" />
  {:else if theme.current === "dark"}
    <MoonIcon class="h-5 w-5" />
  {:else}
    <SunIcon class="h-5 w-5" />
  {/if}
</button>
