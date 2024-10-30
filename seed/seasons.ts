import type { SeedClient } from "@snaplet/seed";

export async function seedSeasons(seed: SeedClient) {
  // No idea why this is providing a linting issue
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await seed.seasons([
    {
      start_date: new Date("September 29, 2024"),
      end_date: new Date("November 30, 2024")
    }
  ]);
}
