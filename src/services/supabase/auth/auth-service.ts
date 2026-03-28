import { getSupabaseClient } from "#/services/supabase/client";

export async function signIn(email: string, password: string) {
	const supabase = getSupabaseClient();
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) throw error;
	return data.session;
}

export async function signOut() {
	const supabase = getSupabaseClient();
	const { error } = await supabase.auth.signOut();
	if (error) throw error;
}

export async function signUp(email: string, password: string) {
	const supabase = getSupabaseClient();
	const { data, error } = await supabase.auth.signUp({ email, password });
	if (error) throw error;
	return data.session;
}

export async function getSession() {
	const supabase = getSupabaseClient();
	const { data } = await supabase.auth.getSession();
	return data.session;
}

export function onAuthStateChange(
	callback: (session: import("@supabase/supabase-js").Session | null) => void,
) {
	const supabase = getSupabaseClient();
	const {
		data: { subscription },
	} = supabase.auth.onAuthStateChange((_event, session) => {
		callback(session);
	});
	return subscription;
}
