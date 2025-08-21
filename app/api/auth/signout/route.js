import { signOut } from "@/auth"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    await signOut({ redirect: false })
    return NextResponse.redirect(new URL("/login", process.env.NEXTAUTH_URL || "http://localhost:3000"))
  } catch (error) {
    return NextResponse.redirect(new URL("/login", process.env.NEXTAUTH_URL || "http://localhost:3000"))
  }
}
