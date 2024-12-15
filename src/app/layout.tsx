import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import ConvexClientProvider from "@/components/providers/convex-client-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/siteConfig";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: `${siteConfig.name} - ${siteConfig.description}`,
	description: siteConfig.description,
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
							forcedTheme="dark"
							disableTransitionOnChange
						>
							<TooltipProvider>
								<Toaster richColors />
								{children}
							</TooltipProvider>
						</ThemeProvider>
					</ConvexClientProvider>
				</body>
			</html>
		</ViewTransitions>
	);
}
