import { createFileRoute } from "@tanstack/react-router";
import { SearchPage } from "#/features/search/search-page";

type SearchParams = {
	q?: string;
};

export const Route = createFileRoute("/search")({
	validateSearch: (search: Record<string, unknown>): SearchParams => ({
		q: typeof search.q === "string" ? search.q : undefined,
	}),
	head: () => ({
		meta: [{ title: "検索 - 京阪アクセント辞典" }],
	}),
	component: SearchRouteComponent,
});

function SearchRouteComponent() {
	const { q } = Route.useSearch();
	return <SearchPage query={q ?? ""} />;
}
