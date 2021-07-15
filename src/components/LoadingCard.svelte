<script>
    import Card from "./Card.svelte";
</script>

<Card title="Loading...">
    <div class="grid grid-cols-3 gap-4 mt-2">
        <div class="h-8 rounded bg-neutral-200 dark:bg-neutral-600 animate-pulse" />
        <div class="h-8 rounded bg-neutral-200 dark:bg-neutral-600 animate-pulse" />
        <div class="h-8 rounded bg-neutral-200 dark:bg-neutral-600 animate-pulse" />
        <div class="h-8 col-span-2 rounded bg-neutral-200 dark:bg-neutral-600 animate-pulse" />
        <div class="h-8 rounded bg-neutral-200 dark:bg-neutral-600 animate-pulse" />
        <div class="..." />
        <div class="col-span-2 ..." />
    </div>
</Card>
