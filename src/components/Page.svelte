<script lang="ts">
	export let id: string;
	export let title: string = '';
	export let backgroundClass: string = 'bg-neutral-200 dark:bg-neutral-900';
	export let textClass: string = 'text-neutral-800 dark:text-neutral-200';
</script>

<div
	{id}
	class="min-w-full min-h-screen flex flex-col justify-between {backgroundClass} {textClass}"
>
	<div>
		<div class="h-16" />
		<div class="py-4 text-4xl text-center">{title}</div>
		<div class="p-4">
			<slot />
		</div>
	</div>
	<div class="h-0" />
</div>
