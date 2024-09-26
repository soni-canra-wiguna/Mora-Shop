import "@/styles/globals.css"

import { Space_Grotesk } from "next/font/google"
import { type Metadata } from "next"

import { WithClerkProvider } from "@/components/provider/clerk-provider"
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/footer"
import NextTopLoader from "nextjs-toploader"
import { ThemeProvider } from "@/components/provider/theme-provider"
import { TanstackProvider } from "@/components/provider/tanstask-provider"

export const metadata: Metadata = {
  title: {
    default: "Mora Shop",
    template: "%s | Mora Shop - Top-up Game & Subscription",
  },
  description:
    "Mora Shop adalah aplikasi top-up game dan subscription yang memudahkan pengguna untuk mengisi saldo menggunakan Payment Gateway Midtrans dan membeli item di website dengan gold.",
  referrer: "origin-when-cross-origin",
  applicationName: "Mora Shop",
  icons: {
    icon: "/mora-logo.png", // Pastikan file ikon sudah tersedia
    apple: "/mora-logo.png",
  },
  keywords: [
    "top-up game",
    "subscription",
    "Midtrans",
    "game gold",
    "Mora Shop",
  ],
  authors: [
    { name: "Soni Canra Wiguna", url: "https://instagram.com/sonicanra" },
  ],
  creator: "Soni Canra Wiguna",
  publisher: "Soni Canra Wiguna",
  generator: "Next.Js 14.2.4",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true, // allow follow url
      noimageindex: false, // allow indexing images
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL(process.env.PRODUCTION_URL as string),
  alternates: {
    canonical: process.env.PRODUCTION_URL,
  },
  openGraph: {
    title: {
      default: "Mora Shop - Top-up Game & Subscription",
      template: "%s | Mora Shop",
    },
    description:
      "Isi saldo gold dengan Mora Shop dan gunakan untuk membeli item di website ini. Top-up mudah dan aman dengan Midtrans.",
    url: process.env.PRODUCTION_URL,
    images: [
      {
        url: "https://utfs.io/f/x4uU0rA3N6TIui5iij0rl8vVCiBpZWRSJPjoNOx7bKE2XTFt",
        width: 1200,
        height: 630,
        alt: "Mora Shop - Top-up Game & Subscription",
      },
    ],
    type: "website",
    locale: "id_ID",
    siteName: "Mora Shop",
  },
  twitter: {
    card: "summary_large_image",
    site: "@MoraShop",
    creator: "@SoniCanraWiguna",
    title: "Mora Shop - Top-up Game & Subscription",
    description:
      "Mora Shop memudahkan pengguna untuk top-up game dan subscription dengan Payment Gateway Midtrans.",
    images: [
      {
        url: "https://utfs.io/f/x4uU0rA3N6TIui5iij0rl8vVCiBpZWRSJPjoNOx7bKE2XTFt",
        alt: "Mora Shop Banner",
      },
    ],
  },
}

const spaceGrostek = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grostek",
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <WithClerkProvider>
      <TanstackProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={`${spaceGrostek.className}`}>
            <ThemeProvider>
              <NextTopLoader color="#fc7303" height={3} showSpinner={false} />
              <Navbar />
              {children}
              <Footer />
              <Toaster />
            </ThemeProvider>
          </body>
        </html>
      </TanstackProvider>
    </WithClerkProvider>
  )
}
