import { createFileRoute } from "@tanstack/react-router";
import { getUser, WelcomePage } from "@features/users";
import { Loader } from "@libs/ui";

export const Route = createFileRoute("/welcome")({
  component: WelcomePage,
  loader: ({ context }) => getUser(context.userId),
  pendingComponent: Loader
});
