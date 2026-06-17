<script lang="ts">
  import type { LanguageStat } from "$lib/utils";

  let { languages }: { languages: LanguageStat[] } = $props();
</script>

<div>
  <!-- Stacked proportional bar -->
  <div class="flex h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
    {#each languages as lang (lang.name)}
      <span
        class="h-full first:rounded-l-full last:rounded-r-full"
        style="width: {lang.percent}%; background-color: {lang.color};"
        title="{lang.name} · {lang.percent.toFixed(1)}%"
      ></span>
    {/each}
  </div>

  <!-- Legend -->
  <ul class="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
    {#each languages as lang (lang.name)}
      <li class="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
        <span class="h-2.5 w-2.5 rounded-full" style="background-color: {lang.color};"></span>
        <span class="font-medium">{lang.name}</span>
        <span class="text-slate-400 tabular-nums dark:text-slate-500">
          {lang.percent.toFixed(1)}%
        </span>
      </li>
    {/each}
  </ul>
</div>
