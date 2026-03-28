export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-20 border-t border-[var(--line)] px-4 py-8 text-center text-sm text-[var(--text-soft)]">
			<p className="m-0">&copy; {year} 関西弁アクセント辞典</p>
		</footer>
	);
}
