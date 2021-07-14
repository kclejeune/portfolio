<script lang="ts">
    export let link: string;
    export let iconClass: string;
    export let name: string;
    export let colorClass = "text-blue-300 hover:text-blue-500";
    export let customClass = "m-5";
    export let scrollId = "";
    import { scrollto } from "svelte-scrollto";
</script>

<a
    target="_blank"
    rel="noopener noreferrer"
    use:scrollto={scrollId}
    alt={name}
    aria-label={name}
    href={link}
    class={customClass}
>
    <i class="{colorClass} {iconClass}" />
</a>
