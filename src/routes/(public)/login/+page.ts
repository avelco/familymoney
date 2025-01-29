import { redirect } from '@sveltejs/kit';
import { isAuthenticated } from '$lib/stores/authStore';

export const load = async () => {
	if (isAuthenticated()) {
		throw redirect(302, '/dashboard'); // Redirect to dashboard if already authenticated
	}
};
