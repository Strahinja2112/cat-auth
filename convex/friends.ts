import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { tryToGetUserIdentity } from "./_utils";

export const getAllFriends = query({
	async handler(ctx) {
		const { currentUser } = await tryToGetUserIdentity(ctx);
		const friendShips1 = await ctx.db
			.query("friends")
			.withIndex("by_user1Id", (q) => q.eq("user1Id", currentUser._id))
			.collect();

		const friendShips2 = await ctx.db
			.query("friends")
			.withIndex("by_user2Id", (q) => q.eq("user2Id", currentUser._id))
			.collect();

		const friendships = [...friendShips1, ...friendShips2];

		const friends = await Promise.all(
			friendships.map(async (friendship) => {
				const friend = await ctx.db.get(
					friendship.user1Id === currentUser._id
						? friendship.user2Id
						: friendship.user1Id
				);

				if (!friend) {
					throw new ConvexError(`User ${friendship.user1Id} not found!`);
				}

				return friend;
			})
		);

		return friends;
	},
});
