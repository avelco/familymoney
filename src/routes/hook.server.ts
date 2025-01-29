import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	// List of public routes that don't require authentication
	const publicRoutes = ['/login', '/signup', '/'];

	// Check if the current route is public
	if (!publicRoutes.includes(event.url.pathname)) {
		// Check if the user is authenticated (e.g., by checking a cookie or token)
		const userToken = event.cookies.get('userToken');

		if (!userToken) {
			throw redirect(302, '/login'); // Redirect to login if not authenticated
		}
	}

	// Resolve the request
	return resolve(event);
};
