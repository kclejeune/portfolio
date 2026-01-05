<script lang="ts">
  let { class: className = "w-5 h-5" }: { class?: string } = $props();
</script>

<svg
  class={className}
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  stroke-width="2"
>
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
</svg>
