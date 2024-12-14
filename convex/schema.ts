import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	users: defineTable({
		username: v.string(),
		imageUrl: v.string(),
		clerkID: v.string(),
		email: v.string(),
	})
		.index("by_email", ["email"])
		.index("by_clerkID", ["clerkID"]),
	requests: defineTable({
		sender: v.id("users"),
		reciever: v.id("users"),
	})
		.index("by_reciever", ["reciever"])
		.index("by_reciever_sender", ["reciever", "sender"]),
	friends: defineTable({
		user1Id: v.id("users"),
		user2Id: v.id("users"),
		conversationId: v.id("conversations"),
	})
		.index("by_user1Id", ["user1Id"])
		.index("by_user2Id", ["user2Id"])
		.index("by_conversationId", ["conversationId"]),
	conversations: defineTable({
		name: v.optional(v.string()),
		isGroup: v.boolean(),
		lastMessageId: v.optional(v.id("messages")),
	}),
	conversationMembers: defineTable({
		memberId: v.id("users"),
		conversationId: v.id("conversations"),
		lastSeenMessageId: v.optional(v.id("messages")),
	})
		.index("by_memberId", ["memberId"])
		.index("by_conversationId", ["conversationId"])
		.index("by_memberId_conversationId", ["memberId", "conversationId"]),
	messages: defineTable({
		authorId: v.id("users"),
		conversationId: v.id("conversations"),
		type: v.string(),
		body: v.array(v.string()),
	}).index("by_conversationId", ["conversationId"]),
});
