import type { Database } from "#/services/supabase/_generated/database";

type EntryRow = Database["public"]["Tables"]["entries"]["Row"];
type AccentRow = Database["public"]["Tables"]["accents"]["Row"];

export type Accent = {
	id: number;
	accent: string;
	usage: string;
	order: number;
	entryId: number;
};

export type Entry = {
	id: number;
	word: string;
	reading: string | null;
	reference: string;
	accents: Accent[];
};

export function entryFromRow(row: EntryRow, accents: Accent[] = []): Entry {
	return {
		id: row.id,
		word: row.word,
		reading: row.reading,
		reference: row.reference,
		accents,
	};
}

export function accentFromRow(row: AccentRow): Accent {
	return {
		id: row.id,
		accent: row.accent,
		usage: row.usage,
		order: row.order,
		entryId: row.entry_id,
	};
}
