"use client";

import CreateGroupDialog from "@/components/dialogs/create-group-dialog";
import ConversationItem from "@/components/conversation-item";
import ItemList from "@/components/item-list";
import { useConversation } from "@/hooks/useConversation";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React, { PropsWithChildren } from "react";
import { api } from "../../../../convex/_generated/api";

export default function ConversationsLayout({ children }: PropsWithChildren) {
	const conversations = useQuery(api.conversations.getAllConversations);

	const { conversationID } = useConversation();

	return (
		<>
			<ItemList title="Conversations" action={<CreateGroupDialog />}>
				{conversations ? (
					conversations.length > 0 ? (
						conversations.map(({ conversation, otherMember, lastMessage }) => (
							<ConversationItem
								key={conversation?._id}
								id={conversation?._id!}
								active={conversation._id === conversationID}
								imageUrl={otherMember?.imageUrl}
								name={conversation.name || ""}
								username={otherMember?.username}
								lastMessage={lastMessage}
								isGroup={conversation.isGroup}
							/>
						))
					) : (
						<p className="w-full text-center text-muted-foreground">
							No friend conversations yet :{"("}
						</p>
					)
				) : (
					<Loader2 className="size-8 text-muted-foreground" />
				)}
			</ItemList>
			{children}
		</>
	);
}
