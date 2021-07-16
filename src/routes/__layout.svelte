<script>
	import '../app.postcss';
	import Navbar from '../components/Navbar.svelte';
</script>

<div class="min-h-screen min-w-full">
	<Navbar />
	<main>
		<slot />
	</main>
</div>

<style>
	main {
		scroll-padding-top: 4rem;
	}
</style>
