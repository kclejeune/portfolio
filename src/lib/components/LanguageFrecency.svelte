<script lang="ts">
  import type { LanguageStat } from "$lib/github";

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
  <ol class="space-y-3.5" aria-label="Languages ranked by weighted share">
    {#each visibleLanguages as language (language.name)}
      {@const change = delta(language)}
      <li
        class="grid grid-cols-[minmax(5.5rem,7.5rem)_1fr_3.25rem] items-center gap-3"
        aria-label="{language.name}: {language.percent.toFixed(
          1,
        )}% weighted, {language.historicalPercent.toFixed(1)}% long-term"
      >
        <span class="flex min-w-0 items-center gap-2 font-medium">
          <span
            class="h-2.5 w-2.5 shrink-0 rounded-[2px]"
            style="background-color: {language.color};"
          ></span>
          <span class="truncate">{language.name}</span>
        </span>
        <span class="relative block h-3 rounded-[3px] bg-sunken">
          <span
            class="absolute inset-y-0 left-0 rounded-[3px] bg-accent-sticker"
            style="width: {width(language.percent)}%"
          ></span>
          <span
            class="absolute -top-1 h-5 w-0.5 rounded-full bg-ink"
            style="left: {width(language.historicalPercent)}%"
            title="Long-term: {language.historicalPercent.toFixed(1)}%"
          ></span>
        </span>
        <span
          class="text-right text-sm tabular-nums {change > 0.05
            ? 'font-semibold text-accent'
            : 'text-faint'}"
        >
          {change > 0.05 ? "+" : ""}{change.toFixed(1)}
        </span>
      </li>
    {/each}
  </ol>

  <div class="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted">
    <span class="flex items-center gap-2">
      <span class="h-2.5 w-5 rounded-[2px] bg-accent-sticker"></span>
      Weighted share
    </span>
    <span class="flex items-center gap-2">
      <span class="h-3.5 w-0.5 rounded-full bg-ink"></span>
      Long-term share
    </span>
    <span>± change from long-term share, in points</span>
  </div>
</div>
