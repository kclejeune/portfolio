<script lang="ts">
  // A tiny solved face in the current section's color — the site's logo.
  let { class: className = "h-6 w-6" }: { class?: string } = $props();
</script>

<span
  class="grid shrink-0 grid-cols-3 gap-[1.5px] rounded-[4px] bg-plastic p-[2px] {className}"
  aria-hidden="true"
>
  {#each { length: 9 }, i (i)}
    <span class="rounded-[1.5px] bg-accent-sticker transition-colors duration-300"></span>
  {/each}
</span>
