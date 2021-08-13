<script lang="ts">
    export let link: string;
    export let iconClass: string;
    export let customClass: string = "";
    export let name: string;
    export let colorClass = "text-primary-300 sm:hover:text-primary-500";
    export let newTab: boolean = true;
</script>

{#if newTab}
    <a
        target="_blank"
        rel="noopener noreferrer"
        alt={name}
        aria-label={name}
        href={link}
        on:click
    >
        <i class="{colorClass} {iconClass} {customClass}" />
    </a>
{:else}
    <a on:click alt={name} aria-label={name} href={link}>
        <i class="{colorClass} {iconClass} {customClass}" />
    </a>
{/if}
