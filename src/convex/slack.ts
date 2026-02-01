"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { WebClient } from "@slack/web-api";

// Read a token from the environment variables
const token = process.env.SLACK_BOT_TOKEN;

// Initialize
const client = new WebClient(token);

export const unfurl = internalAction({
  args: {
    unfurlId: v.string(),
  },
  handler: async (ctx, args) => {
    await client.chat.unfurl({
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

export const joinmodal = internalAction({
  args: {
    trigger_id: v.string(),
  },
  handler: async (ctx, { trigger_id }) => {
    await client.views.open({
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
