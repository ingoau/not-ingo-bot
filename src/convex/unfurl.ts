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
        "https://dev.not.ingo.au/join": {
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: "Join Ingo's Channel :ultrafastcatppuccinparrot:",
                emoji: true,
              },
            },
            {
              type: "actions",
              elements: [
                {
                  type: "button",
                  text: {
                    type: "plain_text",
                    text: "Join",
                    emoji: true,
                  },
                  style: "primary",
                  action_id: "join_request",
                },
              ],
            },
          ],
        },
      },
    });
  },
});
