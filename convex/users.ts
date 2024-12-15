import { v } from "convex/values";
import { internalMutation, internalQuery, mutation } from "./_generated/server";

export const createUser = internalMutation({
	args: {
		username: v.string(),
		imageUrl: v.string(),
		clerkID: v.string(),
		email: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.insert("users", args);
	},
});

export const getUser = internalQuery({
	args: {
		id: v.string(),
	},
	async handler(ctx, args) {
		return ctx.db
			.query("users")
			.withIndex("by_clerkID", (q) => q.eq("clerkID", args.id))
			.unique();
	},
});

export const deleteUserByClerkID = internalMutation({
	args: {
		clerkId: v.string(),
	},
	async handler(ctx, args) {
		const user = await ctx.db
			.query("users")
			.withIndex("by_clerkID", (q) => q.eq("clerkID", args.clerkId))
			.unique();

		if (!user) {
			return;
		}

		await ctx.db.delete(user._id);
	},
});
