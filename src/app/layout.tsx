import Header from "@/components/landing/header";
import ConvexClientProvider from "@/components/providers/convex-client-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/siteConfig";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Outfit, Poppins } from "next/font/google";
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
								<Toaster richColors />
								{/* <Header /> */}
								{children}
							</TooltipProvider>
						</ThemeProvider>
					</ConvexClientProvider>
				</body>
			</html>
		</ViewTransitions>
	);
}
