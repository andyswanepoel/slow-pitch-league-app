import { createFileRoute } from "@tanstack/react-router";
import { CreateNewSeason, getActiveTeams } from "@features/schedule";

export const Route = createFileRoute("/__authenticated/create-new-season")({
  loader: getActiveTeams,
  component: CreateNewSeason
});
