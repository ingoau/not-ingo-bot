"use node";

import { v } from "convex/values";
import slackclient from "./slackclient";
import { internalAction } from "./_generated/server";

export const joinmodal = internalAction({
  args: {
    trigger_id: v.string(),
  },
  handler: async (ctx, { trigger_id }) => {
    await slackclient.views.open({
      trigger_id,
      view: {
        type: "modal",
        title: {
          type: "plain_text",
          text: "Join Ingo's Channel",
          emoji: true,
        },
        blocks: [
          {
            type: "rich_text",
            elements: [
              {
                type: "rich_text_section",
                elements: [
                  {
                    type: "text",
                    text: "Your request has been sent! (not it hasn't) You may be added very soon if the automated screening thing works (it won't). If not I will review it manually (please DM me if you want to join my channel).",
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  },
});
