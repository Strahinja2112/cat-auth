import { siteConfig } from "@/siteConfig";
import { Link } from "next-view-transitions";
import React from "react";
import { buttonVariants } from "../ui/button";

type Props = {};

export default function Footer({}: Props) {
	return (
		<footer className="bg-background border-t px-4 md:px-6 py-4 flex items-center justify-between">
			<p className="text-sm text-muted-foreground">
				&copy; {new Date().getFullYear()} {siteConfig.name}. All rights
				reserved.
			</p>
			<nav className="flex items-center gap-4">
				<Link
					href="/main/privacy"
					className={buttonVariants({
						className: "text-sm hover:underline",
						variant: "link",
					})}
					prefetch={false}
				>
					Privacy
				</Link>
				<Link
					href="/main/terms"
					className={buttonVariants({
						className: "text-sm hover:underline",
						variant: "link",
					})}
					prefetch={false}
				>
					Terms
				</Link>
			</nav>
		</footer>
	);
}
