import { useEffect, useState } from "react";
import { SunIcon } from "#/features/shared/icons/sun-icon";
import { MoonIcon } from "#/features/shared/icons/moon-icon";
import { MonitorIcon } from "#/features/shared/icons/monitor-icon";

type ThemeMode = "light" | "dark" | "auto";

function getInitialMode(): ThemeMode {
	if (typeof window === "undefined") {
		return "auto";
	}

	const stored = window.localStorage.getItem("theme");
	if (stored === "light" || stored === "dark" || stored === "auto") {
		return stored;
	}

	return "auto";
}

function applyThemeMode(mode: ThemeMode) {
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const resolved = mode === "auto" ? (prefersDark ? "dark" : "light") : mode;

	document.documentElement.classList.remove("light", "dark");
	document.documentElement.classList.add(resolved);

	if (mode === "auto") {
		document.documentElement.removeAttribute("data-theme");
	} else {
		document.documentElement.setAttribute("data-theme", mode);
	}

	document.documentElement.style.colorScheme = resolved;
}

export function ThemeToggle() {
	const [mode, setMode] = useState<ThemeMode>("auto");

	useEffect(() => {
		const initialMode = getInitialMode();
		setMode(initialMode);
		applyThemeMode(initialMode);
	}, []);

	useEffect(() => {
		if (mode !== "auto") {
			return;
		}

		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => applyThemeMode("auto");

		media.addEventListener("change", onChange);
		return () => {
			media.removeEventListener("change", onChange);
		};
	}, [mode]);

	function toggleMode() {
		const nextMode: ThemeMode =
			mode === "light" ? "dark" : mode === "dark" ? "auto" : "light";
		setMode(nextMode);
		applyThemeMode(nextMode);
		window.localStorage.setItem("theme", nextMode);
	}

	const label =
		mode === "auto"
			? "テーマ: 自動"
			: mode === "dark"
				? "テーマ: ダーク"
				: "テーマ: ライト";

	return (
		<button
			type="button"
			onClick={toggleMode}
			aria-label={label}
			title={label}
			className="rounded-lg p-2 text-[var(--text-soft)] transition hover:bg-[var(--input-bg)] hover:text-[var(--text)]"
		>
			{mode === "auto" ? (
				<MonitorIcon size={18} />
			) : mode === "dark" ? (
				<MoonIcon size={18} />
			) : (
				<SunIcon size={18} />
			)}
		</button>
	);
}
