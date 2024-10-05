import * as React from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../features/navigation/components/Header";
import { Footer } from "../features/navigation/components/Footer";

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

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <React.Suspense>
        <TanStackRouterDevtools />
      </React.Suspense>
    </>
  )
});
