import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session'); // Get session cookie

	// Redirect if user tries to access private routes without login
	if (event.url.pathname.startsWith('/dashboard') && !session) {
		throw redirect(303, '/login');
	}

	return resolve(event);
};
