import * as React from "react";
import supabase from "../supabase";
import type { Session } from "@supabase/supabase-js";

interface IAuthContext {
  loaded: boolean;
  authenticated: boolean;
}

export const AuthContext = React.createContext<IAuthContext>({
  loaded: false,
  authenticated: false
});

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [session, setSession] = React.useState<Session | null>(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        // Do error stuff if needed
      }

      setSession(data.session);
      setLoaded(true);
    };
    void fetchSession();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    loaded,
    authenticated: !!session
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
