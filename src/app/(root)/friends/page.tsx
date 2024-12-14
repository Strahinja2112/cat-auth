"use client";

import AddFriendForm from "@/components/add-friend";
import ConversationFallback from "@/components/conversation-fallback";
import FriendRequest from "@/components/friend-request";
import ItemList from "@/components/item-list";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React from "react";
import { api } from "../../../../convex/_generated/api";

type Props = {};

export default function FriendsPage({}: Props) {
	const requests = useQuery(api.requests.getAllRequests);

	return (
		<>
			<ItemList title="Friends" action={<AddFriendForm />}>
				{requests ? (
					requests.length > 0 ? (
						requests.map(({ request, sender }) => (
							<FriendRequest
								key={request._id}
								id={request._id}
								imageUrl={sender.imageUrl}
								username={sender.username}
								email={sender.email}
							/>
						))
					) : (
						<p className="w-full text-center text-muted-foreground">
							No friend requests yet :{"("}
						</p>
					)
				) : (
					<Loader2 className="size-8 text-muted-foreground" />
				)}
			</ItemList>
			<ConversationFallback />
		</>
	);
}
