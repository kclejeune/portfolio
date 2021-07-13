<script lang="ts">
    export let title: string = undefined;
    export let subtitle: string = undefined;
    export let url: string = undefined;
    export let description: string = undefined;
    export let tasks: string[] = undefined;
    export let content: string = undefined;
    export let tags: string[] = undefined;
</script>

<div
    class="flex flex-col justify-between overflow-hidden bg-gray-200 shadow-lg dark:bg-gray-800 rounded-xl"
>
    <div class="px-6 py-4">
        {#if title}
            <div class="mb-2 text-2xl font-medium">{title}</div>
        {/if}
        {#if subtitle}
            <div
                class="mb-2 font-light text-gray-600 text-md dark:text-gray-400"
            >
                {subtitle}
            </div>
        {:else if url}
            <div
                class="mb-2 font-light text-blue-500 underline text-md hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
            >
                <a href={url}>{url}</a>
            </div>
        {/if}
        {#if description}
            <div>
                {description}
            </div>
        {/if}
        {#if content}
            <div>
                {content}
            </div>
        {/if}
        {#if tasks && tasks.length > 0}
            <ul class="m-3 list-disc">
                {#each tasks as task}
                    <li>
                        {task}
                    </li>
                {/each}
            </ul>
        {/if}
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
