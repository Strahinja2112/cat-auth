import React from "react";
import BeginChat from "./icons/begin-chat";
import { Card } from "./ui/card";

type Props = {};

export default function ConversationFallback({}: Props) {
	return (
		<Card className="hidden lg:flex h-full w-full flex-col items-center bg-background border-0 justify-center text-muted-foreground">
			<h1 className="text-3xl font-bold mb-10">Select a chat to continue</h1>
			<BeginChat size={500} />
		</Card>
	);
}
