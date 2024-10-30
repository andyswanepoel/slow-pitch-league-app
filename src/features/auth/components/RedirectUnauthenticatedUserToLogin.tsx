import * as React from "react";
import { Navigate } from "@tanstack/react-router";
import { useAuth } from "@libs/auth";

export const RedirectUnauthenticatedUserToLogin: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
