import { GeistSans } from "geist/font/sans"
import { type AppType } from "next/app"
import { MainLayout } from "@/components/layout/main-layout"

import { api } from "@/utils/api"

import "@/styles/globals.css"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MainLayout className={GeistSans.className}>
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default api.withTRPC(MyApp)
