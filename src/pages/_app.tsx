import { GeistSans } from "geist/font/sans"
import { type AppType } from "next/app"
import { ClerkProvider } from "@clerk/nextjs"
import { MainLayout } from "@/components/layout/main-layout"
import { ThemeProvider as NextThemesProvider } from "next-themes"

import { api } from "@/utils/api"

import "@/styles/globals.css"
import { dark, neobrutalism } from "@clerk/themes"
import { Toaster } from "@/components/ui/toaster"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        signIn: { baseTheme: neobrutalism },
        signUp: { baseTheme: neobrutalism },
      }}
    >
      <NextThemesProvider
        attribute="class"
        disableTransitionOnChange
        defaultTheme="system"
      >
        <MainLayout className={GeistSans.className}>
          <Component {...pageProps} />
          <Toaster />
        </MainLayout>
      </NextThemesProvider>
    </ClerkProvider>
  )
}

export default api.withTRPC(MyApp)
