<script>
	import NavBar from '$lib/components/NavBar.svelte';

	let { children } = $props();
</script>

<main class="bg-gray-50 dark:bg-gray-900">
	<NavBar />
	<!-- Slot for the page content -->
	{@render children()}
</main>
