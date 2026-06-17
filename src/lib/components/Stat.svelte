<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    value,
    label,
    icon,
  }: {
    value: string | number;
    label: string;
    icon?: Snippet;
  } = $props();
</script>

<div class="card flex flex-col items-center gap-1 p-4 text-center">
  {#if icon}
    <div class="mb-1 text-primary-500 dark:text-primary-400">
      {@render icon()}
    </div>
  {/if}
  <div
    class="text-2xl font-semibold tracking-tight text-slate-900 tabular-nums md:text-3xl dark:text-white"
  >
    {value}
  </div>
  <div class="text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
    {label}
  </div>
</div>
