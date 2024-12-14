import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";

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
