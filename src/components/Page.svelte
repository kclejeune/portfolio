<script lang="ts">
    import Header from "./Header.svelte";

    export let id: string;
    export let title: string;
    export let lightBackground: string;
    export let darkBackground: string;
</script>

<div {id} class="w-screen min-h-screen {lightBackground} dark:{darkBackground}">
    <div class="py-4">
        <Header>{title}</Header>
    </div>
    <slot />
</div>
