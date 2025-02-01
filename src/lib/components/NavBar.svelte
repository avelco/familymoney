<script>
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let darkMode = $state(false);
	let userMenuOpen = $state(false);

	onMount(() => {
		darkMode = localStorage.getItem('theme') === 'dark';
		document.documentElement.classList.toggle('dark', darkMode);
	});

	function toggleDarkMode() {
		darkMode = !darkMode;
		document.documentElement.classList.toggle('dark', darkMode);
		localStorage.setItem('theme', darkMode ? 'dark' : 'light');
	}
</script>

<nav class="bg-white shadow-md dark:bg-gray-900">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<!-- Left side: Logo -->
			<div class="flex items-center">
				<a
					href={'#'}
					class="ml-2 flex flex items-center text-2xl font-semibold text-gray-900 dark:text-white md:mr-24"
				>
					<Icon icon="tabler:pig-money" class="mr-1 h-8 w-8" />
					FamilyMoney
				</a>
			</div>

			<!-- Center: Desktop Menu -->
			<div class="hidden items-center space-x-6 md:flex">
				<a
					href="/dashboard"
					class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
					>Inicio</a
				>
				<a
					href="/register-expense"
					class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
					>Gestionar Gastos</a
				>
				<a
					href="/management"
					class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
					>Gestión</a
				>
			</div>

			<!-- Right side: Dark mode toggle & User profile -->
			<div class="flex items-center space-x-4">
				<!-- Dark Mode Toggle -->
				<button
					onclick={toggleDarkMode}
					class="rounded-md p-2 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
				>
					{#if darkMode}
						<Icon icon="tabler:moon" class="h-6 w-6" />
					{:else}
						<Icon icon="tabler:sun" class="h-6 w-6" />
					{/if}
				</button>

				<!-- User Profile Dropdown -->
				<div class="relative">
					<button
						onclick={() => (userMenuOpen = !userMenuOpen)}
						class="flex items-center space-x-2 rounded-md p-2 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
					>
						<img src="https://via.placeholder.com/32" alt="User" class="h-8 w-8 rounded-full" />
					</button>

					{#if userMenuOpen}
						<div
							class="absolute right-0 mt-2 w-48 rounded-md bg-white py-2 shadow-md dark:bg-gray-800"
						>
							<a
								href={'#'}
								class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
								>Perfil</a
							>
							<a
								href={'#'}
								class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
								>Configuración</a
							>
							<a
								href={'#'}
								class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
								>Cerrar sesión</a
							>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</nav>

<!-- Menú móvil en la parte inferior -->
<div class="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-md dark:bg-gray-900 md:hidden">
	<div class="flex justify-around py-3">
		<a
			href={'#'}
			class="flex flex-col items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
		>
			<Icon icon="tabler:home" class="h-6 w-6" />
			<span class="text-xs">Inicio</span>
		</a>
		<a
			href={'#'}
			class="flex flex-col items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
		>
			<Icon icon="hugeicons:invoice" class="h-6 w-6" />
			<span class="text-xs">Registrar Gastos</span>
		</a>
		<a
			href={'#'}
			class="flex flex-col items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
		>
			<Icon icon="mynaui:config-solid" class="h-6 w-6" />
			<span class="text-xs">Gestión</span>
		</a>
		<a
			href={'#'}
			class="flex flex-col items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
		>
			<Icon icon="tabler:user" class="h-6 w-6" />
			<span class="text-xs">Perfil</span>
		</a>
	</div>
</div>
