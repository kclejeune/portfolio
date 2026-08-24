<script lang="ts">
  import type { LanguageStat } from "$lib/utils";

  let { languages }: { languages: LanguageStat[] } = $props();

  const visibleLanguages = $derived(languages.filter((language) => language.name !== "Other"));
  const scale = $derived(
    Math.max(
      1,
      ...visibleLanguages.flatMap((language) => [language.percent, language.historicalPercent]),
    ),
  );

  function width(value: number): number {
    return (value / scale) * 100;
  }

  function delta(language: LanguageStat): number {
    return language.percent - language.historicalPercent;
  }
</script>

<div>
  <div class="mb-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
    <span class="flex items-center gap-2">
      <span class="h-2 w-5 rounded-full bg-primary-500"></span>
      Working set
    </span>
    <span class="flex items-center gap-2">
      <span class="h-3 w-px bg-slate-500 dark:bg-slate-300"></span>
      Long-term footprint
    </span>
  </div>

  <ol class="space-y-4" aria-label="Languages ranked by recent and historical usage">
    {#each visibleLanguages as language, index (language.name)}
      {@const change = delta(language)}
      <li
        class="grid grid-cols-[1.5rem_minmax(5rem,7rem)_1fr_auto] items-center gap-2 sm:gap-3"
        aria-label="{language.name}: {language.percent.toFixed(
          1,
        )}% working-set share, {language.historicalPercent.toFixed(1)}% long-term share"
      >
        <span class="font-mono text-xs text-slate-400 tabular-nums dark:text-slate-500">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          class="flex min-w-0 items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200"
        >
          <span
            class="h-2.5 w-2.5 shrink-0 rounded-full"
            style="background-color: {language.color};"
          ></span>
          <span class="truncate">{language.name}</span>
        </span>
        <span class="relative block h-2 rounded-full bg-slate-100 dark:bg-slate-800">
          <span
            class="absolute inset-y-0 left-0 rounded-full bg-primary-500"
            style="width: {width(language.percent)}%"
          ></span>
          <span
            class="absolute -top-1 h-4 w-px bg-slate-600 dark:bg-slate-300"
            style="left: {width(language.historicalPercent)}%"
            title="Long-term footprint: {language.historicalPercent.toFixed(1)}%"
          ></span>
        </span>
        <span
          class="w-12 text-right font-mono text-xs tabular-nums {change > 0.05
            ? 'text-primary-600 dark:text-primary-400'
            : 'text-slate-400 dark:text-slate-500'}"
          title="{language.percent.toFixed(
            1,
          )}% working-set share; {language.historicalPercent.toFixed(1)}% long-term share"
        >
          {change > 0.05 ? "+" : ""}{change.toFixed(1)}
        </span>
      </li>
    {/each}
  </ol>

  <p class="mt-4 text-right text-[11px] text-slate-400 dark:text-slate-500">
    Change from long-term share, in percentage points
  </p>
</div>
