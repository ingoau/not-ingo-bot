import { internal } from "./_generated/api";
import { internalAction, internalMutation } from "./_generated/server";
import { CHANNELS } from "./constants";
import { v } from "convex/values";

export const sync = internalAction({
  handler: async (ctx) => {
    const t1members = await ctx.runAction(internal.slack.listMembers, {
      channelId: CHANNELS.t1,
    });
    const t2members = await ctx.runAction(internal.slack.listMembers, {
      channelId: CHANNELS.t2,
    });
    const t3members = await ctx.runAction(internal.slack.listMembers, {
      channelId: CHANNELS.t3,
    });

    await ctx.runMutation(internal.membership.storeSyncData, {
      t1members: t1members || [],
      t2members: t2members || [],
      t3members: t3members || [],
    });
  },
});

export const storeSyncData = internalMutation({
  args: {
    t1members: v.array(v.string()),
    t2members: v.array(v.string()),
    t3members: v.array(v.string()),
  },
  handler: async (ctx, { t1members, t2members, t3members }) => {
    const allMembers = [...new Set([...t1members, ...t2members, ...t3members])];
  },
});
