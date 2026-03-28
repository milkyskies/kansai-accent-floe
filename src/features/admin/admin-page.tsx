import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "#/features/shared/providers/auth-provider";
import { env } from "#/config/env";
import { Button } from "#/features/shared/ui/button";
import { Card } from "#/features/shared/ui/card";
import { bulkImportEntries } from "#/services/supabase/entries/mutate-entries";

export function AdminPage() {
	const { session } = useAuth();
	const navigate = useNavigate();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [status, setStatus] = useState<string | null>(null);
	const [importing, setImporting] = useState(false);

	if (session?.user.email !== env.adminEmail) {
		navigate({ to: "/login" });
		return null;
	}

	async function handleImport() {
		const files = fileInputRef.current?.files;
		if (!files || files.length === 0) return;

		setImporting(true);
		setStatus(null);

		try {
			const text = await files[0].text();
			const entries = JSON.parse(text);
			await bulkImportEntries(entries, session?.user.id);
			setStatus(`${entries.length}件のエントリーを追加しました。`);
		} catch (err) {
			setStatus(
				`エラー: ${err instanceof Error ? err.message : "インポートに失敗しました"}`,
			);
		} finally {
			setImporting(false);
		}
	}

	return (
		<div className="page-wrap py-10">
			<Card className="mx-auto max-w-lg">
				<h1 className="mb-4 text-2xl font-bold">Admin</h1>
				<div className="flex flex-col gap-3">
					<input
						type="file"
						accept=".json"
						ref={fileInputRef}
						className="text-sm text-[var(--text-soft)]"
					/>
					<Button onClick={handleImport} disabled={importing}>
						{importing ? "インポート中..." : "ファイルからエントリーを追加"}
					</Button>
					{status && (
						<p className="text-sm text-[var(--text-soft)]">{status}</p>
					)}
				</div>
			</Card>
		</div>
	);
}
