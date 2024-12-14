import { clerkMiddleware } from "@clerk/nextjs/server";

// ! MOZDA NE RADI JER TREBA DA BUDE PRAZNO
export default clerkMiddleware();

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
