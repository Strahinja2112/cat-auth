import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserByClerkID, tryToGetUserIdentity } from "./_utils";

export const create = mutation({
	args: {
		email: v.string(),
	},
	async handler(ctx, args) {
		const { currentUser, identity } = await tryToGetUserIdentity(ctx);

		console.log(args.email, identity.email);

		if (args.email === identity.email) {
			throw new ConvexError("Cannot send request to yourself");
		}

		const reciever = await ctx.db
			.query("users")
			.withIndex("by_email", (q) => q.eq("email", args.email))
			.unique();

		if (!reciever) {
			throw new ConvexError("User not found!");
		}

		const reqAlreadySent = await ctx.db
			.query("requests")
			.withIndex("by_reciever_sender", (q) =>
				q.eq("reciever", reciever._id).eq("sender", currentUser._id)
			)
			.unique();

		if (reqAlreadySent) {
			throw new ConvexError("Request already sent!");
		}

		const reqAlreadyRecieved = await ctx.db
			.query("requests")
			.withIndex("by_reciever_sender", (q) =>
				q.eq("reciever", currentUser._id).eq("sender", reciever._id)
			)
			.unique();

		if (reqAlreadyRecieved) {
			throw new ConvexError("Request already sent!");
		}

		const friends1 = await ctx.db
			.query("friends")
			.withIndex("by_user1Id", (q) => q.eq("user1Id", currentUser._id))
			.collect();

		const friends2 = await ctx.db
			.query("friends")
			.withIndex("by_user2Id", (q) => q.eq("user2Id", currentUser._id))
			.collect();

		if (
			friends1.some((friend) => friend.user2Id === reciever._id) ||
			friends2.some((friend) => friend.user1Id === reciever._id)
		) {
			throw new ConvexError("Already friends!");
		}

		const req = await ctx.db.insert("requests", {
			reciever: reciever._id,
			sender: currentUser._id,
		});

		return req;
	},
});

export const denyFriendRequest = mutation({
	args: {
		id: v.id("requests"),
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new ConvexError("Unauthorized!");
		}

		const currentUser = await getUserByClerkID(ctx, identity.subject);

		if (!currentUser) {
			throw new ConvexError("User not found!");
		}

		const request = await ctx.db.get(args.id);

		if (!request || request.reciever !== currentUser._id) {
			throw new ConvexError("Not allowed!");
		}

		await ctx.db.delete(request._id);
	},
});

export const acceptFriendRequest = mutation({
	args: {
		id: v.id("requests"),
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new ConvexError("Unauthorized!");
		}

		const currentUser = await getUserByClerkID(ctx, identity.subject);

		if (!currentUser) {
			throw new ConvexError("User not found!");
		}

		const request = await ctx.db.get(args.id);

		if (!request || request.reciever !== currentUser._id) {
			throw new ConvexError("Not allowed!");
		}

		const conversationId = await ctx.db.insert("conversations", {
			isGroup: false,
		});

		await ctx.db.insert("friends", {
			user1Id: currentUser._id,
			user2Id: request.sender,
			conversationId,
		});

		await ctx.db.insert("conversationMembers", {
			memberId: currentUser._id,
			conversationId,
		});

		await ctx.db.insert("conversationMembers", {
			memberId: request.sender,
			conversationId,
		});

		await ctx.db.delete(request._id);
	},
});
