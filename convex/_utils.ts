import { ConvexError } from "convex/values";
import { MutationCtx, QueryCtx } from "./_generated/server";

type Ctx = QueryCtx | MutationCtx;

export async function getUserByClerkID(ctx: Ctx, id: string) {
	return await ctx.db
		.query("users")
		.withIndex("by_clerkID", (q) => q.eq("clerkID", id))
		.unique();
}

export async function tryToGetUserIdentity(ctx: Ctx) {
	const identity = await ctx.auth.getUserIdentity();

	if (!identity) {
		throw new ConvexError("Unauthorized!");
	}

	const currentUser = await getUserByClerkID(ctx, identity.subject);

	if (!currentUser) {
		throw new ConvexError(`User ${identity.email} not found!`);
	}

	return {
		currentUser,
		identity,
	};
}
