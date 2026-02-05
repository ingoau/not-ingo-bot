"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { WebClient } from "@slack/web-api";

export const idv = internalAction({
  args: {
    slackId: v.string(),
  },
  handler: async (ctx, { slackId }) => {
    const idvRequest = await fetch(
      "https://auth.hackclub.com/api/external/check?slack_id=" + slackId,
    );

    const idvResponse = (await idvRequest.json()) as {
      result:
        | "needs_submission"
        | "pending"
        | "verified_eligible"
        | "verified_but_over_18"
        | "rejected"
        | "not_found";
    };
    return idvResponse;
  },
});
