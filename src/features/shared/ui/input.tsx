import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentProps } from "react";

export const inputVariants = tv({
	base: "block w-full rounded-lg border border-[var(--line)] bg-[var(--input-bg)] px-3 py-2.5 text-[var(--text)] placeholder:text-[var(--text-soft)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]",
	variants: {
		size: {
			sm: "px-2.5 py-1.5 text-sm",
			md: "px-3 py-2.5 text-sm",
			lg: "px-4 py-3 text-base",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

type InputProps = ComponentProps<"input"> & VariantProps<typeof inputVariants>;

export function Input({ size, className, ...props }: InputProps) {
	return (
		<input className={inputVariants({ size, className })} {...props} />
	);
}
