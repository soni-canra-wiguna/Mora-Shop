import { GeistSans } from "geist/font/sans"
import { type AppType } from "next/app"
import { ClerkProvider } from "@clerk/nextjs"
import { MainLayout } from "@/components/layout/main-layout"

import { api } from "@/utils/api"

import "@/styles/globals.css"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <MainLayout className={GeistSans.className}>
        <Component {...pageProps} />
      </MainLayout>
    </ClerkProvider>
  )
}

export default api.withTRPC(MyApp)
