<script lang="ts">
    export let url: string;
</script>

<a
    class="mb-2 font-light text-primary-800 underline text-md sm:hover:text-primary-600 dark:text-primary-300 sm:dark:hover:text-primary-400"
    href={url}
>
    <slot />
</a>
