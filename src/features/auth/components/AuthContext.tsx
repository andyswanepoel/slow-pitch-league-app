import * as React from "react";
import supabase from "../../../utils/supabase";
import type { Session } from "@supabase/supabase-js";

const AuthContext = React.createContext({});

// function countReducer(state, action) {
//   switch (action.type) {
//     case "increment": {
//       return { count: state.count + 1 };
//     }
//     case "decrement": {
//       return { count: state.count - 1 };
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`);
//     }
//   }
// }

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [session, setSession] = React.useState<Session | null>(null);

  React.useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        // Do error stuff if needed
      }

      setSession(data.session);
    };

    void fetchSession();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = { userLoggedIn: !!session };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};
