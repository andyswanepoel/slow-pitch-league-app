import type { SeedClient } from "@snaplet/seed";

export const roles = ["admin", "manager", "player"];

export async function seedRoles(seed: SeedClient) {
  await seed.roles(roles.map(role => ({ role })));
}
