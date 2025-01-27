<section class="bg-gray-50 dark:bg-gray-900">
	<div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
		<a
			href={'#'}
			class="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
		>
			<img
				class="mr-2 h-8 w-8"
				src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
				alt="logo"
			/>
			Flowbite
		</a>
		<div
			class="w-full rounded-lg bg-white p-6 shadow sm:max-w-md sm:p-8 md:mt-0 dark:border dark:border-gray-700 dark:bg-gray-800"
		>
			<h2
				class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
			>
				Change Password
			</h2>
			<form class="mt-4 space-y-4 md:space-y-5 lg:mt-5" action="#">
				<div>
					<label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
						>Your email</label
					>
					<input
						type="email"
						name="email"
						id="email"
						class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
						placeholder="name@company.com"
						required
					/>
				</div>
				<div>
					<label for="password" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
						>New Password</label
					>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="••••••••"
						class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
						required
					/>
				</div>
				<div>
					<label
						for="confirm-password"
						class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
						>Confirm password</label
					>
					<input
						type="confirm-password"
						name="confirm-password"
						id="confirm-password"
						placeholder="••••••••"
						class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
						required
					/>
				</div>
				<div class="flex items-start">
					<div class="flex h-5 items-center">
						<input
							id="newsletter"
							aria-describedby="newsletter"
							type="checkbox"
							class="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
							required
						/>
					</div>
					<div class="ml-3 text-sm">
						<label for="newsletter" class="font-light text-gray-500 dark:text-gray-300"
							>I accept the <a
								class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
								href={'#'}>Terms and Conditions</a
							></label
						>
					</div>
				</div>
				<button
					type="submit"
					class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
					>Reset passwod</button
				>
			</form>
		</div>
	</div>
</section>
