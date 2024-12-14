import { cn } from "@/lib/utils";
import { CircleArrowLeft, Settings, User } from "lucide-react";
import { Link } from "next-view-transitions";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Props = {
	imageUrl: string;
	name: string;
	options?: {
		label: string;
		destructive: boolean;
		onClick(): void;
	}[];
};

export default function ConversationIDHeader({
	imageUrl,
	name,
	options,
}: Props) {
	return (
		<Card className="w-full flex rounded-lg items-center p-2 justify-between">
			<div className="flex items-center gap-2">
				<Link href="/conversations" className="block lg:hidden">
					<CircleArrowLeft />
				</Link>
				<Avatar>
					<AvatarImage src={imageUrl} />
					<AvatarFallback>{name.substring(0, 1).toUpperCase()}</AvatarFallback>
				</Avatar>
				<h2 className="font-semibold">{name}</h2>
			</div>
			<div className="flex gap-2"></div>
			{options ? (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button size="icon" variant="outline">
							<Settings />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="bg-card">
						{options.map((option, i) => (
							<DropdownMenuItem
								className={cn("font-semibold transition", {
									"text-red-500 hover:bg-red-950 hover:text-white":
										option.destructive,
								})}
								key={i}
								onClick={option.onClick}
							>
								{option.label}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			) : null}
		</Card>
	);
}
