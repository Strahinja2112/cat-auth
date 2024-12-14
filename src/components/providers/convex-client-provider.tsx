"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { PropsWithChildren } from "react";

import { dark } from "@clerk/themes";

const convexClient = new ConvexReactClient(
	process.env.NEXT_PUBLIC_CONVEX_URL || ""
);

export default function ConvexClientProvider({ children }: PropsWithChildren) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark,
			}}
		>
			<ConvexProviderWithClerk useAuth={useAuth} client={convexClient}>
				{/* <AuthLoading>
					<LoadingLogo />
				</AuthLoading> */}
				{children}
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
