import type { SeedClient } from "@snaplet/seed";

export async function seedUserRoles(
  seed: SeedClient,
  adminIndex: number[],
  managerIndexes: number[]
) {
  const user_roles = [] as { role_id: string; user_id: string }[];
  const adminRoleId =
    seed.$store.roles.find(({ role }) => role === "admin")?.id ?? "";
  const managerRoleId =
    seed.$store.roles.find(({ role }) => role === "manager")?.id ?? "";
  const playerRoleId =
    seed.$store.roles.find(({ role }) => role === "player")?.id ?? "";
  for (const [index, user] of seed.$store.auth_users.entries()) {
    if (adminIndex.includes(index)) {
      // add to admin role
      user_roles.push({
        role_id: adminRoleId,
        user_id: user.id
      });
    }
    if (managerIndexes.includes(index)) {
      // add to manager role
      user_roles.push({
        role_id: managerRoleId,
        user_id: user.id
      });
    }

    // add to player role
    user_roles.push({
      role_id: playerRoleId,
      user_id: user.id
    });
  }
  await seed.user_role(user_roles);
}
