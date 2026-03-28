import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentProps } from "react";

export const cardVariants = tv({
	base: "rounded-xl border border-[var(--line)] bg-[var(--surface)] smooth-shadow",
	variants: {
		padding: {
			sm: "p-4",
			md: "p-6",
			lg: "p-8",
		},
	},
	defaultVariants: {
		padding: "md",
	},
});

type CardProps = ComponentProps<"div"> & VariantProps<typeof cardVariants>;

export function Card({ padding, className, ...props }: CardProps) {
	return <div className={cardVariants({ padding, className })} {...props} />;
}
