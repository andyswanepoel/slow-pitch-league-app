import { createFileRoute } from "@tanstack/react-router";
import { SignUpForm, RedirectAuthenticatedUserHome } from "@features/auth";

const SignUp = () => {
  return (
    <RedirectAuthenticatedUserHome>
      <SignUpForm />
    </RedirectAuthenticatedUserHome>
  );
};

export const Route = createFileRoute("/__users/signup")({
  component: SignUp
});
