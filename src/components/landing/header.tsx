"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/siteConfig";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "../icons/logo";

export default function Header() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.header
			className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 transition-all duration-200 ${
				scrolled
					? "bg-background/80 backdrop-blur-lg shadow-md"
					: "bg-transparent"
			}`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6 }}
		>
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<Link href="/" className="flex items-center gap-2">
					<Logo color={"black"} size={45} />
					<span className={`text-lg font-bold text-foreground`}>
						{siteConfig.name}
					</span>
				</Link>
				<nav className="flex items-center gap-4">
					<Link
						href="/docs"
						className={buttonVariants({
							variant: scrolled ? "ghost" : "link",
							size: "sm",
						})}
					>
						Docs
					</Link>
					<Link
						href="https://github.com/yourusername/your-repo"
						target="_blank"
						rel="noopener noreferrer"
						className={buttonVariants({
							variant: scrolled ? "ghost" : "link",
							size: "sm",
						})}
					>
						<Github className="w-4 h-4 mr-2" />
						GitHub
					</Link>
					<SignedIn>
						<Link
							href="/dashboard"
							className={buttonVariants({
								variant: scrolled ? "ghost" : "link",
								size: "sm",
							})}
						>
							Dashboard
						</Link>
						<UserButton afterSignOutUrl="/" />
					</SignedIn>
					<SignedOut>
						<Button variant={scrolled ? "default" : "outline"} size="sm">
							<SignInButton>Try Demo</SignInButton>
						</Button>
					</SignedOut>
				</nav>
			</div>
		</motion.header>
	);
}
