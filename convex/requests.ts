import { ConvexError } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkID, tryToGetUserIdentity } from "./_utils";

export const getAllRequests = query({
	async handler(ctx) {
		const { currentUser } = await tryToGetUserIdentity(ctx);

		const requests = await ctx.db
			.query("requests")
			.withIndex("by_reciever", (q) => q.eq("reciever", currentUser._id))
			.collect();

		const fullRequests = await Promise.all(
			requests.map(async (request) => {
				const sender = await ctx.db.get(request.sender);

				if (!sender) {
					throw new ConvexError(`User ${request.sender} not found!`);
				}

				return {
					request,
					sender,
				};
			})
		);

		return fullRequests;
	},
});

export const getAllRequestsCount = query({
	async handler(ctx) {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new ConvexError("Unauthorized!");
		}

		const user = await getUserByClerkID(ctx, identity.subject);

		if (!user) {
			throw new ConvexError(`User ${identity.email} not found!`);
		}

		const requests = await ctx.db
			.query("requests")
			.withIndex("by_reciever", (q) => q.eq("reciever", user._id))
			.collect();

		return requests.length;
	},
});
