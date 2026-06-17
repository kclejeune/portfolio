<script lang="ts">
  import { ExternalLinkIcon } from "$lib/components/icons";

  type LinkItem = { label: string; href: string };

  let {
    links,
  }: {
    links: LinkItem[];
  } = $props();
</script>

<div class="flex items-center justify-center gap-4 text-sm text-slate-600 dark:text-slate-400">
  {#each links as link, i (link.href)}
    {#if i > 0}
      <span class="text-slate-300 dark:text-slate-700" aria-hidden="true">|</span>
    {/if}
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-1 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
    >
      {link.label}
      <ExternalLinkIcon class="h-3.5 w-3.5" />
    </a>
  {/each}
</div>
