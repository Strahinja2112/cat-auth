import { PropsWithChildren } from "react";
import DesktopNav from "./desktop-nav";
import MobileNav from "./mobile-nav";

type Props = {};

export default function SidebarWrapper({ children }: PropsWithChildren<Props>) {
	return (
		<div className="w-full h-[100vh] p-4 flex flex-col lg:flex-row gap-4">
			<DesktopNav />
			<MobileNav />
			<section className="h-[calc(100%-80px)] lg:h-full w-full flex gap-4">
				{children}
			</section>
		</div>
	);
}
