import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { httpAction } from "./_generated/server";

import { WebhookEvent } from "@clerk/nextjs/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

const http = httpRouter();

const handleClerkWebhook = httpAction(async (ctx, request) => {
	const event = await validatePayload(request);

	if (!event) {
		return new Response("Could not verify webhook request!", {
			status: 400,
		});
	}

	switch (event.type) {
		case "user.created": {
			const user = await ctx.runQuery(internal.users.getUser, {
				id: event.data.id,
			});

			if (!user) {
				console.log(`User not found!`);
			}

			console.log("Creating a new user!");

			await ctx.runMutation(internal.users.createUser, {
				username: `${event.data.first_name} ${event.data.last_name}`,
				imageUrl: event.data.image_url,
				clerkID: event.data.id,
				email: event.data.email_addresses[0].email_address,
			});

			break;
		}
		case "user.deleted": {
			if (!event.data.id) {
				break;
			}

			console.log(event.data.id);

			await ctx.runMutation(internal.users.deleteUserByClerkID, {
				clerkId: event.data.id as Id<"users">,
			});

			break;
		}
		// case "user.updated": {
		// 	console.log(`Updating user: ${event.data.id}`);

		// 	await ctx.runMutation(internal.users.createUser, {
		// 		username: `${event.data.first_name} ${event.data.last_name}`,
		// 		imageUrl: event.data.image_url,
		// 		clerkID: event.data.id,
		// 		email: event.data.email_addresses[0].email_address,
		// 	});

		// 	break;
		// }
		default: {
			console.log("Webhook not supported", event.type);
		}
	}

	return new Response(null, {
		status: 200,
	});
});
async function validatePayload(
	req: Request
): Promise<WebhookEvent | undefined> {
	const payload = await req.text();

	const svixHeaders = {
		"svix-id": req.headers.get("svix-id")!,
		"svix-timestamp": req.headers.get("svix-timestamp")!,
		"svix-signature": req.headers.get("svix-signature")!,
	};

	const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

	try {
		const event = webhook.verify(payload, svixHeaders) as WebhookEvent;

		return event;
	} catch (error) {
		console.error("Webhook request cant be verified!");
	}
}

http.route({
	path: "/clerk-users-webhook",
	method: "POST",
	handler: handleClerkWebhook,
});

export default http;
