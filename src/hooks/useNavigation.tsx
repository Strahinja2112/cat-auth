import { useQuery } from "convex/react";
import {
	BookUser,
	Home,
	Mail,
	MessageCircleCode,
	MessageSquare,
	Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { api } from "../../convex/_generated/api";
type Path = {
	name: string;
	href: string;
	icon: JSX.Element;
	active: boolean;
	count?: number;
};

export function useNavigation() {
	const pathname = usePathname();

	const requestCount = useQuery(api.requests.getAllRequestsCount);

	const paths = useMemo(
		(): Path[] => [
			{
				name: "Home",
				href: "/",
				icon: <Home />,
				active: pathname === "/",
			},
			{
				name: "Conversations",
				href: "/conversations",
				icon: <MessageCircleCode />,
				active: pathname.startsWith("/conversations"),
			},
			{
				name: "Friends",
				href: "/friends",
				icon: <BookUser />,
				active: pathname.startsWith("/friends"),
				count: requestCount,
			},
		],
		[pathname, requestCount]
	);

	return paths;
}
