import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/siteConfig";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignOutButton,
	UserButton,
} from "@clerk/nextjs";
import { Link } from "next-view-transitions";
import Image from "next/image";

type Props = {};

export default function Header({}: Props) {
	return (
		<header className="bg-transparent backdrop-blur-xl z-50 px-4 sticky top-0 border-b md:px-6 py-4 flex items-center justify-between">
			<Link href="/" className="flex items-center gap-4" prefetch={false}>
				<Image
					src="/logo.svg"
					height={24}
					width={24}
					alt="Chatly Logo"
					className="h-6 w-6"
				/>
				<span className="text-2xl font-semibold">{siteConfig.name}</span>
			</Link>
			<div className="flex items-center gap-2">
				<SignedIn>
					<Link
						href="/conversations"
						prefetch
						className={buttonVariants({ variant: "link", size: "sm" })}
					>
						All Conversations
					</Link>
					<UserButton />
				</SignedIn>
				<SignedOut>
					<Button variant="link" className="text-md underline">
						<SignInButton>Sign In</SignInButton>
					</Button>
				</SignedOut>
			</div>
		</header>
	);
}
