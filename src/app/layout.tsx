import BackgroundEffect from "@/components/background-effect";
import Header from "@/components/landing/header";
import ConvexClientProvider from "@/components/providers/convex-client-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/siteConfig";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Lexend, Outfit, Poppins } from "next/font/google";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const font = Outfit({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: `${siteConfig.name} - ${siteConfig.description}`,
	description: siteConfig.description,
	icons: {
		icon: {
			url: "/logo.svg",
		},
	},
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<ViewTransitions>
			<html lang="en" suppressHydrationWarning>
				<body className={font.className}>
					<ConvexClientProvider>
						<ThemeProvider
							attribute="class"
							forcedTheme="dark"
							disableTransitionOnChange
						>
							<TooltipProvider>
								<Toaster richColors theme="dark" position="top-center" />
								<div className="min-h-screen flex items-center justify-center bg-gradient-to-br dark:bg-gradient-to-br from-indigo-100/70 via-white/70 to-cyan-100/70 dark:from-gray-950/90 dark:via-gray-900/90 dark:to-gray-950/90 relative overflow-hidden">
									<BackgroundEffect />
									{children}
								</div>
							</TooltipProvider>
						</ThemeProvider>
					</ConvexClientProvider>
				</body>
			</html>
		</ViewTransitions>
	);
}
