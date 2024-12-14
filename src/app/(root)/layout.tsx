"use client";

import LoadingLogo from "@/components/loading-logo";
import SidebarWrapper from "@/components/sidebar-wrapper";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
	const { isSignedIn, isLoaded } = useUser();
	const router = useRouter();

	if (!isLoaded) {
		return <LoadingLogo />;
	}

	if (!isSignedIn) {
		router.replace("/");
		return null;
	}

	return <SidebarWrapper>{children}</SidebarWrapper>;
}
