"use client";

import { useConversation } from "@/hooks/useConversation";
import { useMutationState } from "@/hooks/useMutationState";
import { ConvexError } from "convex/values";
import { Send, SendHorizonal } from "lucide-react";
import { useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

type Props = {};

export default function MessageInput({}: Props) {
	const [messageBody, setMessageBody] = useState("");
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

	const { conversationID } = useConversation();
	const createMessage = useMutationState(api.message.create);

	function handleMessageCreate() {
		if (messageBody.length === 0) {
			return;
		}

		createMessage
			.mutate({
				conversationId: conversationID,
				type: "text",
				body: [messageBody],
			})
			.then(() => {
				setMessageBody("");
				textAreaRef.current?.focus();
			})
			.catch((e) =>
				toast.error(e instanceof ConvexError ? e.data : "Something went wrong!")
			);
	}

	return (
		<Card className="w-full p-1 rounded-lg relative">
			<div className="flex gap-2 items-end w-full">
				<TextareaAutosize
					rows={1}
					maxRows={3}
					onChange={(e) => setMessageBody(e.target.value)}
					onClick={() => textAreaRef.current?.focus()}
					onKeyDown={async (e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							handleMessageCreate();
						}
					}}
					value={messageBody}
					ref={textAreaRef}
					placeholder="Write a message..."
					className="w-full resize-none overflow-hidden bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				/>
				<Button
					disabled={createMessage.pending}
					onClick={handleMessageCreate}
					size="icon"
					className="h-9 w-9 group"
				>
					<SendHorizonal className="size-6 group-hover:rotate-[360deg] duration-700 transition" />
				</Button>
			</div>
		</Card>
	);
}
