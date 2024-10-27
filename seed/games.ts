import type { SeedClient } from "@snaplet/seed";

import { generateSchedule } from "../src/features/schedule";

const seasonStart = new Date("May 4, 2025");
const weeksInSeason = 10;
const gameDays = Array.from({ length: weeksInSeason }, (_, i) => {
  // Create a new date instance based on the original seasonStart
  const date = new Date(seasonStart);
  date.setDate(seasonStart.getDate() + i * 7);
  return date;
});

export async function seedGames(seed: SeedClient) {
  const teamIds = seed.$store.teams.map(team => team.id);
  const games = generateSchedule(teamIds, gameDays);
  await seed.games(
    games.map(game => ({
      ...game,
      home_team_runs: Math.floor(Math.random() * 10),
      away_team_runs: Math.floor(Math.random() * 10)
    }))
  );
}
