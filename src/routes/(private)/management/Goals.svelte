<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let budgets = [
		{ id: 1, name: 'Groceries', amount: 200 },
		{ id: 2, name: 'Rent', amount: 1000 },
		{ id: 3, name: 'Utilities', amount: 150 }
	];

	let showModal = false;
	let newBudget = { name: '', amount: 0 };
	let editBudget = null;

	const dispatch = createEventDispatcher();

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		newBudget = { name: '', amount: 0 };
		editBudget = null;
	}

	function saveBudget() {
		if (editBudget) {
			budgets = budgets.map((b) => (b.id === editBudget.id ? { ...b, ...newBudget } : b));
		} else {
			budgets = [...budgets, { ...newBudget, id: budgets.length + 1 }];
		}
		closeModal();
	}

	function edit(budget) {
		editBudget = budget;
		newBudget = { ...budget };
		openModal();
	}

	function remove(budget) {
		budgets = budgets.filter((b) => b.id !== budget.id);
	}
</script>

<div class="mx-auto max-w-3xl p-4">
	<div
		class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
	>
		<h1 class="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-white">Mis Metas</h1>

		<!-- Create Budget Button -->
		<button
			onclick={openModal}
			class="mb-4 w-full rounded-lg bg-primary-400 px-4 py-2 text-white transition-all hover:bg-primary-600 md:w-auto"
		>
			+ Create Budget
		</button>

		<!-- Budget List -->
		<div class="space-y-2">
			{#each budgets as budget}
				<div
					class="flex flex-col items-center justify-between rounded-lg border bg-white p-3 shadow-md dark:bg-gray-800 md:flex-row"
				>
					<div class="text-lg font-medium text-gray-700 dark:text-gray-300">
						{budget.name} - <span class="font-bold text-green-500">${budget.amount}</span>
					</div>
					<div class="mt-2 flex space-x-3 md:mt-0">
						<button
							onclick={() => edit(budget)}
							class="text-yellow-500 transition-all hover:text-yellow-600">Edit</button
						>
						<button
							onclick={() => remove(budget)}
							class="text-red-500 transition-all hover:text-red-600">Delete</button
						>
					</div>
				</div>
			{/each}
		</div>

		<!-- Modal -->
		{#if showModal}
			<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
				<div class="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
					<h2 class="mb-4 text-xl font-bold text-gray-800 dark:text-white">
						{editBudget ? 'Edit Budget' : 'Create Budget'}
					</h2>

					<form onsubmit={saveBudget} class="space-y-4">
						<!-- Name Input -->
						<div>
							<label
								for="budget-name"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label
							>
							<input
								id="budget-name"
								bind:value={newBudget.name}
								class="w-full rounded-md border bg-gray-100 p-2 dark:bg-gray-800 dark:text-white"
								required
							/>
						</div>

						<!-- Amount Input -->
						<div>
							<label
								for="budget-amount"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label
							>
							<input
								id="budget-amount"
								type="number"
								bind:value={newBudget.amount}
								class="w-full rounded-md border bg-gray-100 p-2 dark:bg-gray-800 dark:text-white"
								required
							/>
						</div>

						<!-- Action Buttons -->
						<div class="grid grid-cols-2 gap-4">
							<button
								type="button"
								onclick={closeModal}
								class="rounded-lg bg-gray-500 px-4 py-2 text-white transition-all hover:bg-gray-600"
							>
								Cancel
							</button>
							<button
								type="submit"
								class="rounded-lg bg-blue-500 px-4 py-2 text-white transition-all hover:bg-blue-600"
							>
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		{/if}
	</div>
</div>
