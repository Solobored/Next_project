import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import { z } from "zod"
import bcryptjs from "bcryptjs"
import postgres from "postgres"

const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" })

async function getUser(email) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`
    return user[0]
  } catch (error) {
    console.error("Failed to fetch user:", error)
    throw new Error("Failed to fetch user.")
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          console.log("Attempting login for email:", email)

          const user = await getUser(email)
          if (!user) {
            console.log("User not found for email:", email)
            return null
          }
          console.log("User found:", user.email)

          const passwordsMatch = await bcryptjs.compare(password, user.password)
          console.log("Passwords match:", passwordsMatch)

          if (passwordsMatch) {
            console.log("Authentication successful for user:", user.email)
            return user
          }
        }

        console.log("Invalid credentials")
        return null
      },
    }),
  ],
})
