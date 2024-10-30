import type { SeedClient } from "@snaplet/seed";

export async function seedSeasons(seed: SeedClient) {
  await seed.seasons([
    {
      start_date: new Date("September 29, 2024"),
      end_date: new Date("November 30, 2024")
    }
  ]);
}
