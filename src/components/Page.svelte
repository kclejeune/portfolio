<script lang="ts">
    export let id: string;
    export let title: string;
    export let lightBackgroundClass: string = "bg-blue-200";
    export let darkBackgroundClass: string = "bg-blue-800";
</script>

<div {id} class="w-screen min-h-screen {lightBackgroundClass} dark:{darkBackgroundClass}">
    <h1 class="py-4 text-4xl text-center">{title}</h1>
    <slot />
</div>
