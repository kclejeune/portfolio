<script lang="ts">
    export let id: string;
    export let title: string;
    export let backgroundClass: string;
</script>

<div {id} class="min-w-full min-h-screen {backgroundClass}">
    <div class="pt-4 pb-2 text-4xl text-center">{title}</div>
    <div class="p-4">
        <slot />
    </div>
</div>
