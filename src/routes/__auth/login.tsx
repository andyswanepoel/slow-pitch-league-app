import { createFileRoute, Link } from "@tanstack/react-router";
import { LogInForm } from "../../features/auth/components/LogInForm";

const Login = () => {
  return <LogInForm />;
};
export const Route = createFileRoute("/__auth/login")({
  component: Login
});
