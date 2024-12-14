import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { Id } from "../../convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";

type Props = {
	id: Id<"conversations">;
	name: string;
	active: boolean;
	isGroup: boolean;
	imageUrl?: string;
	username?: string;
	lastMessage: {
		content: string;
		sender: string;
	} | null;
};

export default function GroupConversationItem({
	id,
	name,
	lastMessage,
	imageUrl,
	active,
	isGroup,
	username,
}: Props) {
	return (
		<Link href={`/conversations/${id}`} className="w-full">
			<Card
				className={cn(
					"p-2 flex flex-row items-center gap-4 truncate",
					active ? "bg-secondary/50" : ""
				)}
			>
				<div
					className="flex flex-row
				 items-center gap-4 truncate"
				>
					<Avatar>
						{!isGroup ? <AvatarImage src={imageUrl!} /> : null}
						<AvatarFallback>
							{name.charAt(0).toLocaleUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col truncate">
						<h4 className="truncate">{isGroup ? name : username}</h4>
						{lastMessage?.sender && lastMessage.content ? (
							<span className="text-sm text-muted-foreground flex truncate overflow-ellipsis">
								<p className="font-semibold">{lastMessage?.sender}</p>
								{":"} &nbsp;
								<p className="truncate overflow-ellipsis">
									{lastMessage.content}
								</p>
							</span>
						) : (
							<p className="text-sm text-muted-foreground truncate">
								Start conversation!
							</p>
						)}
					</div>
				</div>
			</Card>
		</Link>
	);
}
