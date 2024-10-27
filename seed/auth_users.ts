import type { SeedClient } from "@snaplet/seed";
import { copycat } from "@snaplet/copycat";

export const numberOfUsers = 20;

export async function seedAuthUsers(seed: SeedClient) {
  await seed.auth_users(x =>
    x(numberOfUsers, ctx => {
      const firstName = copycat.firstName(ctx.seed);
      const lastName = copycat.lastName(ctx.seed);
      return {
        email: `andyp.swanepoel+${firstName}-${lastName}@gmail.com`,

        raw_user_meta_data: () => ({
          first_name: firstName,
          last_name: lastName
        })
      };
    })
  );
}
