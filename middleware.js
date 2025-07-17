import { auth } from "./auth"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
  const isOnSeed = nextUrl.pathname.startsWith("/seed")
  const isOnLogin = nextUrl.pathname.startsWith("/login")

  // Protect dashboard and seed routes
  if (isOnDashboard || isOnSeed) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/login", nextUrl))
    }
    return null
  }

  // Redirect logged in users away from login page
  if (isOnLogin && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", nextUrl))
  }

  return null
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$).*)"],
}
