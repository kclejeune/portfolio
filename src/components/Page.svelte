<script lang="ts">
    export let id: string;
    export let title: string = "";
    export let backgroundClass: string = "bg-neutral-200 dark:bg-neutral-900";
    export let textClass: string = "text-neutral-800 dark:text-neutral-200";
</script>

<!-- <span class="anchor" {id} /> -->
<div {id} class="w-full min-h-screen {backgroundClass} {textClass}">
    <div class="pt-4 pb-2 text-4xl text-center">{title}</div>
    <div class="p-4">
        <slot />
    </div>
</div>

<style>
    .anchor {
        display: block;
        height: 4rem;
        margin-top: -4rem;
        visibility: hidden;
    }
</style>
