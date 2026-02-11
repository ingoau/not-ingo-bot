import { v } from "convex/values";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import {
  internalAction,
  internalMutation,
  internalQuery,
} from "./_generated/server";

export const list = internalQuery({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users;
  },
});

export const syncUserInfo = internalAction({
  handler: async (ctx) => {
    const users = await ctx.runQuery(internal.users.list);
    const usersWithInfo: {
      id: Id<"users">;
      slackDisplayName: string | undefined;
      slackName: string | undefined;
      isBot: boolean;
    }[] = [];
    await Promise.all(
      users.map(async (user) => {
        try {
          const userInfo = await ctx.runAction(internal.slack.getProfile, {
            slackId: user.slackId,
          });
          usersWithInfo.push({
            id: user._id,
            slackDisplayName: userInfo.profile?.display_name,
            slackName: userInfo.profile?.real_name,
            isBot: (userInfo.profile && "bot_id" in userInfo.profile) || false,
          });
        } catch {
          console.log("e");
        }
      }),
    );

    await ctx.runMutation(internal.users.saveUserInfo, {
      users: usersWithInfo,
    });
  },
});

export const saveUserInfo = internalMutation({
  args: {
    users: v.array(
      v.object({
        id: v.id("users"),
        slackDisplayName: v.optional(v.string()),
        slackName: v.optional(v.string()),
        isBot: v.boolean(),
      }),
    ),
  },
  handler: async (ctx, { users }) => {
    await Promise.all(
      users.map(async (user) => {
        await ctx.db.patch(user.id, {
          slackDisplayName: user.slackDisplayName,
          slackName: user.slackName,
          isBot: user.isBot,
        });
      }),
    );
  },
});
