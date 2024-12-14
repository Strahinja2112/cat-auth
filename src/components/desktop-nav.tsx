"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { UserButton } from "@clerk/nextjs";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Link } from "next-view-transitions";
import React from "react";
import { ThemeToggle } from "./themes/theme-toggle";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tooltip, TooltipContent } from "./ui/tooltip";

export default function DesktopNav() {
	const paths = useNavigation();

	return (
		<Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-2">
			<ul className="flex flex-col items-center gap-4">
				{paths.map((el) => (
					<li key={el.href} className="relative">
						<Tooltip>
							<Link href={el.href}>
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
							</Link>
						</Tooltip>
					</li>
				))}
			</ul>
			<div className="flex flex-col items-center gap-4">
				<UserButton />
				{/* <ThemeToggle /> */}
			</div>
		</Card>
	);
}
