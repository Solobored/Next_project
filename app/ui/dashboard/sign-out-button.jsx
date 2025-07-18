"use client"

import { PowerIcon } from "@heroicons/react/24/outline"
import { signOutUser } from "@/app/lib/actions"
import { useRouter } from "next/navigation"

export default function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOutUser()
    } catch (error) {
      console.error("Sign out failed:", error)
      // Fallback: force navigation to login
      router.push("/login")
      router.refresh()
    }
  }

  return (
    <form action={handleSignOut}>
      <button
        type="submit"
        className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
      >
        <PowerIcon className="w-6" />
        <div className="hidden md:block">Sign Out</div>
      </button>
    </form>
  )
}
