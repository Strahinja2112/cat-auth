import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/siteConfig";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Logo from "../icons/logo";
import { Github } from "lucide-react";

export default function Header() {
	return (
		<header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 px-4 sticky top-0 border-b md:px-6 py-4 flex items-center justify-between">
			<Link href="/" className="flex items-center gap-4">
				<Logo color="black" size={40} />
				<span className="text-xl font-semibold">{siteConfig.name}</span>
			</Link>
			<nav className="flex items-center gap-4">
				<Link
					href="/features"
					className={buttonVariants({ variant: "ghost", size: "sm" })}
				>
					Features
				</Link>
				<Link
					href="/docs"
					className={buttonVariants({ variant: "ghost", size: "sm" })}
				>
					Docs
				</Link>
				<Link
					href="https://github.com/yourusername/your-repo"
					target="_blank"
					rel="noopener noreferrer"
					className={buttonVariants({ variant: "ghost", size: "sm" })}
				>
					<Github className="w-4 h-4 mr-2" />
					GitHub
				</Link>
				<SignedIn>
					<Link
						href="/dashboard"
						className={buttonVariants({ variant: "ghost", size: "sm" })}
					>
						Dashboard
					</Link>
					<UserButton afterSignOutUrl="/" />
				</SignedIn>
				<SignedOut>
					<Button variant="default" size="sm">
						<SignInButton mode="modal">Try Demo</SignInButton>
					</Button>
				</SignedOut>
			</nav>
		</header>
	);
}
