import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "#/features/auth/auth-page";

export const Route = createFileRoute("/login")({
	head: () => ({
		meta: [{ title: "ログイン - 京阪アクセント辞典" }],
	}),
	component: AuthPage,
});
