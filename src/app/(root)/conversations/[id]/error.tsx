"use client";

import ConversationFallback from "@/components/conversation-fallback";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Error() {
	const router = useRouter();

	useEffect(() => {
		router.push("/conversations");
	}, [router]);

	return <ConversationFallback />;
}
