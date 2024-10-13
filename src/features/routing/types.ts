import { router } from "./router";

export interface IRouterContext {
  userId: string;
}
// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
