import BeginChat from "@/components/icons/begin-chat";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { features } from "@/constants";
import { siteConfig } from "@/siteConfig";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { TriangleAlertIcon } from "lucide-react";
import { Link } from "next-view-transitions";

export default function Home() {
	return (
		<main className="flex-1">
			<section className="w-full py-12 md:pb-24">
				<div className="container px-4 md:px-6">
					<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
						<div className="flex flex-col justify-center space-y-6">
							<div className="space-y-4 lg:ml-5">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-center lg:text-start">
									Seamless Communication for Your Team
								</h1>
								<p className="max-w-[600px] text-center md:text-start mx-auto text-muted-foreground md:text-xl">
									Empower your team with real-time messaging, file sharing, and
									group chat capabilities.
								</p>
							</div>
							<div className="flex flex-col gap-2 min-[400px]:flex-row items-center lg:justify-start justify-center p-0 lg:pl-4">
								<SignedOut>
									<SignInButton mode="modal">
										<Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
											Get Started
										</Button>
									</SignInButton>
								</SignedOut>
								<SignedIn>
									<Link
										href="/conversations"
										className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
									>
										Conversations
									</Link>
								</SignedIn>
								<Link
									target="_blank"
									href={siteConfig.portfolioLink}
									className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
									prefetch={false}
								>
									Learn More
								</Link>
							</div>
						</div>
						<div className="flex items-center justify-center">
							<BeginChat size={550} />
						</div>
					</div>
				</div>
			</section>
			<section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20 md:rounded-lg">
				<div className="container space-y-12 px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
								Key Features
							</div>
							<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
								Empower Your Team with Advanced Chat
							</h2>
							<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Our {siteConfig.name}lication offers a suite of powerful
								features to streamline your team&apos;s communication and
								collaboration.
							</p>
						</div>
					</div>
					<div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-2">
						{features.map((feature, index) => (
							<div key={index} className="grid gap-1">
								<h3 className="text-xl font-bold">{feature.title}</h3>
								<p className="text-sm text-muted-foreground">
									{feature.description}
								</p>
							</div>
						))}
					</div>
					<div className="flex justify-center flex-row items-start gap-4">
						<SignedOut>
							<SignInButton mode="modal">
								<Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
									Sign Up
								</Button>
							</SignInButton>
						</SignedOut>
						<SignedIn>
							<Link
								href="/conversations"
								className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
							>
								Conversations
							</Link>
						</SignedIn>
						<Link
							target="_blank"
							href={siteConfig.portfolioLink}
							className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
							prefetch={false}
						>
							Learn More
						</Link>
					</div>
				</div>
			</section>
			<section className="w-full pt-12 md:py-24 lg:pt-32">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
								Testimonials
							</div>
							<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
								What Our Customers Say
							</h2>
							<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Hear from our satisfied customers about their experience with
								our application.
							</p>
						</div>
					</div>
					<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
						<Card className="p-6 shadow-md">
							<div className="flex items-start gap-4">
								<Avatar>
									<AvatarImage src="/placeholder-user.jpg" />
									<AvatarFallback>JD</AvatarFallback>
								</Avatar>
								<div className="grid gap-1 items-start">
									<div className="flex items-center gap-2">
										<div className="font-bold">John Doe</div>
										<div className="text-sm text-muted-foreground">
											Product Manager
										</div>
									</div>
									<p className="text-muted-foreground">
										&quot;Our team has been using the {siteConfig.name} for
										months and it has completely transformed the way we
										communicate. The real-time messaging and file sharing
										features are game-changers.&quot;
									</p>
								</div>
							</div>
						</Card>
						<Card className="p-6 shadow-md">
							<div className="flex items-start gap-4">
								<Avatar>
									<AvatarImage src="/placeholder-user.jpg" />
									<AvatarFallback>JD</AvatarFallback>
								</Avatar>
								<div className="grid gap-1 items-start">
									<div className="flex items-center gap-2">
										<div className="font-bold">Jane Smith</div>
										<div className="text-sm text-muted-foreground">
											Software Engineer
										</div>
									</div>
									<p className="text-muted-foreground">
										&quot;I&apos;ve tried many chat apps, but the{" "}
										{siteConfig.name} is by far the best. The user experience is
										intuitive, and the integrations with our other tools make it
										a seamless part of our workflow.&quot;
									</p>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</section>
			<div className="container mx-auto max-w-3xl mb-5 w-full">
				<div className="flex items-center gap-4">
					<TriangleAlertIcon className="size-14 fill-destructive text-black" />
					<div>
						<h3 className="text-lg font-semibold">
							Disclaimer: Reviews Not Real
						</h3>
						<p className="text-muted-foreground">
							The reviews shown on this website are not real and should not be
							taken as genuine customer feedback. They are for demonstration
							purposes only.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
