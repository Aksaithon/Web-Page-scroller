import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// TODO: always add new api routes!
// TODO: remove all sensitive routes after WP is done!
const isPublicRoute = createRouteMatcher([
  "/",
  "/reels(.*)",
  "/api/likesData(.*)",
  "/api/checkUserName(.*)",
  "/api/formData(.*)",
  "/api/userData(.*)",
  "/api/appData(.*)", // api endpoint
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
