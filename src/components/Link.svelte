<script lang="ts">
    export let url: string;
</script>

<a
    class="mb-2 font-light text-blue-800 underline text-md sm:hover:text-blue-600 dark:text-blue-300 sm:dark:hover:text-blue-400"
    href={url}
>
    <slot />
</a>
