<script lang="ts">
  export let url: string;
</script>

<a
  class="mb-2 font-light underline text-primary-800 text-md hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400"
  href={url}
>
  <slot />
</a>
