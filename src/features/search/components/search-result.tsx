import { Pencil } from "lucide-react";
import type { Entry } from "#/models/entry";

type SearchResultProps = {
	entry: Entry;
	editable?: boolean;
	onEdit?: () => void;
};

export function SearchResult({ entry, editable, onEdit }: SearchResultProps) {
	return (
		<div className="group w-full py-4">
			<div className="flex">
				<div className="mr-4 w-52 shrink-0">
					<div className="w-fit">
						<div className="text-center text-sm text-[var(--text-soft)]">
							{entry.reading && entry.reading.trim() !== ""
								? entry.reading
								: "\u00A0"}
						</div>
						<div className="text-3xl font-medium leading-none">
							{entry.word}
						</div>
					</div>
				</div>
				<div className="flex w-full justify-between">
					<div className="w-full">
						<div>
							<h3 className="text-sm font-bold text-[var(--text-soft)]">
								アクセント
							</h3>
							<ol className="ml-4">
								{entry.accents.map((accent) => (
									<li
										key={accent.id}
										className="mt-1.5 list-decimal text-[var(--text-soft)]"
									>
										<div className="flex items-baseline">
											<span className="text-2xl text-[var(--text)]">
												{accent.accent}
											</span>
											{accent.usage && (
												<span className="ml-3 text-sm text-[var(--text-soft)]">
													{accent.usage}
												</span>
											)}
										</div>
									</li>
								))}
							</ol>
						</div>
						{entry.reference && entry.reference !== "" && (
							<div className="mt-4">
								<h3 className="text-sm font-bold text-[var(--text-soft)]">
									参考
								</h3>
								<div className="mt-1 text-lg">{entry.reference}</div>
							</div>
						)}
					</div>
					{editable && (
						<div className="invisible flex items-start group-hover:visible">
							<button
								type="button"
								onClick={onEdit}
								className="p-1 text-[var(--text-soft)] hover:text-[var(--text)]"
							>
								<Pencil size={18} />
							</button>
						</div>
					)}
				</div>
			</div>
			<div className="mt-6 h-px w-full bg-[var(--line)]" />
		</div>
	);
}
