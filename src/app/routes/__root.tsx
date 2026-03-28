import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { AuthProvider } from "#/features/shared/providers/auth-provider";
import { QueryProvider } from "#/features/shared/providers/query-provider";
import { Header } from "#/features/shared/components/header";
import { Footer } from "#/features/shared/components/footer";

import "../../styles.css";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<QueryProvider>
			<AuthProvider>
				<Header />
				<main style={{ minHeight: "calc(100vh - 140px)" }}>
					<Outlet />
				</main>
				<Footer />
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "TanStack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
			</AuthProvider>
		</QueryProvider>
	);
}
