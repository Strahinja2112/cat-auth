"use client";

import { useConversation } from "@/hooks/useConversation";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import Message from "./message";

type Props = {};

export default function ConversationBody({}: Props) {
	const { conversationID } = useConversation();

	const messages = useQuery(api.messages.getAllMessages, {
		id: conversationID as Id<"conversations">,
	});

	return (
		<div className="flex-1 w-full flex overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar">
			{messages?.map(({ message, sender, isCurrentUser }, idx) => {
				const lastByUser =
					messages[idx - 1]?.message.authorId ===
					messages[idx].message.authorId;

				return (
					<Message
						key={message._id + sender._id}
						fromCurrentUser={isCurrentUser}
						senderImage={sender.imageUrl}
						senderName={sender.username.split(" ")[0]}
						lastByUser={lastByUser}
						body={message.body}
						createdAt={message._creationTime}
						type={message.type}
					/>
				);
			})}
		</div>
	);
}
