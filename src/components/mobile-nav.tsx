"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Link } from "next-view-transitions";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tooltip, TooltipContent } from "./ui/tooltip";

export default function MobileNav() {
	const paths = useNavigation();

	return (
		<Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
			<nav className="w-full">
				<ul className="flex items-center justify-evenly">
					{paths.map((el) => (
						<li key={el.href} className="relative">
							<Link href={el.href}>
								<Tooltip>
									<TooltipTrigger asChild>
										<>
											<Button
												size="icon"
												variant={el.active ? "default" : "outline"}
											>
												{el.icon}
											</Button>
											{el.count ? (
												<Badge className="absolute left-6 bottom-7 px-2 border border-black">
													{el.count}
												</Badge>
											) : null}
										</>
									</TooltipTrigger>
									<TooltipContent>
										<p>{el.name}</p>
									</TooltipContent>
								</Tooltip>
							</Link>
						</li>
					))}
					<li className="flex items-center justify-center">
						<UserButton />
					</li>
				</ul>
			</nav>
		</Card>
	);
}
