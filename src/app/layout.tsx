import ConvexClientProvider from "@/components/providers/convex-client-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Chat Flow - Realtime Chat Application",
	description:
		"ChatFlow is a modern chat app built with Next.js, React, Clerk, Convex, and TypeScript. Enjoy real-time messaging with secure authentication and a responsive interface. Connect effortlessly and securely with ChatFlow's scalable backend and robust type safety.",
	icons: {
		icon: {
			url: "/logo.svg",
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ViewTransitions>
			<html lang="en" suppressHydrationWarning>
				<body className={inter.className}>
					<ConvexClientProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="light"
							disableTransitionOnChange
						>
							<TooltipProvider>
								<Toaster richColors />
								<main className="flex min-h-screen max-w-7xl mx-auto bg-background flex-col items-stretch flex-1 justify-stretch">
									{children}
								</main>
							</TooltipProvider>
						</ThemeProvider>
					</ConvexClientProvider>
				</body>
			</html>
		</ViewTransitions>
	);
}
