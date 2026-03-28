import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSearchEntries } from "#/features/search/hooks/use-search-entries";
import { SearchResult } from "#/features/search/components/search-result";
import { Button } from "#/features/shared/ui/button";
import { Input } from "#/features/shared/ui/input";
import { Spinner } from "#/features/shared/ui/spinner";
import { SearchIcon } from "#/features/shared/icons/search-icon";
import { useAuth } from "#/features/shared/providers/auth-provider";
import { EditorModal } from "#/features/editor/editor-modal";
import type { Entry } from "#/models/entry";

export function SearchPage({ query }: { query: string }) {
	const [input, setInput] = useState(query);
	const navigate = useNavigate();
	const { data: results, isLoading } = useSearchEntries(query);
	const { session } = useAuth();
	const [editingEntry, setEditingEntry] = useState<Entry | undefined>();
	const [showEditor, setShowEditor] = useState(false);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const trimmed = input.trim();
		navigate({
			to: "/search",
			search: trimmed ? { q: trimmed } : {},
		});
	}

	function openEditor(entry?: Entry) {
		setEditingEntry(entry);
		setShowEditor(true);
	}

	function closeEditor() {
		setShowEditor(false);
		setEditingEntry(undefined);
	}

	return (
		<div className="page-wrap py-10">
			<form className="flex items-center gap-2" onSubmit={handleSubmit}>
				<label htmlFor="search" className="sr-only">
					検索
				</label>
				<div className="relative w-full">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<SearchIcon className="h-5 w-5 text-[var(--text-soft)]" />
					</div>
					<Input
						type="text"
						id="search"
						className="pl-10"
						placeholder="検索"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
				</div>
				<Button type="submit" size="icon">
					<SearchIcon className="h-5 w-5" />
					<span className="sr-only">検索</span>
				</Button>
				{session && (
					<Button
						type="button"
						variant="secondary"
						size="icon"
						onClick={() => openEditor()}
					>
						<Plus className="h-5 w-5" />
						<span className="sr-only">追加</span>
					</Button>
				)}
			</form>

			<div className="mt-6 w-full">
				{isLoading && (
					<div className="flex w-full items-center justify-center pt-10">
						<Spinner />
					</div>
				)}
				{results && results.length > 0 && (
					<>
						<h2 className="mb-2 text-2xl font-bold">
							結果{" "}
							<span className="text-base font-normal text-[var(--text-soft)]">
								— {results.length}件
							</span>
						</h2>
						{results.map((entry) => (
							<SearchResult
								key={entry.id}
								entry={entry}
								editable={!!session}
								onEdit={() => openEditor(entry)}
							/>
						))}
					</>
				)}
				{results && results.length === 0 && query.trim() !== "" && (
					<p className="pt-10 text-center text-[var(--text-soft)]">
						結果が見つかりませんでした
					</p>
				)}
			</div>

			{showEditor && (
				<EditorModal entry={editingEntry} onClose={closeEditor} />
			)}
		</div>
	);
}
