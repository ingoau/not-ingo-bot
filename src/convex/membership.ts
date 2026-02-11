import { internal } from "./_generated/api";
import { internalAction, internalMutation } from "./_generated/server";
import { CHANNELS, GROUPS } from "./constants";
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

    const pingGroupMembers = await ctx.runAction(
      internal.slack.listGroupMembers,
      {
        groupId: GROUPS.ping,
      },
    );

    await ctx.runMutation(internal.membership.storeSyncData, {
      t1members: t1members || [],
      t2members: t2members || [],
      t3members: t3members || [],
      pingGroupMembers: pingGroupMembers || [],
    });
  },
});

export const storeSyncData = internalMutation({
  args: {
    t1members: v.array(v.string()),
    t2members: v.array(v.string()),
    t3members: v.array(v.string()),
    pingGroupMembers: v.array(v.string()),
  },
  handler: async (
    ctx,
    { t1members, t2members, t3members, pingGroupMembers },
  ) => {
    const allMembers = [...new Set([...t1members, ...t2members, ...t3members])];
    allMembers.forEach(async (member) => {
      const existing = await ctx.db
        .query("users")
        .withIndex("by_slack_id", (q) => q.eq("slackId", member))
        .first();
      const tiers = {
        isInT1: t1members.includes(member),
        isInT2: t2members.includes(member),
        isInT3: t3members.includes(member),
        isInPingGroup: pingGroupMembers.includes(member),
      };
      if (existing) {
        await ctx.db.patch("users", existing._id, {
          ...tiers,
        });
      } else {
        await ctx.db.insert("users", {
          slackId: member,
          ...tiers,
        });
      }
    });
  },
});
