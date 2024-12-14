import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkID, tryToGetUserIdentity } from "./_utils";

export const getAllMessages = query({
	args: {
		id: v.id("conversations"),
	},
	async handler(ctx, args) {
		const { currentUser } = await tryToGetUserIdentity(ctx);

		const membership = await ctx.db
			.query("conversationMembers")
			.withIndex("by_memberId_conversationId", (q) =>
				q.eq("memberId", currentUser._id).eq("conversationId", args.id)
			)
			.unique();

		if (!membership) {
			throw new ConvexError("You are not a member of this conversation!");
		}

		const messages = await ctx.db
			.query("messages")
			.withIndex("by_conversationId", (q) => q.eq("conversationId", args.id))
			.order("desc")
			.collect();

		const messagesWithUsers = await Promise.all(
			messages.map(async (message) => {
				const sender = await ctx.db.get(message.authorId);

				if (!sender) {
					throw new ConvexError(`User ${message.authorId} not found!`);
				}

				return {
					message,
					sender,
					isCurrentUser: sender._id === currentUser._id,
				};
			})
		);

		return messagesWithUsers;
	},
});
