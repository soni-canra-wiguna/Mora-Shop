"use client"

import { WithChildren } from "@/types"
import { ClerkProvider } from "@clerk/nextjs"
import { dark, neobrutalism } from "@clerk/themes"

export const WithClerkProvider = ({ children }: WithChildren) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        signIn: { baseTheme: neobrutalism },
        signUp: { baseTheme: neobrutalism },
      }}
    >
      {children}
    </ClerkProvider>
  )
}
