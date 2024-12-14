"use client";

import { useMutationState } from "@/hooks/useMutationState";
import { checkEmail, cn } from "@/lib/utils";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { ConvexError } from "convex/values";
import { UserPlusIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type Props = {};

export default function AddFriendForm({}: Props) {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("Email can't be empty");

	const { mutate: createRequest, pending } = useMutationState(
		api.request.create
	);

	function onEmailChange(event: ChangeEvent<HTMLInputElement>): void {
		const newEmail = event.target.value;

		setEmail(newEmail);

		if (newEmail.length === 0) {
			setError("Email can't be empty");
		}
		if (!checkEmail(newEmail)) {
			setError("Please enter a valid email!");
		} else {
			setError("");
		}
	}

	async function handleSubmit() {
		try {
			const res = await createRequest({
				email: email,
			});

			toast.success("Friend request sent!");
		} catch (error) {
			if (error instanceof ConvexError) {
				toast.error(error.data);
			} else {
				toast.error("Something went wrong!");
			}
		}
	}

	return (
		<Dialog>
			<Tooltip>
				<TooltipTrigger>
					<DialogTrigger>
						<Button variant="outline" size="icon" className="p-1.5">
							<UserPlusIcon />
						</Button>
					</DialogTrigger>
				</TooltipTrigger>
				<TooltipContent>
					<p>Add friend</p>
				</TooltipContent>
			</Tooltip>
			<DialogContent>
				<DialogHeader className="border-b pb-5">
					<DialogTitle className="text-2xl mb-2">Add Friend</DialogTitle>
					<DialogDescription className="text-sm text-muted-foreground">
						Send a request to connect to your friends!
					</DialogDescription>
				</DialogHeader>
				<section className="space-y-8">
					<div className="space-y-2">
						<Label html-for="email">Email</Label>
						<Input id="email" value={email} onChange={onEmailChange} />
						<p className="m-0 text-sm text-red-500">{error}</p>
					</div>
					<DialogFooter>
						<Button
							className="w-full"
							disabled={error !== "" || pending}
							onClick={handleSubmit}
						>
							Send
						</Button>
					</DialogFooter>
				</section>
			</DialogContent>
		</Dialog>
	);
}
