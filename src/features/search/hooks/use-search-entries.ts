import { useQuery } from "@tanstack/react-query";
import { searchEntries } from "#/services/supabase/entries/search-entries";

export function useSearchEntries(query: string) {
	return useQuery({
		queryKey: ["entries", "search", query],
		queryFn: () => searchEntries(query),
		enabled: query.trim().length > 0,
	});
}
