import { z } from "zod"
import bcryptjs from "bcryptjs"
import postgres from "postgres"
import Credentials from "next-auth/providers/credentials"

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

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await getUser(email)
          if (!user) return null

          const passwordsMatch = await bcryptjs.compare(password, user.password)
          if (passwordsMatch) return user
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
}
