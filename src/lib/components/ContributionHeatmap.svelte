<script lang="ts">
  import type { ContributionCalendar, ContributionLevel } from "$lib/github";

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

  function monthOf(week: { days: { date: string }[] }): number {
    const date = week.days[0]?.date;
    return date ? new Date(date).getUTCMonth() : -1;
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

  // Shared: toLocaleDateString builds a formatter per call.
  const dateFormat = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  function tooltip(date: string, count: number): string {
    const label = `${count} contribution${count === 1 ? "" : "s"}`;
    if (!date) return label;
    return `${label} on ${dateFormat.format(new Date(date))}`;
  }

  // Narrow containers show only recent weeks; a full year would be specks.
  const recentWeeks = 26;
  const total = $derived(calendar.weeks.length);
  const skip = $derived(Math.max(0, total - recentWeeks));
  const recentTotal = $derived(
    calendar.weeks.slice(skip).reduce((sum, w) => sum + w.days.reduce((s, d) => s + d.count, 0), 0),
  );
</script>

<!-- One column per week; days flow down it, with only the first placed so a
     partial first week aligns by weekday. Below 32rem, older weeks drop out. -->
<div class="@container">
  <div
    class="[--cols:var(--all)] [--skip:0] @max-lg:[--cols:var(--recent)] @max-lg:[--skip:var(--older)] *:grid *:grid-cols-[repeat(var(--cols),minmax(0,1fr))] *:gap-[2px]"
    style="--all: {total}; --recent: {total - skip}; --older: {skip};"
    role="img"
    aria-label="GitHub contribution activity over the last year"
  >
    <div class="mb-1" aria-hidden="true">
      {#each monthLabels as label, w (w)}
        {#if label}
          <span
            class="row-start-1 text-[10px] leading-none whitespace-nowrap text-faint {w < skip
              ? '@max-lg:hidden'
              : ''}"
            style="grid-column: calc({w + 1} - var(--skip)) / span 3;">{label}</span
          >
        {/if}
      {/each}
    </div>
    <div class="grid-flow-col grid-rows-7">
      {#each calendar.weeks as week, w (w)}
        {#each week.days as day, d (day.date)}
          <span
            class="aspect-square rounded-[2px] {levelClass[day.level]} {w < skip
              ? '@max-lg:hidden'
              : ''}"
            style={w === 0 && d === 0
              ? `grid-row-start: ${new Date(day.date).getUTCDay() + 1}`
              : undefined}
            title={tooltip(day.date, day.count)}
          ></span>
        {/each}
      {/each}
    </div>
  </div>

  <div
    class="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 text-sm text-muted"
  >
    <span class="@max-lg:hidden"
      >{calendar.total.toLocaleString()} contributions in the last year</span
    >
    <span class="hidden @max-lg:inline"
      >{recentTotal.toLocaleString()} contributions in the last 6 months</span
    >
    <div class="flex items-center gap-1 text-xs">
      <span>Less</span>
      {#each legendLevels as level (level)}
        <span class="h-2.5 w-2.5 rounded-[2px] {levelClass[level]}"></span>
      {/each}
      <span>More</span>
    </div>
  </div>
</div>
