import * as React from "react";
import { Navigate, useLoaderData } from "@tanstack/react-router";

interface Season {
  id: string;
  start_date: string;
  end_date: string;
}

export const ScheduleLoader: React.FC = () => {
  // const [schedule, setSchedule] = React.useState()
  const activeSeasons: Season[] = useLoaderData({
    from: "/__authenticated/schedule/"
  });

  if (activeSeasons && activeSeasons.length !== 0) {
    const seasonId = activeSeasons[0].id;
    return <Navigate to={`/schedule/$seasonId`} params={{ seasonId }} />;
  }

  return <Navigate to="/create-new-season" />;
};
