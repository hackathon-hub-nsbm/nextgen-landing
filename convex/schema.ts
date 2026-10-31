import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    phone_number: v.string(),
    gender: v.string(),
    batch: v.string(),
    degree: v.string(),
    isMember: v.boolean(),
    createdAt: v.optional(v.number()),
  }).index("by_email", ["email"]),
});
