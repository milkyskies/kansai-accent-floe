import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentProps } from "react";

export const buttonVariants = tv({
	base: "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:pointer-events-none disabled:opacity-50",
	variants: {
		variant: {
			primary: "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]",
			secondary:
				"border border-[var(--line)] bg-transparent text-[var(--text)] hover:bg-[var(--input-bg)]",
			ghost:
				"bg-transparent text-[var(--text-soft)] hover:bg-[var(--input-bg)] hover:text-[var(--text)]",
		},
		size: {
			sm: "gap-1.5 px-3 py-1.5 text-sm",
			md: "gap-2 px-4 py-2.5 text-sm",
			lg: "gap-2 px-5 py-3 text-base",
			icon: "h-10 w-10 p-2.5",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
	},
});

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function Button({ variant, size, className, ...props }: ButtonProps) {
	return (
		<button
			className={buttonVariants({ variant, size, className })}
			{...props}
		/>
	);
}
