import { createFileRoute, Link } from "@tanstack/react-router";

const Login = () => {
  return (
    <div>
      <p>Hello /__auth/login!</p>
      <Link to="/signup">Go to signup</Link>
    </div>
  );
};
export const Route = createFileRoute("/__auth/login")({
  component: Login
});
