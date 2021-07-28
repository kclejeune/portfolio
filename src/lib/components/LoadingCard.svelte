<script>
    import Card from "./Card.svelte";
</script>

<Card title="Loading...">
    <div class="mt-2 grid grid-cols-3 gap-4">
        <div
            class="h-8 rounded bg-neutral-200 dark:bg-neutral-600 animate-pulse"
        />
        <div
            class="h-8 rounded bg-neutral-200 dark:bg-neutral-600 animate-pulse"
        />
        <div
            class="h-8 rounded bg-neutral-200 dark:bg-neutral-600 animate-pulse"
        />
        <div
            class="h-8 rounded col-span-2 bg-neutral-200 dark:bg-neutral-600 animate-pulse"
        />
        <div
            class="h-8 rounded bg-neutral-200 dark:bg-neutral-600 animate-pulse"
        />
        <div class="..." />
        <div class="col-span-2 ..." />
    </div>
</Card>
