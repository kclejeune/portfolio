<script lang="ts">
  import type { ContributionCalendar, ContributionLevel } from "$lib/utils";

  let { calendar }: { calendar: ContributionCalendar } = $props();

  // Full class strings so Tailwind picks them up during scanning.
  const levelClass: Record<ContributionLevel, string> = {
    0: "bg-slate-100 dark:bg-slate-800",
    1: "bg-primary-200 dark:bg-primary-900",
    2: "bg-primary-300 dark:bg-primary-700",
    3: "bg-primary-400 dark:bg-primary-600",
    4: "bg-primary-500 dark:bg-primary-400",
  };

  const legendLevels: ContributionLevel[] = [0, 1, 2, 3, 4];

  function tooltip(date: string, count: number): string {
    const label = `${count} contribution${count === 1 ? "" : "s"}`;
    if (!date) return label;
    const d = new Date(date);
    return `${label} on ${d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  }
</script>

<div>
  <div class="overflow-x-auto pb-1">
    <div
      class="flex gap-[3px]"
      role="img"
      aria-label="GitHub contribution activity over the last year"
    >
      {#each calendar.weeks as week, w (w)}
        <div class="flex flex-col gap-[3px]">
          {#each week.days as day (day.date)}
            <span
              class="h-2.5 w-2.5 rounded-[2px] {levelClass[day.level]}"
              title={tooltip(day.date, day.count)}
            ></span>
          {/each}
        </div>
      {/each}
    </div>
  </div>

  <div class="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
    <span>{calendar.total.toLocaleString()} contributions in the last year</span>
    <div class="flex items-center gap-1">
      <span>Less</span>
      {#each legendLevels as level (level)}
        <span class="h-2.5 w-2.5 rounded-[2px] {levelClass[level]}"></span>
      {/each}
      <span>More</span>
    </div>
  </div>
</div>
