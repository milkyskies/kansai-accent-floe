import type { Session } from "@supabase/supabase-js";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import {
	getSession,
	onAuthStateChange,
} from "#/services/supabase/auth/auth-service";

type AuthContextValue = {
	session: Session | null;
	loading: boolean;
};

const AuthContext = createContext<AuthContextValue>({
	session: null,
	loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getSession().then((s) => {
			setSession(s);
			setLoading(false);
		});

		const subscription = onAuthStateChange((s) => {
			setSession(s);
		});

		return () => subscription.unsubscribe();
	}, []);

	return (
		<AuthContext value={{ session, loading }}>
			{children}
		</AuthContext>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
