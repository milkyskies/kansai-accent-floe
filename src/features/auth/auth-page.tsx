import { useState } from "react";
import { useAuth } from "#/features/shared/providers/auth-provider";
import {
	signIn,
	signOut,
	signUp,
} from "#/services/supabase/auth/auth-service";
import { env } from "#/config/env";
import { Button } from "#/features/shared/ui/button";
import { Input } from "#/features/shared/ui/input";
import { Card } from "#/features/shared/ui/card";

export function AuthPage() {
	const { session } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	async function handleSignIn() {
		setError(null);
		try {
			await signIn(email, password);
		} catch (e) {
			setError(e instanceof Error ? e.message : "ログインに失敗しました");
		}
	}

	async function handleSignOut() {
		setError(null);
		try {
			await signOut();
		} catch (e) {
			setError(e instanceof Error ? e.message : "ログアウトに失敗しました");
		}
	}

	async function handleRegister() {
		setError(null);
		try {
			await signUp(email, password);
		} catch (e) {
			setError(e instanceof Error ? e.message : "登録に失敗しました");
		}
	}

	return (
		<div className="page-wrap pt-8">
			<Card className="mx-auto max-w-sm">
				<h1 className="display-title mb-4 text-2xl font-bold">
					ログイン
				</h1>
				{session && (
					<p className="mb-4 text-sm text-[var(--sea-ink-soft)]">
						ログイン中: {session.user.email}
					</p>
				)}
				<form
					className="flex flex-col gap-3"
					onSubmit={(e) => e.preventDefault()}
				>
					<Input
						type="email"
						placeholder="メールアドレス"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						type="password"
						placeholder="パスワード"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error && (
						<p className="text-sm text-red-500">{error}</p>
					)}
					<Button type="button" onClick={handleSignIn}>
						ログイン
					</Button>
					<Button type="button" variant="secondary" onClick={handleSignOut}>
						ログアウト
					</Button>
					{session?.user.email === env.adminEmail && (
						<Button type="button" variant="secondary" onClick={handleRegister}>
							新規登録
						</Button>
					)}
				</form>
			</Card>
		</div>
	);
}
