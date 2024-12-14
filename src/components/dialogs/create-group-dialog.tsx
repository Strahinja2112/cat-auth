"use client";

import { useMutationState } from "@/hooks/useMutationState";
import { useQuery } from "convex/react";
import { ConvexError } from "convex/values";
import { CirclePlus, Plus, User, X } from "lucide-react";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = {};

type Schema = {
	name: string;
	members: string[];
};

export default function CreateGroupDialog({}: Props) {
	const [name, setName] = useState({
		value: "",
		error: "Name cannot be empty!",
	});
	const [members, setMembers] = useState<{ value: string[]; error: string }>({
		value: [],
		error: "",
	});

	const friends = useQuery(api.friends.getAllFriends);
	const createGroup = useMutationState(api.conversations.createGroup);

	const notChoosenFriends = useMemo(() => {
		if (friends && friends.length > 0) {
			return friends?.filter((el) => !members.value.includes(el._id));
		}

		return [];
	}, [members, friends]);

	const chosenFriends = useMemo(() => {
		if (friends && friends.length > 0) {
			return friends?.filter((el) => members.value.includes(el._id));
		}

		return [];
	}, [members, friends]);

	async function handleSubmit() {
		try {
			await createGroup.mutate({
				name: name.value,
				members: members.value,
			});

			toast.success("A new group has beed created sent!");
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
						<Button asChild size="icon" variant="outline" className="p-1.5">
							<Plus className="size-6" />
						</Button>
					</DialogTrigger>
				</TooltipTrigger>
				<TooltipContent>
					<p>Create Group</p>
				</TooltipContent>
			</Tooltip>
			<DialogContent className="block">
				<DialogHeader className="border-b pb-5">
					<DialogTitle className="text-2xl mb-2">Create Group</DialogTitle>
					<DialogDescription className="text-sm text-muted-foreground">
						Add your friends to continue!
					</DialogDescription>
				</DialogHeader>
				<section className="space-y-8">
					<div className="space-y-2 mt-2">
						<Label html-for="name">Name</Label>
						<Input
							id="name"
							value={name.value}
							onChange={(e) => {
								let error = "";
								const { value } = e.target;

								if (value === "") {
									error = "Name cannot be empty!";
								}

								setName({ value, error });
							}}
						/>
						<p className="m-0 text-sm text-red-500">{name.error}</p>
					</div>
					<div className="space-y-2 mt-2 flex flex-col">
						<Label html-for="name">Friends</Label>
						<DropdownMenu>
							<DropdownMenuTrigger disabled={notChoosenFriends.length === 0}>
								<Button
									disabled={notChoosenFriends.length === 0}
									className="w-full"
									variant="outline"
								>
									Select friends
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="bg-background space-y-1">
								{friends
									?.filter((el) => !members.value.includes(el._id))
									.map((el) => (
										<DropdownMenuCheckboxItem
											key={el._id}
											className="flex items-center w-full px-3 py-1 gap-4 bg-card"
											onCheckedChange={() => {
												if (members.value.includes(el._id)) {
													setMembers((p) => ({
														...p,
														value: [...p.value.filter((val) => val !== el._id)],
													}));
												} else {
													setMembers((p) => ({
														...p,
														value: [...p.value, el._id],
													}));
												}
											}}
										>
											<Avatar className="size-8">
												<AvatarImage src={el.imageUrl} />
												<AvatarFallback>{el.username[0]}</AvatarFallback>
											</Avatar>
											<h4>{el.username}</h4>
										</DropdownMenuCheckboxItem>
									))}
							</DropdownMenuContent>
						</DropdownMenu>
						{members.value.length > 0 ? (
							<Card className="flex items-center gap-3 overflow-x-auto w-full max-h-24 p-2 no-scrollbar">
								{chosenFriends.map((el) => (
									<div
										key={el._id}
										className="flex flex-col items-center gap-1"
									>
										<div className="relative">
											<Avatar className="size-12">
												<AvatarImage src={el.imageUrl} />
												<AvatarFallback>{el.username[0]}</AvatarFallback>
											</Avatar>
											<X
												className="absolute text-muted-foreground size-4 bottom-8 left-8 bg-muted rounded-full cursor-pointer"
												onClick={() =>
													setMembers((p) => ({
														...p,
														value: p.value.filter((val) => val !== el._id),
													}))
												}
											/>
										</div>
										<p className="text-xs text-muted-foreground truncate">
											{el.username.split(" ")[0]}
										</p>
									</div>
								))}
							</Card>
						) : null}
						<p className="m-0 text-sm text-red-500">{members.error}</p>
					</div>
					<DialogFooter>
						<Button
							className="w-full"
							disabled={name.value === "" || members.value.length < 1}
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
