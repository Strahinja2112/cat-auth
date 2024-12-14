import { cn, formatTime } from "@/lib/utils";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
	fromCurrentUser: boolean;
	lastByUser: boolean;
	body: string[];
	senderImage: string;
	senderName: string;
	type: string;
	createdAt: number;
};

export default function Message({
	body,
	createdAt,
	fromCurrentUser,
	lastByUser,
	senderImage,
	senderName,
	type,
}: Props) {
	return (
		<div
			className={cn("flex items-end", {
				"justify-end": fromCurrentUser,
			})}
		>
			<div
				className={cn("flex flex-col w-full mx-2", {
					"order-1 items-end": fromCurrentUser,
					"order-2 items-start": !fromCurrentUser,
				})}
			>
				<div
					className={cn("px-3 py-1 rounded-lg max-w-[70%]", {
						"bg-primary text-primary-foreground": fromCurrentUser,
						"bg-secondary text-secondary-foreground": !fromCurrentUser,
						"rounded-br-none": !lastByUser && fromCurrentUser,
						"rounded-bl-none": !lastByUser && !fromCurrentUser,
					})}
				>
					<p className="text-wrap break-words whitespace-pre-wrap">{body}</p>
					<p
						className={cn("text-xs flex w-full my-1", {
							"text-primary-foreground justify-end": fromCurrentUser,
							"text-secondary-foreground justify-start": !fromCurrentUser,
						})}
					>
						{formatTime(createdAt)}
					</p>
				</div>
			</div>
			<Avatar
				className={cn("relatives size-8", {
					"order-2": fromCurrentUser,
					"order-1": !fromCurrentUser,
					invisible: lastByUser,
				})}
			>
				<AvatarImage src={senderImage} />
				<AvatarFallback>{senderName.substring(0, 1)}</AvatarFallback>
			</Avatar>
		</div>
	);
}
