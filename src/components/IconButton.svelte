<script lang="ts">
	export let link: string;
	export let iconClass: string;
	export let customClass: string = '';
	export let name: string;
	export let colorClass = 'text-primary-300 sm:hover:text-primary-500';
</script>

<a target="_blank" rel="noopener noreferrer" alt={name} aria-label={name} href={link}>
	<i class="{colorClass} {iconClass} {customClass}" />
</a>
