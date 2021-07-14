<script lang="ts">
    export let url: string;
</script>

<a
    class="mb-2 font-light text-blue-800 underline text-md hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400"
    href={url}
>
    <slot />
</a>
