<script lang="ts">
	import Accounts from './Accounts.svelte';
	import Budgets from './Budgets.svelte';
	import Categories from './Categories.svelte';
	import Goals from './Goals.svelte';

	const { data } = $props();
	const { accounts, categories, budgets } = data;
	console.log(data);
</script>

<Budgets {budgets} {categories} />
<Categories {categories} />
<Accounts {accounts} />
<!-- <Goals /> -->
