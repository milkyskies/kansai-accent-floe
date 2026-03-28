import { Search } from "lucide-react";
import type { ComponentProps } from "react";

export function SearchIcon(props: ComponentProps<typeof Search>) {
	return <Search {...props} />;
}
