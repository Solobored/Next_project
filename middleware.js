import { auth } from "./auth" // Import the pre-configured auth instance

export default auth // Export the auth instance directly

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
