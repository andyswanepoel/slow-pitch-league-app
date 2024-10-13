import * as React from "react";
import { RouterProvider } from "@tanstack/react-router";

// Import the generated route tree
import { useAuth } from "@libs/auth";
import { router } from "../router";

export const RouterProviderWithContext: React.FC = () => {
  const { userId } = useAuth();

  const context = React.useMemo(
    () => ({
      userId
    }),
    [userId]
  );

  return <RouterProvider router={router} context={context} />;
};
