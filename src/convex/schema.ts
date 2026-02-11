import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    slackId: v.string(),
    slackDisplayName: v.optional(v.string()),
    slackName: v.optional(v.string()),
    isInT1: v.boolean(),
    isInT2: v.boolean(),
    isInT3: v.boolean(),
    notes: v.optional(v.string()),
  }),
});
