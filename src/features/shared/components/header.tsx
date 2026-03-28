import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "#/features/shared/providers/auth-provider";

export function Header() {
	const { session } = useAuth();
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<nav className="flex w-full justify-center">
			<div className="page-wrap flex h-20 w-full items-center justify-between">
				<Link
					to="/search"
					className="text-2xl font-bold text-[var(--text)] no-underline"
				>
					京阪アクセント辞典
				</Link>

				{/* Desktop */}
				<ul className="hidden list-none items-center gap-x-4 sm:flex">
					<li>
						<Link to="/search">検索</Link>
					</li>
					<li>
						<Link to="/login">
							{session ? "アカウント" : "ログイン"}
						</Link>
					</li>
					<li>
						<ThemeToggle />
					</li>
				</ul>

				{/* Mobile toggle */}
				<button
					type="button"
					className="p-2 text-[var(--text-soft)] sm:hidden"
					onClick={() => setMenuOpen(!menuOpen)}
				>
					{menuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile menu */}
			{menuOpen && (
				<div className="absolute left-0 top-20 z-50 w-full border-b border-[var(--line)] bg-[var(--bg)] px-4 pb-4 sm:hidden">
					<ul className="flex list-none flex-col gap-3">
						<li>
							<Link to="/search" onClick={() => setMenuOpen(false)}>
								検索
							</Link>
						</li>
						<li>
							<Link to="/login" onClick={() => setMenuOpen(false)}>
								{session ? "アカウント" : "ログイン"}
							</Link>
						</li>
						<li>
							<ThemeToggle />
						</li>
					</ul>
				</div>
			)}
		</nav>
	);
}
