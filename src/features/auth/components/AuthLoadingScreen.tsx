import * as React from "react";
import { useAuth } from "@libs/auth";
import { Loader } from "@libs/ui";

export const AuthLoadingScreen: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const { loaded } = useAuth();
  if (!loaded) {
    return <Loader />;
  }

  return <>{children}</>;
};
