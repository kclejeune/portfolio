<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    position = "top",
    themable = true,
    hidden = false,
    children,
  }: {
    position?: "top" | "bottom";
    themable?: boolean;
    hidden?: boolean;
    children?: Snippet;
  } = $props();

  const baseClasses = "w-full px-4 backdrop-blur-sm";

  const positionClasses = $derived(
    position === "top" ? "fixed top-0 z-50 h-14" : "py-4"
  );

  const themeClasses = $derived(
    themable
      ? "bg-white/70 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-700/50"
      : "bg-white/5 border-transparent"
  );

  const borderClasses = $derived(position === "top" ? "border-b" : "border-t");

  const hiddenClasses = $derived(hidden ? "hidden sm:block" : "");
</script>

<div
  class="{baseClasses} {positionClasses} {themeClasses} {borderClasses} {hiddenClasses}"
>
  <div class="max-w-4xl mx-auto h-full flex items-center">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>
