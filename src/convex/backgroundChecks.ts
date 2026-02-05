"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { WebClient } from "@slack/web-api";

const returnType = {
  pass: v.boolean(),
  message: v.optional(v.string()),
};

export const idv = internalAction({
  args: {
    slackId: v.string(),
  },
  returns: returnType,
  handler: async (ctx, { slackId }) => {
    const idvRequest = await fetch(
      "https://auth.hackclub.com/api/external/check?slack_id=" + slackId,
    );

    const idvResponse = (await idvRequest.json()) as {
      result:
        | "needs_submission" // User hasn't started verification
        | "pending" // Verification is being reviewed
        | "verified_eligible" // Verified and eligible for YSWS (under 18)
        | "verified_but_over_18" // Verified but over 18
        | "rejected" // Verification was rejected
        | "not_found"; // No user found with the provided identifier
    };

    if (idvResponse.result === "verified_eligible") {
      return {
        pass: true,
      };
    } else {
      return {
        pass: false,
        message: "IDV status: " + idvResponse.result,
      };
    }
  },
});
