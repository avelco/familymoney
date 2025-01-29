import { supabase } from '$lib/supabaseClient';

export async function load() {
	const { data } = await supabase.from('users').select('id, name, email');
	console.log(data);
	return {
		users: data ?? []
	};
}
