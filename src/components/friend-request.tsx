import { useMutationState } from "@/hooks/useMutationState";
import { ConvexError } from "convex/values";
import { Check, User, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

type Props = {
	id: Id<"requests">;
	imageUrl: string;
	username: string;
	email?: string;
};

export default function FriendRequest({
	id,
	imageUrl,
	username,
	email,
}: Props) {
	const denyRequest = useMutationState(api.request.denyFriendRequest);
	const acceptRequest = useMutationState(api.request.acceptFriendRequest);

	return (
		<Card className="w-full p-2 flex items-center justify-between ga-2">
			<div className="flex items-center gap-4 truncate">
				<Avatar>
					<AvatarImage src={imageUrl} />
					<AvatarFallback>
						<User />
					</AvatarFallback>
				</Avatar>
				<div className="flex flex-col truncate">
					<h4 className="trucate">{username}</h4>
					<p className="text-xs text-muted-foreground trucate">{email}</p>
				</div>
			</div>
			<div className="flex items-center gap-1.5 flex-col">
				<Button
					size="tiny"
					className="text-muted-foreground"
					variant="outline"
					onClick={async () => {
						acceptRequest
							.mutate({
								id,
							})
							.then(() => toast.success("Friend request accepted!"))
							.catch((e) =>
								toast.error(
									e instanceof ConvexError ? e.data : "Something went wrong!"
								)
							);
					}}
					disabled={acceptRequest.pending || denyRequest.pending}
				>
					<Check className="size-4" />
				</Button>
				<Button
					size="tiny"
					variant="destructive-outline"
					onClick={async () => {
						denyRequest
							.mutate({
								id,
							})
							.then(() => toast.success("Friend request denied!"))
							.catch((e) =>
								toast.error(
									e instanceof ConvexError ? e.data : "Something went wrong!"
								)
							);
					}}
					disabled={acceptRequest.pending || denyRequest.pending}
				>
					<X className="size-4" />
				</Button>
			</div>
		</Card>
	);
}
