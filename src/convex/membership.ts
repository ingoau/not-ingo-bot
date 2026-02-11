import { internal } from "./_generated/api";
import { internalAction } from "./_generated/server";
import { CHANNELS } from "./constants";

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

    const members = [
      ...new Set([
        ...(t1members || []),
        ...(t2members || []),
        ...(t3members || []),
      ]),
    ];
  },
});
