import { createFileRoute } from "@tanstack/react-router";

const Index = () => {
  return (
    <div>
      <h3>Welcome Home!</h3>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Index
});