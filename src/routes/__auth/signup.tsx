import { createFileRoute, Link } from "@tanstack/react-router";

const SignUp = () => {
  return (
    <div>
      <p>Hello /__auth/signup!</p>
      <Link to="/login">Go to login</Link>
    </div>
  );
};

export const Route = createFileRoute("/__auth/signup")({
  component: SignUp
});
