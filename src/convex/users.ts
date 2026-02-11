import { internalQuery } from "./_generated/server";

export const list = internalQuery({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users;
  },
});
