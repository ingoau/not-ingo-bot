"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import slackclient from "./slackclient";

export const unfurl = internalAction({
  args: {
    unfurlId: v.string(),
  },
  handler: async (ctx, args) => {
    await slackclient.chat.unfurl({
      source: "conversations_history",
      unfurl_id: args.unfurlId,
      unfurls: {
        "https://dev.not.ingo.au/test": {
          text: "e",
        },
      },
    });
  },
});
