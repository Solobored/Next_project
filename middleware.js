import { auth } from "./auth"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // If trying to access dashboard without being logged in, redirect to login
  if (nextUrl.pathname.startsWith("/dashboard") && !isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl))
  }

  // If trying to access seed without being logged in, redirect to login
  if (nextUrl.pathname.startsWith("/seed") && !isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl))
  }

  // If logged in and trying to access login page, redirect to dashboard
  if (nextUrl.pathname === "/login" && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", nextUrl))
  }

  return null
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$).*)"],
}
