<script lang="ts">
	import Icon from '@iconify/svelte';
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let isProfileDropdownOpen = false;
	let isMobileMenuOpen = false;

	const menuItems = [
		{ icon: 'mdi:home', label: 'Dashboard', href: '/' },
		{ icon: 'mdi:transfer', label: 'Transactions', href: '/transactions' },
		{ icon: 'mdi:chart-bar', label: 'Analytics', href: '/analytics' },
		{ icon: 'mdi:calendar', label: 'Budget', href: '/budget' },
		{ icon: 'mdi:target', label: 'Goals', href: '/goals' },
		{ icon: 'mdi:cog', label: 'Settings', href: '/settings' }
	];

	const handleLogout = () => {
		// Add your logout logic here
		console.log('Logging out...');
	};

	// Close dropdowns when clicking outside
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.profile-dropdown')) {
			isProfileDropdownOpen = false;
		}
		if (!target.closest('.mobile-menu')) {
			isMobileMenuOpen = false;
		}
	}

	let totalBalance = 25840.5;
	let income = 4500.0;
	let expenses = 2150.75;
	let savings = 750.0;

	interface Transaction {
		id: number;
		description: string;
		amount: number;
		type: 'income' | 'expense';
		category: string;
		date: string;
		icon: string;
	}

	const recentTransactions: Transaction[] = [
		{
			id: 1,
			description: 'Salary Deposit',
			amount: 4500.0,
			type: 'income',
			category: 'Salary',
			date: '2025-04-27',
			icon: 'mdi:cash-plus'
		},
		{
			id: 2,
			description: 'Grocery Shopping',
			amount: 156.75,
			type: 'expense',
			category: 'Groceries',
			date: '2025-04-26',
			icon: 'mdi:cart'
		},
		{
			id: 3,
			description: 'Netflix Subscription',
			amount: 15.99,
			type: 'expense',
			category: 'Entertainment',
			date: '2025-04-25',
			icon: 'mdi:movie'
		},
		{
			id: 4,
			description: 'Freelance Payment',
			amount: 850.0,
			type: 'income',
			category: 'Freelance',
			date: '2025-04-24',
			icon: 'mdi:laptop'
		}
	];

	onMount(() => {
		// Expenses by Category Chart
		const expensesCtx = document.getElementById('expensesChart') as HTMLCanvasElement;
		new Chart(expensesCtx, {
			type: 'doughnut',
			data: {
				labels: ['Housing', 'Food', 'Transportation', 'Entertainment', 'Utilities'],
				datasets: [
					{
						data: [1200, 400, 300, 150, 100],
						backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EC4899', '#8B5CF6']
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: 'bottom'
					}
				}
			}
		});

		// Income vs Expenses Chart
		const balanceCtx = document.getElementById('balanceChart') as HTMLCanvasElement;
		new Chart(balanceCtx, {
			type: 'line',
			data: {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
				datasets: [
					{
						label: 'Income',
						data: [3800, 4200, 3900, 4500, 4300, 4600],
						borderColor: '#10B981',
						tension: 0.4
					},
					{
						label: 'Expenses',
						data: [2100, 2300, 1900, 2150, 2000, 2400],
						borderColor: '#EF4444',
						tension: 0.4
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: 'bottom'
					}
				},
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	});
</script>

<svelte:window on:click={handleClickOutside} />

<div class="min-h-screen bg-gray-50">
  <!-- Navigation -->
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <!-- Mobile menu button -->
          <button
            class="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
          >
            <Icon icon={isMobileMenuOpen ? "mdi:close" : "mdi:menu"} class="h-6 w-6" />
          </button>

          <div class="flex items-center">
            <Icon icon="noto:money-bag" class="h-8 w-8" />
            <span class="ml-2 text-xl font-bold text-emerald-600">Family Money</span>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex md:ml-8 space-x-4">
            {#each menuItems as item}
              <a
                href={item.href}
                class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Icon icon={item.icon} class="h-5 w-5 mr-2" />
                {item.label}
              </a>
            {/each}
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <button class="p-2 rounded-full hover:bg-gray-100 relative">
            <Icon icon="mdi:bell" class="h-6 w-6 text-gray-600" />
            <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" ></span>
          </button>

          <!-- Profile Dropdown -->
          <div class="relative profile-dropdown">
            <button
              class="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
              on:click={() => (isProfileDropdownOpen = !isProfileDropdownOpen)}
            >
              <img
                src="https://ui-avatars.com/api/?name=John+Doe"
                alt="Profile"
                class="h-8 w-8 rounded-full"
              />
              <span class="hidden md:block text-sm font-medium text-gray-700">John Doe</span>
              <Icon icon="mdi:chevron-down" class="h-5 w-5 text-gray-600" />
            </button>

            {#if isProfileDropdownOpen}
              <div
                class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                transition:fade
              >
                <div class="py-1">
                  <a
                    href="/profile"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Icon icon="mdi:account" class="h-5 w-5 mr-2" />
                    Your Profile
                  </a>
                  <a
                    href="/settings"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Icon icon="mdi:cog" class="h-5 w-5 mr-2" />
                    Settings
                  </a>
                  <hr class="my-1" />
                  <button
                    on:click={handleLogout}
                    class="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                  >
                    <Icon icon="mdi:logout" class="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    {#if isMobileMenuOpen}
      <div class="md:hidden mobile-menu" transition:fade>
        <div class="px-2 pt-2 pb-3 space-y-1">
          {#each menuItems as item}
            <a
              href={item.href}
              class="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Icon icon={item.icon} class="h-5 w-5 mr-2" />
              {item.label}
            </a>
          {/each}
        </div>
      </div>
    {/if}
  </nav>

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<!-- Overview Cards -->
		<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
			<div class="rounded-xl bg-white p-6 shadow-sm">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-gray-500">Total Balance</p>
						<p class="text-2xl font-bold text-gray-900">${totalBalance.toFixed(2)}</p>
					</div>
					<div class="rounded-full bg-emerald-100 p-3">
						<Icon icon="mdi:wallet" class="h-6 w-6 text-emerald-600" />
					</div>
				</div>
			</div>

			<div class="rounded-xl bg-white p-6 shadow-sm">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-gray-500">Monthly Income</p>
						<p class="text-2xl font-bold text-gray-900">${income.toFixed(2)}</p>
					</div>
					<div class="rounded-full bg-blue-100 p-3">
						<Icon icon="mdi:trending-up" class="h-6 w-6 text-blue-600" />
					</div>
				</div>
			</div>

			<div class="rounded-xl bg-white p-6 shadow-sm">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-gray-500">Monthly Expenses</p>
						<p class="text-2xl font-bold text-gray-900">${expenses.toFixed(2)}</p>
					</div>
					<div class="rounded-full bg-red-100 p-3">
						<Icon icon="mdi:trending-down" class="h-6 w-6 text-red-600" />
					</div>
				</div>
			</div>

			<div class="rounded-xl bg-white p-6 shadow-sm">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-gray-500">Monthly Savings</p>
						<p class="text-2xl font-bold text-gray-900">${savings.toFixed(2)}</p>
					</div>
					<div class="rounded-full bg-purple-100 p-3">
						<Icon icon="mdi:piggy-bank" class="h-6 w-6 text-purple-600" />
					</div>
				</div>
			</div>
		</div>

		<!-- Charts Section -->
		<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
			<div class="rounded-xl bg-white p-6 shadow-sm">
				<h3 class="mb-4 text-lg font-semibold">Expenses by Category</h3>
				<canvas id="expensesChart"></canvas>
			</div>

			<div class="rounded-xl bg-white p-6 shadow-sm">
				<h3 class="mb-4 text-lg font-semibold">Income vs Expenses</h3>
				<canvas id="balanceChart"></canvas>
			</div>
		</div>

		<!-- Recent Transactions -->
		<div class="rounded-xl bg-white p-6 shadow-sm">
			<div class="mb-6 flex items-center justify-between">
				<h3 class="text-lg font-semibold">Recent Transactions</h3>
				<button class="text-emerald-600 hover:text-emerald-700">View All</button>
			</div>

			<div class="space-y-4">
				{#each recentTransactions as transaction}
					<div class="flex items-center justify-between rounded-lg p-4 hover:bg-gray-50">
						<div class="flex items-center space-x-4">
							<div class="rounded-full bg-gray-100 p-3">
								<Icon icon={transaction.icon} class="h-6 w-6 text-gray-600" />
							</div>
							<div>
								<p class="font-medium text-gray-900">{transaction.description}</p>
								<p class="text-sm text-gray-500">{transaction.category}</p>
							</div>
						</div>
						<div class="text-right">
							<p
								class="font-medium {transaction.type === 'income'
									? 'text-emerald-600'
									: 'text-red-600'}"
							>
								{transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
							</p>
							<p class="text-sm text-gray-500">{transaction.date}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</main>
</div>
