<script lang="ts">
  interface Props {
    id: string;
  }

  let { id }: Props = $props();
</script>

<span class="invisible block h-16 mt-[-4rem]" {id}></span>
