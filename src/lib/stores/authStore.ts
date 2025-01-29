import { writable } from 'svelte/store';

// Define the user type
interface User {
	id: string;
	name: string;
	email: string;
}

// Create a writable store for the user
export const authStore = writable<User | null>(null);

// Helper function to check if the user is authenticated
export const isAuthenticated = () => {
	let user: User | null = null;
	authStore.subscribe((value) => (user = value))();
	return !!user;
};
