"use client";

import { useConversation } from "@/hooks/useConversation";
import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";
import { Card } from "./ui/card";

type Props = {
	title: string;
	action?: React.ReactNode;
};

export default function ItemList({
	title,
	action: Action,
	children,
}: PropsWithChildren<Props>) {
	const { isActive } = useConversation();

	return (
		<Card
			className={cn("hidden h-full w-full lg:flex-none lg:w-80 p-2", {
				block: !isActive,
				"lg:block": isActive,
			})}
		>
			<div className="mb-4 flex items-center justify-between">
				<h1 className="text-2xl font-semibold tracking-tighter">{title}</h1>
				{Action ? Action : null}
			</div>
			<div className="w-full h-full flex flex-col items-center justify-start gap-2">
				{children}
			</div>
		</Card>
	);
}
