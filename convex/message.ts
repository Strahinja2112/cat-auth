import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { tryToGetUserIdentity } from "./_utils";

export const create = mutation({
	args: {
		conversationId: v.id("conversations"),
		type: v.string(),
		body: v.array(v.string()),
	},
	async handler(ctx, args) {
		const { currentUser } = await tryToGetUserIdentity(ctx);

		const membership = await ctx.db
			.query("conversationMembers")
			.withIndex("by_memberId_conversationId", (q) =>
				q
					.eq("memberId", currentUser._id)
					.eq("conversationId", args.conversationId)
			)
			.unique();

		if (!membership) {
			throw new ConvexError("You are not a member of this conversation!");
		}

		const message = await ctx.db.insert("messages", {
			authorId: currentUser._id,
			...args,
		});

		await ctx.db.patch(args.conversationId, {
			lastMessageId: message,
		});

		return message;
	},
});
