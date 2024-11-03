import { getActiveTeams, getGamesBySeason } from "@features/schedule/api";
import { SeasonSchedule } from "@features/schedule/components/SeasonSchedule";
import { Loader } from "@libs/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__authenticated/schedule/$seasonId")({
  loader: async ({ params }) => {
    const schedule = await getGamesBySeason(params.seasonId);
    const teams = await getActiveTeams();

    return { schedule, teams };
  },
  pendingComponent: Loader,
  component: SeasonSchedule
});
