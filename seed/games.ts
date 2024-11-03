import type { SeedClient } from "@snaplet/seed";

import { generateSchedule } from "../src/features/schedule/create-schedule/generateSchedule";

const seasonStart = new Date("May 4, 2025");
const seasonEnd = new Date("July 25, 2025");

export async function seedGames(seed: SeedClient) {
  const teamIds = seed.$store.teams
    .map(team => team.id ?? "")
    .filter(id => Boolean(id));
  const games = generateSchedule(teamIds, seasonStart, seasonEnd);

  await seed.games(
    games.map(game => ({
      ...game,
      // something weird is going on with the seasons...
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      season_id: seed.$store.seasons[0].id as string,
      home_team_runs: Math.floor(Math.random() * 10),
      away_team_runs: Math.floor(Math.random() * 10)
    }))
  );
}
