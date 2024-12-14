import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { tryToGetUserIdentity } from "./_utils";

export const remove = mutation({
	args: {
		conversationId: v.id("conversations"),
	},
	async handler(ctx, args) {
		await tryToGetUserIdentity(ctx);

		const conversation = await ctx.db.get(args.conversationId);
		if (!conversation) {
			throw new ConvexError("Conversation not found!");
		}

		const memberships = await ctx.db
			.query("conversationMembers")
			.withIndex("by_conversationId", (q) =>
				q.eq("conversationId", args.conversationId)
			)
			.collect();
		if (!memberships || memberships.length !== 2) {
			throw new ConvexError("This conversation does not have 2 members!");
		}

		const friendship = await ctx.db
			.query("friends")
			.withIndex("by_conversationId", (q) =>
				q.eq("conversationId", args.conversationId)
			)
			.unique();

		if (!friendship) {
			throw new ConvexError("Friendship not found!");
		}

		const messages = await ctx.db
			.query("messages")
			.withIndex("by_conversationId", (q) =>
				q.eq("conversationId", args.conversationId)
			)
			.collect();

		await ctx.db.delete(args.conversationId);
		await ctx.db.delete(friendship._id);
		await Promise.all(
			memberships.map((membership) => ctx.db.delete(membership._id))
		);
		await Promise.all(messages.map((message) => ctx.db.delete(message._id)));
	},
});
