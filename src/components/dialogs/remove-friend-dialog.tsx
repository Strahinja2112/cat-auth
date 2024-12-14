"use client";

import { useMutationState } from "@/hooks/useMutationState";
import { ConvexError } from "convex/values";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "../ui/alert-dialog";

type Props = {
	conversationId: Id<"conversations">;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function RemoveFriendDialog({
	conversationId,
	open,
	setOpen,
}: Props) {
	const router = useRouter();

	const removeFriend = useMutationState(api.friend.remove);

	async function handleRemove() {
		removeFriend
			.mutate({
				conversationId,
			})
			.then(() => {
				toast.success("Friend removed!");
				router.replace("/conversations");
			})
			.catch((e) =>
				toast.error(e instanceof ConvexError ? e.data : "Something went wrong!")
			);
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action is irreversible. All messages will be deleted!
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={removeFriend.pending}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						disabled={removeFriend.pending}
						onClick={handleRemove}
					>
						Remove friend
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
