import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
	getLastMessageDetails,
	getUserByClerkID,
	tryToGetUserIdentity,
} from "./_utils";

export const getAllConversations = query({
	async handler(ctx) {
		const { currentUser } = await tryToGetUserIdentity(ctx);

		const coversationMemberships = await ctx.db
			.query("conversationMembers")
			.withIndex("by_memberId", (q) => q.eq("memberId", currentUser._id))
			.collect();

		const coversations = await Promise.all(
			coversationMemberships?.map(async (coversationMembership) => {
				const conversation = await ctx.db.get(
					coversationMembership.conversationId
				);

				if (!conversation) {
					throw new ConvexError(
						`Conversation ${coversationMembership.conversationId} not found!`
					);
				}

				return conversation;
			})
		);

		const conversationsWithDetails = await Promise.all(
			coversations.map(async (conversation) => {
				const allConversationMemeberships = await ctx.db
					.query("conversationMembers")
					.withIndex("by_conversationId", (q) =>
						q.eq("conversationId", conversation._id)
					)
					.collect();

				const lastMessage = await getLastMessageDetails(
					ctx,
					conversation.lastMessageId
				);

				if (conversation.isGroup) {
					const otherMembers = await Promise.all(
						allConversationMemeberships
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

				const [otherMemebership] = allConversationMemeberships.filter(
					(el) => el.memberId !== currentUser._id
				);

				const otherMember = await ctx.db.get(otherMemebership.memberId);

				return {
					conversation,
					otherMember,
					lastMessage,
				};
			})
		);

		return conversationsWithDetails;
	},
});

export const createGroup = mutation({
	args: {
		members: v.array(v.id("users")),
		name: v.string(),
	},
	async handler(ctx, args) {
		const { currentUser } = await tryToGetUserIdentity(ctx);

		const conversationId = await ctx.db.insert("conversations", {
			isGroup: true,
			name: args.name,
		});

		await Promise.all(
			[...args.members, currentUser._id].map(async (memberId) => {
				await ctx.db.insert("conversationMembers", {
					memberId,
					conversationId,
				});
			})
		);
	},
});
