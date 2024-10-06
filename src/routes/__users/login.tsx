import { createFileRoute } from "@tanstack/react-router";
import { LogInForm, RedirectAuthenticatedUserHome } from "@features/auth";

const Login = () => {
  return (
    <RedirectAuthenticatedUserHome>
      <LogInForm />
    </RedirectAuthenticatedUserHome>
  );
};

export const Route = createFileRoute("/__users/login")({
  component: Login
});
