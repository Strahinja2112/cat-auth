type Props = {};

export default function NotFound({}: Props) {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mt-10">
				Oops! Page not found.
			</h1>
			<p className="mt-4 text-muted-foreground">
				The page you&apos;re looking for doesn&apos;t exist or has been moved.
			</p>
		</div>
	);
}
