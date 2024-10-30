import { createFileRoute } from "@tanstack/react-router";
import { ScheduleLoader, getActiveSeasons } from "@features/schedule";
import { Loader } from "@libs/ui";

export const Route = createFileRoute("/__authenticated/schedule/")({
  component: ScheduleLoader,
  loader: getActiveSeasons,
  pendingComponent: Loader
});
