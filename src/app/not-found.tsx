import BeginChat from "@/components/icons/begin-chat";
import { HomeIcon } from "lucide-react";
import { Link } from "next-view-transitions";
import React from "react";

type Props = {};

export default function NotFound({}: Props) {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-background">
			<div className="max-w-md px-4 text-center">
				<BeginChat size={400} />
				<h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mt-10">
					Oops! Page not found.
				</h1>
				<p className="mt-4 text-muted-foreground">
					The page you&apos;re looking for doesn&apos;t exist or has been moved.
				</p>
				<Link
					href="/"
					className="inline-flex items-center justify-center mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1"
					prefetch={false}
				>
					<HomeIcon className="mr-2 h-4 w-4" />
					Go back home
				</Link>
			</div>
		</div>
	);
}
