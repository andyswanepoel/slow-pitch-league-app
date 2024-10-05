import { createFileRoute } from "@tanstack/react-router";
import { SignUpForm } from "../../features/auth/components/SignUpForm";

const SignUp = () => {
  return (
    <div>
      <SignUpForm />
    </div>
  );
};

export const Route = createFileRoute("/__auth/signup")({
  component: SignUp
});
