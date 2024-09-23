"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { WithChildren } from "@/types"

export const ThemeProvider = ({ children }: WithChildren) => {
  return (
    <NextThemesProvider
      attribute="class"
      disableTransitionOnChange
      defaultTheme="system"
    >
      {children}
    </NextThemesProvider>
  )
}
