<script lang="ts">
    export let id: string;
    export let title: string;
    export let backgroundClass: string;
</script>

<div {id} class="w-screen min-h-screen {backgroundClass}">
    <h1 class="py-4 text-4xl text-center">{title}</h1>
    <slot />
</div>
