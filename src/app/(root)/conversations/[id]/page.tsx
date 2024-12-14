"use client";

import ConversationContainer from "@/components/conversation-container";
import Body from "@/components/conversation-id/body";
import Header from "@/components/conversation-id/header";
import MessageInput from "@/components/conversation-id/message-input";
import RemoveFriendDialog from "@/components/dialogs/remove-friend-dialog";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

type Props = {
	params: {
		id: Id<"conversations">;
	};
};

export default function ConversationPage({ params: { id } }: Props) {
	const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);

	const conversation = useQuery(api.conversation.getConversation, {
		id,
	});

	if (conversation === undefined) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<Loader2 className="size-8 text-muted-foreground" />
			</div>
		);
	}

	if (conversation === null) {
		return (
			<p className="w-full h-full flex items-center justify-center">
				Conversation not found!
			</p>
		);
	}

	return (
		<ConversationContainer>
			<RemoveFriendDialog
				conversationId={id}
				open={removeFriendDialogOpen}
				setOpen={setRemoveFriendDialogOpen}
			/>
			<Header
				imageUrl={conversation.otherMember?.imageUrl || ""}
				name={
					(conversation.conversation?.isGroup
						? conversation.conversation.name
						: conversation.otherMember?.username) || ""
				}
				options={
					conversation.conversation?.isGroup
						? [
								{
									label: "Leave Group",
									destructive: false,
									onClick() {
										setRemoveFriendDialogOpen(true);
									},
								},
								{
									label: "Delete Group",
									destructive: true,
									onClick() {
										setRemoveFriendDialogOpen(true);
									},
								},
							]
						: [
								{
									label: "Remove Friend",
									destructive: true,
									onClick() {
										setRemoveFriendDialogOpen(true);
									},
								},
							]
				}
			/>
			<Body />
			<MessageInput />
		</ConversationContainer>
	);
}
