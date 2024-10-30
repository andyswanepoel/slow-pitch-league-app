import { getGamesBySeason } from "@features/schedule/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__authenticated/schedule/$seasonId")({
  loader: ({ params }) => getGamesBySeason(params.seasonId),
  component: () => <div>Hello /__authenticated/schedule/$seasonId!</div>
});
