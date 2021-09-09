<script lang="ts">
  export let link: string;
  export let name: string;
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
    <slot />
  </a>
{:else}
  <a on:click alt={name} aria-label={name} href={link}>
    <slot />
  </a>
{/if}
