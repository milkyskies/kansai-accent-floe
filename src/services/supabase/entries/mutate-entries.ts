import { getSupabaseClient } from "#/services/supabase/client";

export async function createEntry(args: {
	word: string;
	reading: string;
	reference: string;
	authorId?: string;
}) {
	const supabase = getSupabaseClient();
	const { data, error } = await supabase
		.from("entries")
		.insert({
			word: args.word,
			reading: args.reading,
			reference: args.reference,
			author_id: args.authorId,
		})
		.select()
		.single();

	if (error) throw error;
	if (!data) throw new Error("Failed to create entry");
	return data;
}

export async function updateEntry(args: {
	id: number;
	word?: string;
	reading?: string;
	reference?: string;
}) {
	const supabase = getSupabaseClient();
	const { id, ...updates } = args;
	const { data, error } = await supabase
		.from("entries")
		.update(updates)
		.eq("id", id)
		.select()
		.single();

	if (error) throw error;
	if (!data) throw new Error("Failed to update entry");
	return data;
}

export async function upsertAccents(
	accents: {
		id?: number;
		accent: string;
		usage: string;
		entry_id: number;
		order: number;
		author_id?: string;
	}[],
) {
	const supabase = getSupabaseClient();
	const { data, error } = await supabase
		.from("accents")
		.upsert(accents, { defaultToNull: false })
		.select();

	if (error) throw error;
	return data ?? [];
}

export async function deleteAccent(id: number) {
	const supabase = getSupabaseClient();
	const { error } = await supabase.from("accents").delete().eq("id", id);
	if (error) throw error;
}

export async function bulkImportEntries(
	entries: {
		item: string;
		reading?: string;
		reference?: string;
		accentData: { accent: string; usage?: string }[];
	}[],
	authorId?: string,
) {
	const supabase = getSupabaseClient();

	for (const entry of entries) {
		const { data: entryData, error: entryError } = await supabase
			.from("entries")
			.insert({
				word: entry.item,
				reading: entry.reading ?? null,
				reference: entry.reference ?? "",
				author_id: authorId ?? null,
			})
			.select()
			.single();

		if (entryError) throw entryError;
		if (!entryData) throw new Error("Failed to create entry");

		for (let i = 0; i < entry.accentData.length; i++) {
			const accent = entry.accentData[i];
			const { error: accentError } = await supabase.from("accents").insert({
				entry_id: entryData.id,
				accent: accent.accent,
				usage: accent.usage ?? "",
				order: i,
				author_id: authorId ?? null,
			});
			if (accentError) throw accentError;
		}
	}
}
