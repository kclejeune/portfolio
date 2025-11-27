<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    link: string;
    name: string;
    newTab?: boolean;
    children?: Snippet;
    onclick?: () => void;
  }

  let { link, name, newTab = true, children, onclick }: Props = $props();
</script>

{#if newTab}
  <a
    target="_blank"
    rel="noopener noreferrer"
    aria-label={name}
    href={link}
    {onclick}
  >
    {#if children}
      {@render children()}
    {/if}
  </a>
{:else}
  <a {onclick} aria-label={name} href={link}>
    {#if children}
      {@render children()}
    {/if}
  </a>
{/if}
