import { tv, type VariantProps } from "tailwind-variants";

export const spinnerVariants = tv({
	base: "animate-spin rounded-full border-[var(--text-soft)] border-t-transparent",
	variants: {
		size: {
			sm: "h-5 w-5 border-2",
			md: "h-8 w-8 border-4",
			lg: "h-12 w-12 border-4",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

type SpinnerProps = VariantProps<typeof spinnerVariants> & {
	className?: string;
};

export function Spinner({ size, className }: SpinnerProps) {
	return <div className={spinnerVariants({ size, className })} />;
}
