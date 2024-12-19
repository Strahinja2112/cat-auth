"use client";

import Logo from "@/components/icons/logo";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { siteConfig } from "@/siteConfig";
import { motion } from "framer-motion";
import {
	Check,
	Copy,
	Download,
	ExternalLink,
	Github,
	LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function CatAuthLandingPage() {
	const [copied, setCopied] = useState(false);
	const npmInstallCommand = `git clone ${siteConfig.links.github}`;

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 flex flex-col items-center">
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="flex flex-col items-center text-center"
			>
				<div className="flex items-center gap-5 flex-col text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 mb-4">
					<Logo size={80} color="#ffffffaf" />
					CAT Auth
				</div>
				<p className="text-muted-foreground text-sm sm:text-base pb-3">
					CAT (Convex Auth Template)
				</p>
				<p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
					{siteConfig.description}
				</p>
				<div className="flex flex-col w-full items-center gap-4 mb-12">
					<div className="flex items-center w-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-2 max-w-full sm:max-w-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
						<code className="flex-grow text-sm text-gray-800 dark:text-gray-200 mr-2">
							{npmInstallCommand}
						</code>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => {
								navigator.clipboard.writeText(npmInstallCommand);
								setCopied(true);
								setTimeout(() => setCopied(false), 2000);

								toast.success("Copied to clipboard");
							}}
							className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/30 dark:hover:bg-gray-800/50 backdrop-blur-sm"
						>
							{copied ? (
								<Check className="w-5 h-5" />
							) : (
								<Copy className="w-5 h-5" />
							)}
						</Button>
					</div>
					<TooltipProvider>
						<div className="flex flex-col sm:flex-row gap-2 md:gap-4 w-full max-w-2xl">
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										href={siteConfig.links.github}
										target="_blank"
										className={buttonVariants({
											variant: "outline",
											size: "lg",
											className:
												"group w-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/30",
										})}
									>
										<Github className="mr-2 group-hover:rotate-12 transition-transform" />
										GitHub Repository
									</Link>
								</TooltipTrigger>
								<TooltipContent>View source code on GitHub</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="outline"
										size="lg"
										className="group w-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/30"
										onClick={() => {
											toast.error("This feature is not available yet.");
										}}
									>
										<Download className="mr-2 group-hover:scale-110 transition-transform" />
										NPM Package
									</Button>
								</TooltipTrigger>
								<TooltipContent>Install via npm</TooltipContent>
							</Tooltip>
						</div>
					</TooltipProvider>
				</div>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto"
				>
					<Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-shadow">
						<CardContent className="pt-6 text-center">
							<LayoutGrid
								className="mx-auto mb-4 text-indigo-500 dark:text-indigo-400"
								size={48}
							/>
							<h3 className="text-lg sm:text-xl font-semibold mb-2 dark:text-gray-200">
								Modern Stack
							</h3>
							<p className="text-sm sm:text-base text-gray-700 dark:text-gray-400">
								Leveraging the latest web technologies for optimal performance.
							</p>
						</CardContent>
					</Card>

					<Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-shadow">
						<CardContent className="pt-6 text-center">
							<ExternalLink
								className="mx-auto mb-4 text-cyan-500 dark:text-cyan-400"
								size={48}
							/>
							<h3 className="text-lg sm:text-xl font-semibold mb-2 dark:text-gray-200">
								Easy Integration
							</h3>
							<p className="text-sm sm:text-base text-gray-700 dark:text-gray-400">
								Plug-and-play template ready for your next project.
							</p>
						</CardContent>
					</Card>

					<Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-shadow">
						<CardContent className="pt-6 text-center">
							<Github
								className="mx-auto mb-4 text-purple-500 dark:text-purple-400"
								size={48}
							/>
							<h3 className="text-lg sm:text-xl font-semibold mb-2 dark:text-gray-200">
								Open Source
							</h3>
							<p className="text-sm sm:text-base text-gray-700 dark:text-gray-400">
								Fully customizable and community-driven.
							</p>
						</CardContent>
					</Card>
				</motion.div>
				<a
					href="https://yourportfolio.com"
					target="_blank"
					rel="noopener noreferrer"
					className="my-4"
				>
					<Badge
						variant="outline"
						className="hover:bg-white/30 dark:hover:bg-gray-800/50 transition-colors backdrop-blur-sm rounded-sm p-2"
					>
						<ExternalLink className="mr-2" size={16} />
						Developer Portfolio
					</Badge>
				</a>
			</motion.div>
		</div>
	);
}
