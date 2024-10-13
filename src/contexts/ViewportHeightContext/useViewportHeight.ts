import * as React from "react";
import { ViewportHeightContext } from "./ViewportHeightContext";

export const useViewportHeight = () => {
  const context = React.useContext(ViewportHeightContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a ViewportHeightProvider");
  }
  return context;
};
