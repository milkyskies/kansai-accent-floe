import { accentFromRow, type Entry, entryFromRow } from "#/models/entry";
import { getSupabaseClient } from "#/services/supabase/client";

export async function searchEntries(query: string): Promise<Entry[]> {
	const supabase = getSupabaseClient();

	const { data, error } = await supabase.rpc("get_ordered_entries", {
		search_query: query,
	});

	if (error) throw error;
	if (!data) return [];

	const entries = await Promise.all(
		data.map(async (row) => {
			const { data: accentRows, error: accentError } = await supabase
				.from("accents")
				.select()
				.eq("entry_id", row.id)
				.order("order");

			if (accentError) throw accentError;

			const accents = (accentRows ?? []).map(accentFromRow);
			return entryFromRow(row, accents);
		}),
	);

	return entries;
}
