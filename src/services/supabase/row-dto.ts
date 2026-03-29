import type { Database } from "#/services/supabase/_generated/database";

export type EntryRow = Database["public"]["Tables"]["entries"]["Row"];
export type AccentRow = Database["public"]["Tables"]["accents"]["Row"];
