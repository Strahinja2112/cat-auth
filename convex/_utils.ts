import { ConvexError } from "convex/values";
import { Id } from "./_generated/dataModel";
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

export async function getLastMessageDetails(ctx: Ctx, id?: Id<"messages">) {
	if (!id) {
		return null;
	}

	const message = await ctx.db.get(id);
	if (!message) {
		return null;
	}

	const sender = await ctx.db.get(message.authorId);

	if (!sender) {
		return null;
	}

	const content = getMessageContent(
		message.type,
		message.body as unknown as string
	);

	return {
		content,
		sender: sender.username,
	};
}

function getMessageContent(type: string, content: string) {
	switch (type) {
		case "text":
			return content;

		default:
			return "[Non-Text]";
	}
}
