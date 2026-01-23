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
        callback_id: "modal-identifier",
        title: {
          type: "plain_text",
          text: "Just a modal",
        },
        blocks: [
          {
            type: "section",
            block_id: "section-identifier",
            text: {
              type: "mrkdwn",
              text: "*Welcome* to ~my~ Block Kit _modal_!",
            },
            accessory: {
              type: "button",
              text: {
                type: "plain_text",
                text: "Just a button",
              },
              action_id: "button-identifier",
            },
          },
        ],
      },
    });
  },
});
