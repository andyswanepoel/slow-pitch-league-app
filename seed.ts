/**
 * ! Executing this script will delete all data in your database and seed it with 10 auth_users.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";
import { seedUserRoles } from "./seed/user_role";
import { seedRoles } from "./seed/roles";
import { numberOfUsers, seedAuthUsers } from "./seed/auth_users";
import { getRandomNumbers } from "./seed/utils";
import { seedTeams, teams } from "./seed/teams";
import { seedGames } from "./seed/games";
import { seedSeasons } from "./seed/seasons";

const managerIndexes = getRandomNumbers(teams.length, numberOfUsers);
const adminIndex = getRandomNumbers(1, numberOfUsers);

const main = async () => {
  const seed = await createSeedClient({ dryRun: true });

  // Truncate all tables in the database
  await seed.$resetDatabase();

  await seedAuthUsers(seed);

  await seedRoles(seed);

  await seedTeams(seed, managerIndexes);

  await seedUserRoles(seed, adminIndex, managerIndexes);

  await seedGames(seed);

  await seedSeasons(seed);

  process.exit();
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
