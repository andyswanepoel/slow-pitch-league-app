import type { SeedClient } from "@snaplet/seed";

export const teams = [
  "Broncos",
  "Colts",
  "Ravens",
  "Cardinals",
  "Seahawks",
  "Bills",
  "Saints",
  "Falcons",
  "Rams",
  "Bears"
];

export async function seedTeams(seed: SeedClient, managerIndexes: number[]) {
  await seed.teams(
    teams.map((name, i) => ({
      name,
      manager_id: seed.$store.auth_users[managerIndexes[i]].id
    }))
  );
}
