import { supabase } from '$lib/database/supabaseClient';
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async ({ cookies }) => {
	const { data: accounts, error: accountError } = await supabase.from('accounts').select();
	const { data: categories, error: categoryError } = await supabase.from('categories').select();
	const { data: budgets, error: budgetError } = await supabase
		.from('budgets')
		.select('*, categories(name)');

	if (accounts && categories) {
		return {
			accounts,
			categories,
			budgets
		};
	}
};

export const actions = {
	registerAccount: async ({ request, cookies, locals }) => {
		const user = locals.user;

		if (!user) {
			return {
				status: 401,
				body: { error: 'Unauthorized' }
			};
		}

		const formData = await request.formData();
		const name = formData.get('name');
		const type = formData.get('type');
		const balance = formData.get('balance');
		const currency = formData.get('currency');
		const updated_at = Math.floor(Date.now() / 1000);

		const { data, error } = await supabase
			.from('accounts')
			.insert([{ name, type, balance, currency, user_id: user.id, updated_at }]);

		if (error) {
			return {
				status: 500,
				body: error
			};
		}

		return {
			status: 200,
			body: data
		};
	},

	deleteAccount: async ({ request, locals }) => {
		const user = locals.user;

		if (!user) {
			return {
				status: 401,
				body: { error: 'Unauthorized' }
			};
		}

		const formData = await request.formData();
		const name = formData.get('name');
		const type = formData.get('type');
		const balance = formData.get('balance');
		const currency = formData.get('currency');
		const updated_at = Math.floor(Date.now() / 1000);

		const { data, error } = await supabase
			.from('accounts')
			.insert([{ name, type, balance, currency, user_id: user.id, updated_at }]);

		if (error) {
			return {
				status: 500,
				body: error
			};
		}

		return {
			status: 200,
			body: data
		};
	},

	registerCategory: async ({ request, locals }) => {
		const user = locals.user;

		if (!user) {
			return {
				status: 401,
				body: { error: 'Unauthorized' }
			};
		}

		const formData = await request.formData();
		const name = formData.get('name');
		const type = formData.get('type');
		const updated_at = Math.floor(Date.now() / 1000);

		const { data, error } = await supabase
			.from('categories')
			.insert([{ name, type, user_id: user.id, updated_at }]);

		if (error) {
			return {
				status: 500,
				body: error
			};
		}

		return {
			status: 200,
			body: data
		};
	},

	registerBudget: async ({ request, locals }) => {
		const user = locals.user;

		if (!user) {
			return {
				status: 401,
				body: { error: 'Unauthorized' }
			};
		}

		const formData = await request.formData();
		const name = formData.get('name');
		const category_id = formData.get('category_id');
		const amount = formData.get('amount');
		const updated_at = Math.floor(Date.now() / 1000);

		const { data, error } = await supabase
			.from('budgets')
			.insert([{ name, category_id, amount, user_id: user.id, updated_at }]);

		if (error) {
			return {
				status: 500,
				body: error
			};
		}

		return {
			status: 200,
			body: data
		};
	}
} satisfies Actions;
