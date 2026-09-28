<script lang="ts">
  import type { ContributionCalendar, ContributionLevel } from "$lib/utils";

  let { calendar }: { calendar: ContributionCalendar } = $props();

  // Full class strings so Tailwind picks them up during scanning.
  const levelClass: Record<ContributionLevel, string> = {
    0: "bg-sunken",
    1: "bg-accent-sticker/25",
    2: "bg-accent-sticker/50",
    3: "bg-accent-sticker/75",
    4: "bg-accent-sticker",
  };

  const legendLevels: ContributionLevel[] = [0, 1, 2, 3, 4];

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Weekday guide rows (GitHub convention: label alternating rows).
  const weekdayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  function monthOf(week: { days: { date: string }[] }): number {
    const date = week.days[0]?.date;
    return date ? new Date(date).getMonth() : -1;
  }

  // Label each column where a new month begins; drop a label that would
  // collide with the next one (a partial month at the very start).
  const monthLabels = $derived.by(() => {
    const labels: (string | null)[] = calendar.weeks.map((week, w) => {
      const month = monthOf(week);
      if (month === -1) return null;
      if (w === 0 || month !== monthOf(calendar.weeks[w - 1])) return monthNames[month];
      return null;
    });
    const first = labels.findIndex(Boolean);
    const second = labels.findIndex((l, i) => Boolean(l) && i > first);
    if (first !== -1 && second !== -1 && second - first < 3) labels[first] = null;
    return labels;
  });

  // Show the most recent activity first when the grid overflows.
  function scrollToEnd(el: HTMLElement) {
    el.scrollLeft = el.scrollWidth;
  }

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
  <div class="flex gap-2">
    <!-- Weekday guide (kept outside the scroll container) -->
    <div
      class="mt-[18px] flex flex-col gap-[3px] text-[11px] leading-none text-faint"
      aria-hidden="true"
    >
      {#each weekdayLabels as label, i (i)}
        <span class="flex h-3.5 items-center">{label}</span>
      {/each}
    </div>

    <div class="min-w-0 flex-1 overflow-x-auto pb-1" use:scrollToEnd>
      <div class="w-max">
        <!-- Month labels -->
        <div
          class="mb-[4px] flex h-3.5 gap-[3px] text-[11px] leading-none text-faint"
          aria-hidden="true"
        >
          {#each monthLabels as label, w (w)}
            <span class="relative w-3.5 shrink-0">
              {#if label}
                <span class="absolute top-0 left-0 whitespace-nowrap">{label}</span>
              {/if}
            </span>
          {/each}
        </div>

        <!-- Day grid -->
        <div
          class="flex gap-[3px]"
          role="img"
          aria-label="GitHub contribution activity over the last year"
        >
          {#each calendar.weeks as week, w (w)}
            <div class="flex flex-col gap-[3px]">
              {#each week.days as day (day.date)}
                <span
                  class="h-3.5 w-3.5 rounded-[3px] {levelClass[day.level]}"
                  title={tooltip(day.date, day.count)}
                ></span>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <div
    class="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 text-sm text-muted"
  >
    <span>{calendar.total.toLocaleString()} contributions in the last year</span>
    <div class="flex items-center gap-1">
      <span>Less</span>
      {#each legendLevels as level (level)}
        <span class="h-3.5 w-3.5 rounded-[3px] {levelClass[level]}"></span>
      {/each}
      <span>More</span>
    </div>
  </div>
</div>
