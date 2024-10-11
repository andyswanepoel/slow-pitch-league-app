import { createFileRoute } from "@tanstack/react-router";
import { SignUpForm } from "@features/auth";

export const Route = createFileRoute("/__auth/signup")({
  component: SignUpForm
});
