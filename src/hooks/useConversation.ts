import { useParams } from "next/navigation";
import { useMemo } from "react";

export function useConversation() {
	const params = useParams();

	const conversationID = useMemo(() => {
		return params?.id || "";
	}, [params?.id]);

	const isActive = useMemo(() => !!conversationID, [conversationID]);

	return {
		conversationID,
		isActive,
	};
}
