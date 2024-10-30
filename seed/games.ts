import type { SeedClient } from "@snaplet/seed";

import { generateSchedule } from "../src/features/schedule";

const seasonStart = new Date("May 4, 2025");
const seasonEnd = new Date("July 25, 2025");

export async function seedGames(seed: SeedClient) {
  const teamIds = seed.$store.teams.map(team => team.id);
  const games = generateSchedule(teamIds, seasonStart, seasonEnd);
  await seed.games(
    games.map(game => ({
      ...game,
      home_team_runs: Math.floor(Math.random() * 10),
      away_team_runs: Math.floor(Math.random() * 10)
    }))
  );
}
