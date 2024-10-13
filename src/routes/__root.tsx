import * as React from "react";
import { createRootRouteWithContext } from "@tanstack/react-router";
import type { IRouterContext } from "@features/routing";
import { Layout } from "../Layout";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then(res => ({
          default: res.TanStackRouterDevtools
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

export const Route = createRootRouteWithContext<IRouterContext>()({
  component: () => (
    <>
      <Layout />
      <React.Suspense>
        <TanStackRouterDevtools />
      </React.Suspense>
    </>
  )
});
