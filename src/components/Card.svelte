<script lang="ts">
    import Link from "./Link.svelte";
    export let title: string = undefined;
    export let subtitle: string = undefined;
    export let url: string = undefined;
    export let tags: string[] = undefined;
</script>

<div
    class="flex flex-col justify-between overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-800 rounded-xl"
>
    <div class="px-6 py-4 break-words">
        {#if title}
            <div class="mb-1 text-2xl font-medium">{title}</div>
        {/if}
        {#if subtitle}
            <div
                class="mb-1 font-light text-gray-600 text-md dark:text-gray-400"
            >
                {subtitle}
            </div>
        {:else if url}
            <div class="mb-1">
                <Link {url}>{url}</Link>
            </div>
        {/if}
        <div>
            <slot />
        </div>
    </div>
    <div>
        {#if tags}
            <div class="px-6 pt-4 pb-2 align-bottom">
                {#each tags as tag}
                    <span
                        class="inline-block px-4 py-1 mb-2 mr-2 text-sm font-semibold bg-blue-300 rounded-full dark:bg-blue-800"
                    >
                        {tag}
                    </span>
                {/each}
            </div>
        {/if}
    </div>
</div>
