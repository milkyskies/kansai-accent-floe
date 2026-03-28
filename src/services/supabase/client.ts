import { createClient } from "@supabase/supabase-js";
import type { Database } from "#/services/supabase/_generated/database";
import { env } from "#/config/env";

const supabase = createClient<Database>(env.supabaseUrl, env.supabaseAnonKey);

export type AppSupabaseClient = typeof supabase;

export function getSupabaseClient() {
	return supabase;
}
