import React, { PropsWithChildren } from "react";
import { Card } from "./ui/card";

type Props = {};

export default function ConversationContainer({
	children,
}: PropsWithChildren<Props>) {
	return (
		<Card className="w-full lg:max-w-[835px] h-[calc(100vh-32px)] lg:h-full p-2 flex flex-col gap-2">
			{children}
		</Card>
	);
}
