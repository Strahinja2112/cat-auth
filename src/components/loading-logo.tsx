import Image from "next/image";

type Props = {
	size?: number;
};

export default function LoadingLogo({ size = 100 }: Props) {
	return (
		<div className="w-full flex-col gap-5 h-[100vh] bg-[hsl(14 24.7% 5.12%)] flex justify-center items-center">
			<Image
				src={"/logo.svg"}
				alt="logo"
				className="animate-pulse duration-1000"
				width={size}
				height={size}
			/>
		</div>
	);
}
