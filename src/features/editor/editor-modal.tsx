import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "#/features/shared/providers/auth-provider";
import { Input } from "#/features/shared/ui/input";
import { Button } from "#/features/shared/ui/button";
import type { AccentViewDto } from "#/models/accent-dto";
import type { Entry } from "#/models/entry";
import {
	createEntry,
	updateEntry,
	upsertAccents,
	deleteAccent,
} from "#/services/supabase/entries/mutate-entries";

type EditorProps = {
	entry?: Entry;
	onClose: () => void;
};

export function EditorModal({ entry, onClose }: EditorProps) {
	const { session } = useAuth();
	const queryClient = useQueryClient();
	const isNew = !entry;

	const [word, setWord] = useState(entry?.word ?? "");
	const [reading, setReading] = useState(entry?.reading ?? "");
	const [reference, setReference] = useState(entry?.reference ?? "");
	const [saving, setSaving] = useState(false);

	const initialAccents: AccentViewDto[] = entry
		? entry.accents.map((a) => ({
				id: a.id,
				accent: a.accent,
				usage: a.usage,
				order: a.order,
			}))
		: [];

	const [existingAccents, setExistingAccents] =
		useState<AccentViewDto[]>(initialAccents);
	const [newAccents, setNewAccents] = useState<AccentViewDto[]>([
		{ accent: "", usage: "", order: initialAccents.length },
	]);

	function updateExistingAccent(
		index: number,
		field: "accent" | "usage",
		value: string,
	) {
		setExistingAccents((prev) =>
			prev.map((a, i) => (i === index ? { ...a, [field]: value } : a)),
		);
	}

	function updateNewAccent(
		index: number,
		field: "accent" | "usage",
		value: string,
	) {
		const updated = newAccents.map((a, i) =>
			i === index ? { ...a, [field]: value } : a,
		);

		const current = { ...updated[index], [field]: value };

		if (!current.accent && !current.usage) {
			if (updated.length > 1) {
				updated.splice(index, 1);
				updated.forEach((a, i) => {
					a.order = existingAccents.length + i;
				});
			}
		} else if (current.accent && index === updated.length - 1) {
			updated.push({
				accent: "",
				usage: "",
				order: existingAccents.length + updated.length,
			});
		}

		setNewAccents(updated);
	}

	async function handleSave(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSaving(true);

		try {
			let entryId = entry?.id;

			if (isNew) {
				const created = await createEntry({
					word,
					reading,
					reference,
					authorId: session?.user.id,
				});
				entryId = created.id;
			} else {
				await updateEntry({ id: entryId!, word, reading, reference });
			}

			const allAccents = [...existingAccents, ...newAccents].filter(
				(a) => a.accent.trim() !== "",
			);

			if (allAccents.length > 0) {
				await upsertAccents(
					allAccents.map((a) => ({
						id: a.id,
						accent: a.accent,
						usage: a.usage,
						entry_id: entryId!,
						order: a.order,
						author_id: session?.user.id,
					})),
				);
			}

			const deletedAccents = existingAccents.filter(
				(a) => a.accent.trim() === "" && a.id,
			);
			for (const a of deletedAccents) {
				await deleteAccent(a.id!);
			}

			await queryClient.invalidateQueries({ queryKey: ["entries"] });
			onClose();
		} catch (err) {
			console.error(err);
		} finally {
			setSaving(false);
		}
	}

	return (
		<div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-20">
			<div className="mx-4 w-full max-w-[650px]">
				<div className="smooth-shadow flex max-h-[80vh] flex-col overflow-auto rounded-lg bg-[var(--surface)] px-6 pb-8 pt-4 text-lg">
					<h2 className="mb-2 font-bold">編集</h2>
					<form className="flex flex-col gap-2" onSubmit={handleSave}>
						<div className="flex flex-col gap-2 md:flex-row md:gap-6">
							<div className="w-full">
								<label className="text-base" htmlFor="editor-word">
									語句<span className="text-red-500">*</span>
								</label>
								<Input
									id="editor-word"
									required
									value={word}
									onChange={(e) => setWord(e.target.value)}
								/>
							</div>
							<div className="w-full">
								<label className="text-base" htmlFor="editor-reading">
									読み
								</label>
								<Input
									id="editor-reading"
									value={reading}
									onChange={(e) => setReading(e.target.value)}
								/>
							</div>
						</div>

						<div className="mb-4 flex flex-col gap-4">
							{existingAccents.map((accent, i) => (
								<div
									key={accent.id ?? `existing-${i}`}
									className="flex flex-col gap-2 md:flex-row md:gap-6"
								>
									<div className="w-full">
										<label className="text-base">
											アクセント
											{i === 0 && (
												<span className="text-red-500">*</span>
											)}
										</label>
										<Input
											required={i === 0}
											value={accent.accent}
											onChange={(e) =>
												updateExistingAccent(i, "accent", e.target.value)
											}
										/>
									</div>
									<div className="w-full">
										<label className="text-base">使い方</label>
										<Input
											value={accent.usage}
											onChange={(e) =>
												updateExistingAccent(i, "usage", e.target.value)
											}
										/>
									</div>
								</div>
							))}
							{newAccents.map((accent, i) => (
								<div
									key={`new-${i}`}
									className="flex flex-col gap-2 md:flex-row md:gap-6"
								>
									<div className="w-full">
										<label className="text-base">
											アクセント
											{accent.usage && (
												<span className="text-red-500">*</span>
											)}
										</label>
										<Input
											required={!!accent.usage}
											value={accent.accent}
											onChange={(e) =>
												updateNewAccent(i, "accent", e.target.value)
											}
										/>
									</div>
									<div className="w-full">
										<label className="text-base">使い方</label>
										<Input
											value={accent.usage}
											onChange={(e) =>
												updateNewAccent(i, "usage", e.target.value)
											}
										/>
									</div>
								</div>
							))}
						</div>

						<label className="text-base" htmlFor="editor-reference">
							参考
						</label>
						<textarea
							id="editor-reference"
							rows={3}
							className="w-full rounded-lg border border-[var(--line)] bg-[var(--input-bg)] px-3 py-2 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
							value={reference}
							onChange={(e) => setReference(e.target.value)}
						/>

						<div className="mt-8 flex w-full justify-end gap-3 text-sm font-bold">
							<Button
								type="button"
								variant="secondary"
								onClick={onClose}
								disabled={saving}
							>
								キャンセル
							</Button>
							<Button type="submit" disabled={saving}>
								{saving ? "保存中..." : "保存"}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
