import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import {
	getLastMessageDetails,
	getUserByClerkID,
	tryToGetUserIdentity,
} from "./_utils";

export const getConversation = query({
	args: {
		id: v.id("conversations"),
	},
	async handler(ctx, args) {
		const { currentUser } = await tryToGetUserIdentity(ctx);

		const conversation = await ctx.db.get(args.id);

		if (!conversation) {
			throw new ConvexError(`Conversation ${args.id} not found!`);
		}

		const membership = await ctx.db
			.query("conversationMembers")
			.withIndex("by_memberId_conversationId", (q) =>
				q.eq("memberId", currentUser._id).eq("conversationId", conversation._id)
			)
			.unique();

		if (!membership) {
			throw new ConvexError("You are not a member of this conversation!");
		}

		const allConversationMemberships = await ctx.db
			.query("conversationMembers")
			.withIndex("by_conversationId", (q) => q.eq("conversationId", args.id))
			.collect();

		const lastMessage = await getLastMessageDetails(
			ctx,
			conversation.lastMessageId
		);

		if (conversation.isGroup) {
			const otherMembers = await Promise.all(
				allConversationMemberships
					.filter((el) => el.memberId !== currentUser._id)
					.map(async (el) => {
						const member = await ctx.db
							.query("users")
							.withIndex("by_id", (q) => q.eq("_id", el.memberId))
							.unique();

						if (!member) {
							throw new ConvexError(`User ${el.memberId} not found!`);
						}

						return member;
					})
			);

			return {
				conversation,
				otherMembers,
				otherMember: null,
				lastMessage,
			};
		}

		const otherMembership = allConversationMemberships.filter(
			(el) => el.memberId !== currentUser._id
		)[0];

		const otherMemberDetails = await ctx.db.get(otherMembership.memberId);

		return {
			...conversation,
			otherMember: {
				...otherMemberDetails,
				lastSeenMessageId: otherMembership.lastSeenMessageId,
			},
			otherMembers: null,
		};
	},
});
